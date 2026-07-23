import { Construction, ArrowRight } from 'lucide-react';
import { Link } from 'react-router';

export function CommunityPreview() {
  return (
    <section className="w-full max-w-full overflow-x-hidden bg-white px-6 py-20">
      <div className="mx-auto w-full max-w-3xl text-center">
        <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#FF630F]/10">
          <Construction className="h-8 w-8 text-[#FF630F]" />
        </div>

        <h2 className="mb-4 text-3xl text-[#333333] md:text-4xl">
          혼자가 아니에요, 함께해요
        </h2>
        <p className="mb-8 text-lg text-[#888888]">
          같은 여정을 걷는 분들과 경험을 나눌 커뮤니티를 준비하고 있어요
        </p>

        <div className="mb-10 rounded-3xl bg-[#F8F9FA] px-6 py-10">
          <span className="mb-3 inline-flex rounded-full bg-[#FFF4ED] px-4 py-1.5 text-sm font-medium text-[#FF630F]">
            준비 중이에요
          </span>
          <p className="text-[#888888]">
            로그인과 함께 곧 열려요. 조금만 기다려 주세요!
          </p>
        </div>

        <Link
          to="/community"
          className="inline-flex items-center gap-2 rounded-2xl bg-[#FF630F] px-8 py-4 text-white shadow-sm transition-colors hover:bg-[#E55A0D]"
        >
          <span>준비 현황 보기</span>
          <ArrowRight className="h-5 w-5" />
        </Link>
      </div>
    </section>
  );
}
