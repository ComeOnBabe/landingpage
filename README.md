# 렌토 (Lento) - 랜딩 페이지

임신 준비 및 난임 여정을 위한 따뜻한 동반자 서비스

## 기술 스택
- React 18.3.1
- TypeScript
- Tailwind CSS v4
- React Router
- Vite

## 주요 기능
- 📱 반응형 디자인
- 🎨 렌토 브랜드 디자인 시스템
- 🖼️ 인터랙티브 폰 프레임 (드래그/스와이프)
- 📅 사전예약 시스템
- 💬 커뮤니티 (댓글, 좋아요)

## 설치 및 실행

```bash
# 의존성 설치
pnpm install

# 개발 서버 실행
pnpm dev
```

## 환경 변수

`.env.example`을 `.env`로 복사한 뒤 Notion 값을 채워 주세요.

```bash
cp .env.example .env
npm run check:notion   # DB 연결 및 컬럼 확인
```

## API

Netlify Functions로 동작하며, 로컬 `npm run dev`에서는 `vite-plugin-local-api.ts`가 같은 경로를 처리합니다.

| 메서드 | 경로 | 설명 |
| --- | --- | --- |
| POST | `/api/pre-register` | 사전예약 접수 → Notion에 행 생성 |
| GET | `/api/pre-register-count` | 사전예약 수 집계 (`문의 유형 = 사전 예약` 행 개수, 60초 캐시) |
| POST | `/api/withdraw` | 회원탈퇴 요청 접수 → Notion에 행 생성 (`문의 유형 = 회원 탈퇴`) |

> 회원탈퇴 사유/상세 내용은 Notion 페이지 본문에 기록됩니다.
> 별도 컬럼에 넣으려면 DB에 텍스트 컬럼을 만들고 `NOTION_PROP_REASON`에 컬럼명을 지정하세요.
> `문의 유형` Select에 `회원 탈퇴` 옵션이 없으면 Notion이 validation_error를 반환하므로 옵션을 먼저 추가해야 합니다.

## 파일 구조
- `/src/app/App.tsx` - 메인 앱
- `/src/app/components/` - 재사용 컴포넌트
- `/src/app/pages/` - 페이지 컴포넌트
- `/src/imports/` - 이미지 assets

## 배포
프로젝트는 Vite로 빌드됩니다.
