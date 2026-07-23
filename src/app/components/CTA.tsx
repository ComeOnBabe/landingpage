import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router';

export function CTA() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Email submitted:', email);
  };

  return (
    <section id="cta" className="w-full max-w-full overflow-x-hidden px-6 py-20">
      <div className="mx-auto w-full max-w-3xl">
        <div className="rounded-3xl bg-white p-8 text-center shadow-[0_10px_40px_rgba(0,0,0,0.06)] sm:p-12">
          <div className="mb-8">
            <h2 className="mb-4 text-3xl text-[#333333] md:text-4xl">
              지금 바로 시작해요
            </h2>
            <p className="text-lg text-[#888888]">
              Lento와 함께하는 여정, 오늘부터 시작해 봐요
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mx-auto flex w-full max-w-xl flex-col gap-4 sm:flex-row">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="이메일을 입력해 주세요"
              className="flex-1 rounded-2xl border border-[rgba(0,0,0,0.1)] bg-[#F8F9FA] px-6 py-4 text-[#333333] placeholder:text-[#888888] focus:border-transparent focus:ring-2 focus:ring-[#FF630F] focus:outline-none"
              required
            />
            <button
              type="submit"
              className="group flex items-center justify-center gap-2 rounded-2xl bg-[#FF630F] px-8 py-4 text-white shadow-sm transition-colors hover:bg-[#E55A0D]"
            >
              <span>시작하기</span>
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </button>
          </form>

          <p className="mt-6 text-sm text-[#888888]">
            가입하시면 Lento의{' '}
            <Link to="/terms" className="text-[#333333] underline-offset-2 hover:underline">
              이용약관
            </Link>
            과{' '}
            <Link to="/privacy" className="text-[#333333] underline-offset-2 hover:underline">
              개인정보처리방침
            </Link>
            에 동의하게 돼요.
          </p>
        </div>
      </div>
    </section>
  );
}
