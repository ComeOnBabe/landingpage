export function Footer() {
  return (
    <footer className="w-full px-6 py-12 border-t border-[rgba(0,0,0,0.1)]">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#FF630F] rounded-full flex items-center justify-center text-white text-xl">
              🐦
            </div>
            <span className="text-xl font-medium text-[#333333]">렌토</span>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm text-[#888888]">
            <a href="#" className="hover:text-[#333333] transition-colors">
              서비스 소개
            </a>
            <a href="#" className="hover:text-[#333333] transition-colors">
              이용약관
            </a>
            <a href="#" className="hover:text-[#333333] transition-colors">
              개인정보처리방침
            </a>
            <a href="#" className="hover:text-[#333333] transition-colors">
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
