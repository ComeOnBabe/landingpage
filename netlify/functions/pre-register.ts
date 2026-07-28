const NOTION_VERSION = '2022-06-28';

type NotifyBy = 'email' | 'phone';

type RequestBody = {
  notifyBy?: NotifyBy;
  email?: string;
  phone?: string;
};

function json(statusCode: number, body: Record<string, unknown>) {
  return {
    statusCode,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };
}

function buildNotionProperties(body: RequestBody) {
  const notifyBy = body.notifyBy ?? 'email';
  const email = body.email?.trim() ?? '';
  const phone = body.phone?.trim() ?? '';
  const contact = notifyBy === 'email' ? email : phone;

  const titleProp = process.env.NOTION_PROP_TITLE ?? '이름';
  const emailProp = process.env.NOTION_PROP_EMAIL ?? '이메일';
  const phoneProp = process.env.NOTION_PROP_PHONE ?? '연락처';
  const inquiryTypeProp = process.env.NOTION_PROP_INQUIRY_TYPE ?? '문의 유형';
  const inquiryTypeValue = process.env.NOTION_INQUIRY_TYPE_VALUE ?? '사전 예약';
  const submittedDateProp = process.env.NOTION_PROP_SUBMITTED_DATE ?? '제출일';

  const properties: Record<string, unknown> = {
    [titleProp]: {
      title: [{ text: { content: contact.slice(0, 200) } }],
    },
  };

  if (inquiryTypeValue) {
    properties[inquiryTypeProp] = {
      select: { name: inquiryTypeValue },
    };
  }

  if (email) {
    properties[emailProp] = { email };
  }
  if (phone) {
    properties[phoneProp] = { phone_number: phone };
  }

  const today = new Date().toISOString().slice(0, 10);
  properties[submittedDateProp] = {
    date: { start: today },
  };

  return properties;
}

export const handler = async (event: { httpMethod: string; body: string | null }) => {
  if (event.httpMethod !== 'POST') {
    return json(405, { error: 'Method not allowed' });
  }

  const token = process.env.NOTION_TOKEN;
  const databaseId = process.env.NOTION_DATABASE_ID;

  if (!token || !databaseId) {
    console.error('Missing NOTION_TOKEN or NOTION_DATABASE_ID');
    return json(500, { error: 'Server configuration error' });
  }

  let body: RequestBody;
  try {
    body = JSON.parse(event.body ?? '{}') as RequestBody;
  } catch {
    return json(400, { error: 'Invalid JSON body' });
  }

  const notifyBy = body.notifyBy ?? 'email';
  if (notifyBy !== 'email' && notifyBy !== 'phone') {
    return json(400, { error: 'Invalid notifyBy' });
  }

  const email = body.email?.trim() ?? '';
  const phone = body.phone?.trim() ?? '';

  if (notifyBy === 'email' && !email) {
    return json(400, { error: 'Email is required' });
  }
  if (notifyBy === 'phone' && !phone) {
    return json(400, { error: 'Phone is required' });
  }

  try {
    const response = await fetch('https://api.notion.com/v1/pages', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Notion-Version': NOTION_VERSION,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        parent: { database_id: databaseId },
        properties: buildNotionProperties(body),
      }),
    });

    if (!response.ok) {
      const detail = await response.text();
      console.error('Notion API error:', response.status, detail);

      let userMessage = 'Failed to save registration';
      try {
        const notionError = JSON.parse(detail) as {
          code?: string;
          message?: string;
        };
        if (notionError.code === 'object_not_found') {
          userMessage =
            'Notion DB에 Integration이 연결되지 않았습니다. DB 페이지에서 Connections → Integration을 추가해 주세요.';
        } else if (notionError.code === 'validation_error') {
          userMessage =
            'Notion DB 컬럼/옵션이 맞지 않습니다. 문의 유형 Select 옵션(기타 등)을 확인해 주세요.';
        }
      } catch {
        // keep default message
      }

      return json(502, { error: userMessage });
    }

    return json(200, { ok: true });
  } catch (err) {
    console.error('pre-register error:', err);
    return json(500, { error: 'Internal server error' });
  }
};
