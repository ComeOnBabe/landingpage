import { Footer } from '../components/Footer';

const sections = [
  {
    title: '제1조 (목적)',
    body: '이 약관은 Lento(이하 "서비스")가 제공하는 모바일 애플리케이션 및 관련 서비스의 이용과 관련하여 회사와 회원 사이의 권리·의무 및 책임 사항을 규정해요.',
  },
  {
    title: '제2조 (정의)',
    body: '"회원"이란 이 약관에 동의하고 서비스에 가입하여 이용하는 분을 말해요. "콘텐츠"란 서비스 내에서 제공되거나 회원이 등록하는 문자, 이미지, 영상 등 모든 정보를 말해요.',
  },
  {
    title: '제3조 (약관의 효력과 변경)',
    body: '이 약관은 서비스 화면에 게시하거나 기타 방법으로 공지함으로써 효력이 발생해요. 필요 시 관련 법령을 위반하지 않는 범위에서 약관을 변경할 수 있으며, 변경 시 사전 고지해요.',
  },
  {
    title: '제4조 (서비스의 제공)',
    body: '서비스는 일정 관리, 건강리포트, 부부 커넥팅, AI 라인 분석 등 임신 준비·난임 여정을 돕는 기능을 제공해요. 서비스의 일부는 준비 중이거나 변경될 수 있어요.',
  },
  {
    title: '제5조 (회원가입)',
    body: '회원은 서비스가 정한 절차에 따라 가입 신청을 하고, 회사가 이를 승낙함으로써 이용 계약이 성립해요. 허위 정보를 기재한 경우 서비스 이용이 제한될 수 있어요.',
  },
  {
    title: '제6조 (회원의 의무)',
    body: '회원은 관련 법령과 이 약관, 서비스 이용 안내를 준수해야 해요. 타인의 정보를 도용하거나 서비스를 부정하게 이용해서는 안 돼요.',
  },
  {
    title: '제7조 (서비스의 변경·중단)',
    body: '회사는 운영상·기술상의 필요에 따라 서비스의 전부 또는 일부를 변경하거나 중단할 수 있어요. 이 경우 사전에 공지하며, 부득이한 경우 사후에 공지할 수 있어요.',
  },
  {
    title: '제8조 (책임의 제한)',
    body: '서비스는 의료 행위나 진단을 대체하지 않아요. AI 분석 결과 등은 참고용이며, 건강·임신과 관련한 판단은 반드시 의료 전문가와 상담해 주세요.',
  },
  {
    title: '제9조 (준거법 및 관할)',
    body: '이 약관은 대한민국 법령에 따라 해석되며, 서비스 이용과 관련한 분쟁은 민사소송법 등 관련 법령에 따른 관할 법원에 제기해요.',
  },
];

export function Terms() {
  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <div className="px-6 pt-28 pb-16">
        <div className="mx-auto max-w-3xl">
          <p className="mb-3 text-sm font-medium text-[#FF630F]">이용약관</p>
          <h1 className="mb-3 text-3xl text-[#333333] md:text-4xl">Lento 이용약관</h1>
          <p className="mb-10 text-sm text-[#888888]">최종 업데이트: 2026년 4월 1일</p>

          <div className="space-y-6 rounded-3xl bg-white p-6 shadow-sm md:p-10">
            <p className="leading-relaxed text-[#888888]">
              Lento 서비스를 이용해 주셔서 감사해요. 서비스를 이용하기 전에 아래 약관을 확인해 주세요.
            </p>
            {sections.map((section) => (
              <section key={section.title}>
                <h2 className="mb-2 text-lg text-[#333333]">{section.title}</h2>
                <p className="leading-relaxed text-[#888888]">{section.body}</p>
              </section>
            ))}
            <p className="border-t border-black/5 pt-6 text-sm text-[#888888]">
              약관에 관한 문의는 고객센터로 연락해 주세요.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
