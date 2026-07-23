import lentoIcon from '../../imports/ic_lento.svg';

export function Footer() {
  return (
    <footer className="w-full max-w-full overflow-x-hidden border-t border-[rgba(0,0,0,0.1)] px-6 py-12">
      <div className="mx-auto w-full max-w-6xl">
        <div className="flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
          <div className="flex items-center gap-3">
            <img
              src={lentoIcon}
              alt="Lento"
              className="h-10 w-10 rounded-full object-cover shadow-sm"
            />
            <span className="text-xl font-medium text-[#333333]">Lento</span>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm text-[#888888]">
            <a href="#" className="transition-colors hover:text-[#333333]">
              서비스 소개
            </a>
            <a href="#" className="transition-colors hover:text-[#333333]">
              이용약관
            </a>
            <a href="#" className="transition-colors hover:text-[#333333]">
              개인정보처리방침
            </a>
            <a href="#" className="transition-colors hover:text-[#333333]">
              고객센터
            </a>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-[#888888]">
          <p>© 2026 Lento. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
