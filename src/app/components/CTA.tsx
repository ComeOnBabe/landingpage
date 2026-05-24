import { ArrowRight } from 'lucide-react';
import { useState } from 'react';

export function CTA() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Email submitted:', email);
  };

  return (
    <section id="cta" className="w-full px-6 py-20">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-3xl p-12 shadow-[0_10px_40px_rgba(0,0,0,0.06)]">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl text-[#333333] mb-4">
              지금 바로 시작하세요
            </h2>
            <p className="text-lg text-[#888888]">
              렌토와 함께하는 여정, 오늘부터 시작해보세요
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="이메일을 입력하세요"
              className="flex-1 px-6 py-4 bg-[#F8F9FA] border border-[rgba(0,0,0,0.1)] rounded-2xl text-[#333333] placeholder:text-[#888888] focus:outline-none focus:ring-2 focus:ring-[#FF630F] focus:border-transparent"
              required
            />
            <button
              type="submit"
              className="px-8 py-4 bg-[#FF630F] text-white rounded-2xl hover:bg-[#E55A0D] transition-colors shadow-sm flex items-center justify-center gap-2 group"
            >
              <span>시작하기</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <p className="text-sm text-[#888888] text-center mt-6">
            가입하시면 렌토의 <span className="text-[#333333]">이용약관</span>과{' '}
            <span className="text-[#333333]">개인정보처리방침</span>에 동의하게 됩니다.
          </p>
        </div>
      </div>
    </section>
  );
}
