import { Link } from 'react-router';
import { Construction, Bell } from 'lucide-react';

export function Community() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F8F9FA] px-6 pt-24 pb-12">
      <div className="w-full max-w-lg text-center">
        <div className="mb-8 inline-flex h-20 w-20 items-center justify-center rounded-full bg-[#FF630F]/10">
          <Construction className="h-10 w-10 text-[#FF630F]" />
        </div>

        <span className="mb-4 inline-flex items-center rounded-full bg-[#FFF4ED] px-4 py-1.5 text-sm font-medium text-[#FF630F]">
          준비 중이에요
        </span>

        <h1 className="mb-4 text-3xl text-[#333333] md:text-4xl">
          Lento 커뮤니티를 준비하고 있어요
        </h1>
        <p className="mb-10 text-lg leading-relaxed text-[#888888]">
          같은 여정을 걷는 분들과 편하게 나누실 수 있도록
          <br className="hidden sm:block" />
          커뮤니티를 준비하고 있어요. 조금만 기다려 주세요!
        </p>

        <div className="mb-8 rounded-2xl bg-white p-6 text-left shadow-sm">
          <div className="mb-3 flex items-center gap-2 text-[#333333]">
            <Bell className="h-5 w-5 text-[#FF630F]" />
            <span className="font-medium">곧 만나요</span>
          </div>
          <p className="text-sm leading-relaxed text-[#888888]">
            로그인과 함께 커뮤니티가 열려요. 출시되면 가장 먼저 알려드릴게요.
          </p>
        </div>

        <Link
          to="/pre-register"
          className="inline-flex rounded-xl bg-[#FF630F] px-8 py-3.5 text-white transition-colors hover:bg-[#E55A0D]"
        >
          출시 알림 받아보기
        </Link>
        <div className="mt-4">
          <Link to="/" className="text-sm text-[#888888] transition-colors hover:text-[#333333]">
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}
