import { Footer } from '../components/Footer';

const sections = [
  {
    title: '1. 수집하는 개인정보',
    body: '서비스 제공을 위해 이메일, 휴대폰 번호, 계정 정보, 건강 관련 기록(기초 체온, 주기 정보 등), 기기 정보, 서비스 이용 기록을 수집할 수 있어요. 민감정보는 회원 동의 범위 내에서만 처리해요.',
  },
  {
    title: '2. 수집 목적',
    body: '회원 식별, 일정·건강리포트·부부 커넥팅 등 핵심 기능 제공, 고객 문의 응대, 서비스 개선, 부정 이용 방지, 법령상 의무 이행을 위해 개인정보를 이용해요.',
  },
  {
    title: '3. 보관 및 파기',
    body: '개인정보는 수집·이용 목적이 달성되면 지체 없이 파기해요. 관련 법령에 따라 일정 기간 보관이 필요한 경우 해당 기간 동안 안전하게 보관해요.',
  },
  {
    title: '4. 제3자 제공 및 처리 위탁',
    body: '원칙적으로 회원의 동의 없이 개인정보를 외부에 제공하지 않아요. 서비스 운영을 위해 필요한 경우 처리 위탁 사실을 고지하고, 안전하게 관리되도록 감독해요.',
  },
  {
    title: '5. 회원의 권리',
    body: '회원은 언제든지 개인정보 열람, 정정, 삭제, 처리 정지를 요청할 수 있어요. 요청은 고객센터를 통해 접수하며, 합리적인 기간 내에 처리해 드려요.',
  },
  {
    title: '6. 안전성 확보 조치',
    body: '개인정보의 분실·도난·유출·변조를 막기 위해 접근 통제, 암호화, 접속 기록 관리 등 기술적·관리적 보호조치를 시행해요.',
  },
  {
    title: '7. 아동의 개인정보',
    body: '서비스는 만 14세 미만 아동을 대상으로 하지 않아요. 해당 아동의 정보가 수집된 사실을 알게 되면 즉시 삭제해요.',
  },
  {
    title: '8. 정책 변경',
    body: '개인정보처리방침이 변경되는 경우 서비스 내 공지 또는 이메일을 통해 알려드려요. 중요한 변경은 시행 전에 충분히 안내해요.',
  },
  {
    title: '9. 문의처',
    body: '개인정보 보호 관련 문의는 고객센터(u.lento25@gmail.com)로 연락해 주세요. 최대한 빠르게 답변드릴게요.',
  },
];

export function Privacy() {
  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <div className="px-6 pt-28 pb-16">
        <div className="mx-auto max-w-3xl">
          <p className="mb-3 text-sm font-medium text-[#FF630F]">개인정보처리방침</p>
          <h1 className="mb-3 text-3xl text-[#333333] md:text-4xl">개인정보처리방침</h1>
          <p className="mb-10 text-sm text-[#888888]">최종 업데이트: 2026년 4월 1일</p>

          <div className="space-y-6 rounded-3xl bg-white p-6 shadow-sm md:p-10">
            <p className="leading-relaxed text-[#888888]">
              Lento는 회원의 개인정보를 소중히 다루며, 관련 법령에 따라 안전하게 보호해요.
            </p>
            {sections.map((section) => (
              <section key={section.title}>
                <h2 className="mb-2 text-lg text-[#333333]">{section.title}</h2>
                <p className="leading-relaxed text-[#888888]">{section.body}</p>
              </section>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
