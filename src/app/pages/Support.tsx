import { useState } from 'react';
import { Link } from 'react-router';
import { Mail, MessageCircle, ChevronDown, Clock } from 'lucide-react';
import { Footer } from '../components/Footer';

const faqs = [
  {
    q: 'Lento는 어떤 서비스인가요?',
    a: '임신 준비와 난임 여정을 돕는 앱이에요. 일정 관리, 건강리포트, 부부 커넥팅, AI 라인 분석 기능을 제공해요.',
  },
  {
    q: '출시는 언제인가요?',
    a: '2026년 4월 출시를 준비하고 있어요. 사전예약을 하시면 출시 소식을 가장 먼저 알려드려요.',
  },
  {
    q: '커뮤니티는 언제 열려요?',
    a: '커뮤니티는 현재 준비 중이에요. 로그인 기능과 함께 공개될 예정이에요.',
  },
  {
    q: 'AI 라인 분석은 의료 진단인가요?',
    a: '아니요. AI 결과는 참고용이며 의료 진단을 대체하지 않아요. 중요한 결정은 반드시 의료 전문가와 상담해 주세요.',
  },
  {
    q: '계정이나 데이터 삭제를 요청하고 싶어요',
    a: '아래 이메일로 요청해 주세요. 확인 후 관련 법령에 따라 빠르게 처리해 드릴게요.',
  },
];

export function Support() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <div className="px-6 pt-28 pb-16">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <p className="mb-3 text-sm font-medium text-[#FF630F]">고객센터</p>
            <h1 className="mb-4 text-3xl text-[#333333] md:text-4xl">무엇을 도와드릴까요?</h1>
            <p className="text-lg text-[#888888]">
              자주 묻는 질문을 확인하거나, 직접 문의를 남겨 주세요.
            </p>
          </div>

          <div className="mb-10 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl bg-white p-5 text-center shadow-sm">
              <Mail className="mx-auto mb-3 h-6 w-6 text-[#FF630F]" />
              <p className="mb-1 font-medium text-[#333333]">이메일</p>
              <a href="mailto:u.lento25@gmail.com" className="text-sm text-[#888888] hover:text-[#FF630F]">
                u.lento25@gmail.com
              </a>
            </div>
            <div className="rounded-2xl bg-white p-5 text-center shadow-sm">
              <Clock className="mx-auto mb-3 h-6 w-6 text-[#FF630F]" />
              <p className="mb-1 font-medium text-[#333333]">운영 시간</p>
              <p className="text-sm text-[#888888]">평일 10:00 – 18:00</p>
            </div>
            <div className="rounded-2xl bg-white p-5 text-center shadow-sm">
              <MessageCircle className="mx-auto mb-3 h-6 w-6 text-[#FF630F]" />
              <p className="mb-1 font-medium text-[#333333]">평균 답변</p>
              <p className="text-sm text-[#888888]">영업일 기준 1–2일</p>
            </div>
          </div>

          <div className="mb-10 rounded-3xl bg-white p-6 shadow-sm md:p-8">
            <h2 className="mb-6 text-xl text-[#333333]">자주 묻는 질문</h2>
            <div className="space-y-2">
              {faqs.map((faq, index) => {
                const open = openIndex === index;
                return (
                  <div key={faq.q} className="overflow-hidden rounded-2xl bg-[#F8F9FA]">
                    <button
                      type="button"
                      onClick={() => setOpenIndex(open ? null : index)}
                      className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                    >
                      <span className="text-[#333333]">{faq.q}</span>
                      <ChevronDown
                        className={`h-5 w-5 flex-shrink-0 text-[#888888] transition-transform ${
                          open ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {open && (
                      <p className="border-t border-black/5 px-5 py-4 text-sm leading-relaxed text-[#888888]">
                        {faq.a}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm md:p-8">
            <h2 className="mb-2 text-xl text-[#333333]">문의하기</h2>
            <p className="mb-6 text-sm text-[#888888]">
              남겨 주신 내용은 확인 후 이메일로 답변드릴게요.
            </p>

            {sent ? (
              <div className="rounded-2xl bg-[#E6F4EA] px-6 py-8 text-center">
                <p className="mb-2 text-lg font-medium text-[#333333]">문의가 접수됐어요</p>
                <p className="mb-6 text-sm text-[#888888]">
                  남겨 주신 연락처로 답변드릴게요. 조금만 기다려 주세요!
                </p>
                <Link
                  to="/"
                  className="inline-flex rounded-xl bg-[#FF630F] px-6 py-3 text-white transition-colors hover:bg-[#E55A0D]"
                >
                  홈으로 돌아가기
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm text-[#888888]">이름</label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full rounded-xl border border-black/10 bg-[#F8F9FA] px-4 py-3 text-[#333333] outline-none focus:ring-2 focus:ring-[#FF630F]"
                    placeholder="이름을 입력해 주세요"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm text-[#888888]">이메일</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full rounded-xl border border-black/10 bg-[#F8F9FA] px-4 py-3 text-[#333333] outline-none focus:ring-2 focus:ring-[#FF630F]"
                    placeholder="이메일을 입력해 주세요"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm text-[#888888]">문의 내용</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    rows={5}
                    className="w-full resize-none rounded-xl border border-black/10 bg-[#F8F9FA] px-4 py-3 text-[#333333] outline-none focus:ring-2 focus:ring-[#FF630F]"
                    placeholder="궁금한 점을 적어 주세요"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-xl bg-[#FF630F] px-6 py-3.5 text-white transition-colors hover:bg-[#E55A0D] sm:w-auto"
                >
                  문의 보내기
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
