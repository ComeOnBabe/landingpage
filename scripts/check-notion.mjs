import { readFileSync } from 'node:fs';

const NOTION_VERSION = '2022-06-28';

function loadEnv() {
  try {
    const content = readFileSync('.env', 'utf8');
    for (const line of content.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eq = trimmed.indexOf('=');
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      const value = trimmed.slice(eq + 1).trim();
      process.env[key] = value;
    }
  } catch {
    console.error('❌ .env 파일을 찾을 수 없습니다.');
    process.exit(1);
  }
}

loadEnv();

const token = process.env.NOTION_TOKEN;
const databaseId = process.env.NOTION_DATABASE_ID;

if (!token || !databaseId) {
  console.error('❌ .env에 NOTION_TOKEN, NOTION_DATABASE_ID가 필요합니다.');
  process.exit(1);
}

const response = await fetch(`https://api.notion.com/v1/databases/${databaseId}`, {
  headers: {
    Authorization: `Bearer ${token}`,
    'Notion-Version': NOTION_VERSION,
  },
});

const body = await response.json();

if (!response.ok) {
  console.error(`❌ DB 접근 실패 (${response.status})`);
  console.error(body.message ?? body);

  if (body.code === 'object_not_found') {
    console.error('\n→ DB 페이지와 부모 페이지 모두 Connections → "렌토의 연결" 추가했는지 확인하세요.');
  }

  process.exit(1);
}

console.log('✅ Notion DB 연결 OK');
console.log(`   DB 이름: ${body.title?.[0]?.plain_text ?? '(이름 없음)'}`);

const props = Object.entries(body.properties ?? {}).map(
  ([name, prop]) => `${name} (${prop.type})`,
);
console.log(`   컬럼: ${props.join(', ')}`);

for (const [name, prop] of Object.entries(body.properties ?? {})) {
  if (prop.type === 'select') {
    const options = prop.select?.options?.map((o) => o.name).join(', ') ?? '(없음)';
    console.log(`   · ${name} 옵션: ${options}`);
  }
}
