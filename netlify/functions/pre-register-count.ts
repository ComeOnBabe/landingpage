const NOTION_VERSION = '2022-06-28';
const PAGE_SIZE = 100;
const MAX_PAGES = 50; // 안전장치: 최대 5,000건까지 집계
const CACHE_TTL_MS = 60_000;

type NotionQueryResponse = {
  results?: unknown[];
  has_more?: boolean;
  next_cursor?: string | null;
};

let cache: { count: number; expiresAt: number } | null = null;

function json(statusCode: number, body: Record<string, unknown>) {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=60',
    },
    body: JSON.stringify(body),
  };
}

async function queryPage(
  token: string,
  databaseId: string,
  filter: Record<string, unknown> | null,
  cursor: string | null,
) {
  const response = await fetch(
    `https://api.notion.com/v1/databases/${databaseId}/query`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Notion-Version': NOTION_VERSION,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        page_size: PAGE_SIZE,
        ...(filter ? { filter } : {}),
        ...(cursor ? { start_cursor: cursor } : {}),
      }),
    },
  );

  return response;
}

async function countRows(
  token: string,
  databaseId: string,
  filter: Record<string, unknown> | null,
) {
  let count = 0;
  let cursor: string | null = null;

  for (let page = 0; page < MAX_PAGES; page += 1) {
    const response = await queryPage(token, databaseId, filter, cursor);

    if (!response.ok) {
      const detail = await response.text();
      const error = new Error(detail) as Error & { status?: number; code?: string };
      error.status = response.status;
      try {
        error.code = (JSON.parse(detail) as { code?: string }).code;
      } catch {
        // ignore parse failure
      }
      throw error;
    }

    const data = (await response.json()) as NotionQueryResponse;
    count += data.results?.length ?? 0;

    if (!data.has_more || !data.next_cursor) {
      return count;
    }
    cursor = data.next_cursor;
  }

  return count;
}

export const handler = async (event: { httpMethod: string }) => {
  if (event.httpMethod !== 'GET') {
    return json(405, { error: 'Method not allowed' });
  }

  const token = process.env.NOTION_TOKEN;
  const databaseId = process.env.NOTION_DATABASE_ID;

  if (!token || !databaseId) {
    console.error('Missing NOTION_TOKEN or NOTION_DATABASE_ID');
    return json(500, { error: 'Server configuration error' });
  }

  if (cache && cache.expiresAt > Date.now()) {
    return json(200, { ok: true, count: cache.count, cached: true });
  }

  const inquiryTypeProp = process.env.NOTION_PROP_INQUIRY_TYPE ?? '문의 유형';
  const inquiryTypeValue = process.env.NOTION_INQUIRY_TYPE_VALUE ?? '사전 예약';

  const filter = inquiryTypeValue
    ? {
        property: inquiryTypeProp,
        select: { equals: inquiryTypeValue },
      }
    : null;

  try {
    let count: number;
    try {
      count = await countRows(token, databaseId, filter);
    } catch (err) {
      // '문의 유형' 컬럼이 없거나 타입이 다르면 필터 없이 전체 행을 집계합니다.
      const code = (err as { code?: string }).code;
      if (filter && code === 'validation_error') {
        console.warn('Filter failed, counting all rows instead:', code);
        count = await countRows(token, databaseId, null);
      } else {
        throw err;
      }
    }

    cache = { count, expiresAt: Date.now() + CACHE_TTL_MS };

    return json(200, { ok: true, count });
  } catch (err) {
    const status = (err as { status?: number }).status;
    const code = (err as { code?: string }).code;
    console.error('pre-register-count error:', status ?? '', code ?? '', err);

    if (code === 'object_not_found') {
      return json(502, {
        error:
          'Notion DB에 Integration이 연결되지 않았습니다. DB 페이지에서 Connections → Integration을 추가해 주세요.',
      });
    }

    return json(502, { error: 'Failed to load registration count' });
  }
};
