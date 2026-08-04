const NOTION_VERSION = '2022-06-28';

type RequestBody = {
  name?: string;
  email?: string;
  phone?: string;
  reason?: string;
  detail?: string;
  agree?: boolean;
};

const REASONS = [
  '서비스를 더 이상 이용하지 않아요',
  '개인정보 삭제를 원해요',
  '사용이 불편해요',
  '다른 서비스를 이용하게 됐어요',
  '기타',
] as const;

function json(statusCode: number, body: Record<string, unknown>) {
  return {
    statusCode,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };
}

function paragraph(content: string) {
  return {
    object: 'block',
    type: 'paragraph',
    paragraph: {
      rich_text: [{ type: 'text', text: { content: content.slice(0, 2000) } }],
    },
  };
}

function buildNotionProperties(body: RequestBody) {
  const name = body.name?.trim() ?? '';
  const email = body.email?.trim() ?? '';
  const phone = body.phone?.trim() ?? '';

  const titleProp = process.env.NOTION_PROP_TITLE ?? '이름';
  const emailProp = process.env.NOTION_PROP_EMAIL ?? '이메일';
  const phoneProp = process.env.NOTION_PROP_PHONE ?? '연락처';
  const inquiryTypeProp = process.env.NOTION_PROP_INQUIRY_TYPE ?? '문의 유형';
  const inquiryTypeValue = process.env.NOTION_WITHDRAW_TYPE_VALUE ?? '회원 탈퇴';
  const submittedDateProp = process.env.NOTION_PROP_SUBMITTED_DATE ?? '제출일';
  // 선택: Notion DB에 텍스트 컬럼을 추가한 경우에만 사용합니다.
  const reasonProp = process.env.NOTION_PROP_REASON;

  const properties: Record<string, unknown> = {
    [titleProp]: {
      title: [{ text: { content: (name || email || phone).slice(0, 200) } }],
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

  if (reasonProp) {
    const reasonText = [body.reason?.trim(), body.detail?.trim()]
      .filter(Boolean)
      .join(' / ');
    properties[reasonProp] = {
      rich_text: [{ text: { content: reasonText.slice(0, 2000) } }],
    };
  }

  const today = new Date().toISOString().slice(0, 10);
  properties[submittedDateProp] = {
    date: { start: today },
  };

  return properties;
}

function buildNotionChildren(body: RequestBody) {
  const lines: string[] = [];

  if (body.name?.trim()) lines.push(`이름: ${body.name.trim()}`);
  if (body.email?.trim()) lines.push(`이메일: ${body.email.trim()}`);
  if (body.phone?.trim()) lines.push(`연락처: ${body.phone.trim()}`);
  if (body.reason?.trim()) lines.push(`탈퇴 사유: ${body.reason.trim()}`);
  if (body.detail?.trim()) lines.push(`상세 내용: ${body.detail.trim()}`);

  return lines.map(paragraph);
}

export const handler = async (event: { httpMethod: string; body: string | null }) => {
  if (event.httpMethod !== 'POST') {
    return json(405, { error: 'Method not allowed' });
  }

  const token = process.env.NOTION_TOKEN;
  const databaseId =
    process.env.NOTION_WITHDRAW_DATABASE_ID ?? process.env.NOTION_DATABASE_ID;

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

  const email = body.email?.trim() ?? '';
  const reason = body.reason?.trim() ?? '';

  if (!email) {
    return json(400, { error: '가입하신 이메일을 입력해 주세요.' });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json(400, { error: '이메일 형식을 확인해 주세요.' });
  }
  if (!reason) {
    return json(400, { error: '탈퇴 사유를 선택해 주세요.' });
  }
  if (!REASONS.includes(reason as (typeof REASONS)[number])) {
    return json(400, { error: '탈퇴 사유를 확인해 주세요.' });
  }
  if (reason === '기타' && !body.detail?.trim()) {
    return json(400, { error: '기타 사유를 입력해 주세요.' });
  }
  if (body.agree !== true) {
    return json(400, { error: '탈퇴 안내 사항에 동의해 주세요.' });
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
        children: buildNotionChildren(body),
      }),
    });

    if (!response.ok) {
      const detail = await response.text();
      console.error('Notion API error:', response.status, detail);

      let userMessage = '탈퇴 요청 접수에 실패했어요.';
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
            'Notion DB 컬럼/옵션이 맞지 않습니다. 문의 유형 Select 옵션(회원 탈퇴)을 확인해 주세요.';
        }
      } catch {
        // keep default message
      }

      return json(502, { error: userMessage });
    }

    return json(200, { ok: true });
  } catch (err) {
    console.error('withdraw error:', err);
    return json(500, { error: 'Internal server error' });
  }
};
