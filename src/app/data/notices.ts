export type Notice = {
  id: number;
  title: string;
  author: string;
  date: string;
  hits: number;
  pinned?: boolean;
  body: string;
};

/** Newest / pinned first — display order for list and prev/next. */
export const notices: Notice[] = [
  {
    id: 2,
    title: "8월 8일 Lento 컨퍼런스 안내",
    author: "Lento",
    date: "2026-07-20",
    hits: 128,
    pinned: true,
    body: `함께하는 편안한 여정, Lento
안녕하세요, Lento 팀입니다.

부부 연동 난임 케어 솔루션 'LENTO'의 정식 런칭 전, 오프라인 CBT(비공개 베타 테스트) 및 전문가 초청 컨퍼런스에 예비 사용자 여러분을 초대합니다. 본 행사는 1인 중심의 난임 관리에서 벗어나, 부부가 함께 데이터를 기록하고 소통하는 새로운 서비스 경험을 제공하기 위해 기획되었습니다.

-------

[행사 개요]
일시: 2026년 8월 8일 (토요일) 15:30 ~ 17:30 (총 120분)
장소: 서울 강남구 역삼로 180 MARU180 이벤트홀
대상: 난임 시술을 진행 중이거나 준비 중인 부부
모집 인원: 선착순 50명

주요 프로그램:
· LENTO 핵심 기능 시연 및 비전 스피치
· 난임 관련 연사자 초청 특강
· 애플리케이션 서비스 CBT (AI 테스트기 판독, 부부 계정 연동 기능 등)
· 참여자 혜택: 웰컴 키트, 정식 런칭 시 프리미엄 구독 특별 프로모션 혜택 제공

[특이사항]
· 참가비는 무료입니다.
· 주차 장소는 별도 제공되지 않으므로, 대중교통을 통해서 참석하시는 것을 권장드립니다. 자차를 이용하시는 분은 인근 주차장을 이용해주시기 바랍니다.
· 서비스 CBT는 개인 스마트폰을 통해서 진행됩니다. 핸드폰의 배터리 충전 상태를 확인해주시기 바랍니다.
· 애플리케이션 서비스 특성상, 부부 동반 참석을 권장드립니다. 동반 참석을 권장드리지만 1인 참여도 가능합니다!

[참여 신청] https://docs.google.com/forms/d/e/1FAIpQLSdhBkFBm1g68YxlA-CMqbf3twPrpRBa05Mtu44w1oiVpGinfg/viewform
[문의사항] u.lento25@gmail.com
[인스타그램] @u.lento_official`,
  },
  {
    id: 3,
    title: "카카오톡 오픈채팅방 개설 안내",
    author: "Lento",
    date: "2026-07-18",
    hits: 74,
    body: `함께하는 편안한 여정, Lento
안녕하세요, Lento 팀입니다.

난임 여정을 함께하는 분들이 정보를 나누고 서로를 응원할 수 있도록 카카오톡 오픈채팅방을 개설했습니다. 혼자 고민하지 않으셔도 됩니다. 같은 길을 걷는 분들과 편하게 이야기 나누어 보세요.

-------

[오픈채팅방 안내]
채팅방 이름: 🌱 난임 함께 버티는 사람들 | 정보·공감·응원
대상: 난임 시술을 진행 중이거나 준비 중인 분, 그리고 함께하는 가족
참여 방법: 아래 링크를 통해 카카오톡 오픈채팅방에 입장

[오픈채팅방 바로가기] https://open.kakao.com/o/gkonDpFi

[이용 안내]
· 본 채팅방은 정보 공유와 공감, 응원을 위한 커뮤니티 공간입니다.
· 개인정보(실명, 연락처, 병원 정보 등)는 신중하게 공유해 주시기 바랍니다.
· 상호 존중을 바탕으로 한 건전한 대화 문화를 지켜 주시면 감사하겠습니다.
· 의료적 판단이나 진단은 반드시 전문 의료진과 상담하시기 바랍니다.

[문의사항] u.lento25@gmail.com
[인스타그램] @u.lento_official`,
  },
  {
    id: 1,
    title: "Lento 사전예약 오픈 안내",
    author: "Lento",
    date: "2026-04-01",
    hits: 96,
    body: `함께하는 편안한 여정, Lento
안녕하세요, Lento 팀입니다.

부부 연동 난임 케어 솔루션 'LENTO'가 2026년 8월 출시를 준비하고 있습니다. 정식 런칭에 앞서 사전예약을 오픈하오니, 관심 있는 분들께서는 미리 신청해 주시기 바랍니다. 사전예약에 참여해 주시면 출시 소식을 가장 먼저 안내해 드립니다.

-------

[사전예약 안내]
출시 예정: 2026년 8월
신청 방법: 서비스 홈페이지 내 '사전예약' 또는 '시작하기'를 통해 신청
알림 수단: 이메일 또는 휴대폰 번호

[사전예약 혜택]
· 출시 즉시 알림 — Lento 오픈 소식을 가장 먼저 받아보실 수 있습니다.
· 프리미엄 기능 30일 무료 — 출시 후 주요 기능을 제한 없이 체험하실 수 있습니다.
· 런칭 이벤트 참여 기회 — 사전예약 고객을 위한 특별 이벤트에 우선 참여하실 수 있습니다.

[안내 사항]
· 사전예약은 출시 알림을 위한 신청이며, 유료 결제나 자동 결제가 발생하지 않습니다.
· 신청 정보는 출시 안내 목적 외에는 사용되지 않으며, 관련 법령에 따라 안전하게 관리됩니다.
· 사전예약은 언제든지 고객센터를 통해 취소하실 수 있습니다.

[문의사항] u.lento25@gmail.com
[인스타그램] @u.lento_official`,
  },
];

export function getNoticeById(id: number) {
  return notices.find((n) => n.id === id);
}

export function getAdjacentNotices(id: number) {
  const index = notices.findIndex((n) => n.id === id);
  if (index < 0) return { prev: null, next: null };
  return {
    next: index > 0 ? notices[index - 1] : null,
    prev: index < notices.length - 1 ? notices[index + 1] : null,
  };
}
