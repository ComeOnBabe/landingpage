import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isLanding = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : isLanding ? 'bg-transparent' : 'bg-white/95 backdrop-blur-md shadow-sm'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-[#FF630F] rounded-full flex items-center justify-center text-white text-xl">
              🐦
            </div>
            <span className="text-xl font-medium text-[#333333]">렌토</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {isLanding ? (
              <>
                <button
                  onClick={() => scrollToSection('features')}
                  className="text-[#888888] hover:text-[#333333] transition-colors"
                >
                  서비스 소개
                </button>
                <Link
                  to="/community"
                  className="text-[#888888] hover:text-[#333333] transition-colors"
                >
                  커뮤니티
                </Link>
                <button
                  onClick={() => scrollToSection('cta')}
                  className="text-[#888888] hover:text-[#333333] transition-colors"
                >
                  시작하기
                </button>
              </>
            ) : (
              <>
                <Link to="/" className="text-[#888888] hover:text-[#333333] transition-colors">
                  홈
                </Link>
                <Link to="/community" className="text-[#FF630F] transition-colors">
                  커뮤니티
                </Link>
              </>
            )}
            <Link
              to="/community"
              className="px-6 py-2 bg-[#FF630F] text-white rounded-xl hover:bg-[#E55A0D] transition-colors"
            >
              가입하기
            </Link>
          </div>

          <button className="md:hidden flex flex-col gap-1.5">
            <span className="w-6 h-0.5 bg-[#333333]"></span>
            <span className="w-6 h-0.5 bg-[#333333]"></span>
            <span className="w-6 h-0.5 bg-[#333333]"></span>
          </button>
        </div>
      </div>
    </nav>
  );
}
