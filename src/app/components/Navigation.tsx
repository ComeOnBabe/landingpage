import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { X } from 'lucide-react';
import lentoIcon from '../../imports/ic_lento.svg';

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isLanding = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const scrollToSection = (id: string) => {
    setIsMenuOpen(false);
    // Wait a tick so the menu closes before scrolling
    requestAnimationFrame(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    });
  };

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isMenuOpen
          ? 'bg-white/95 backdrop-blur-md shadow-sm'
          : isLanding
            ? 'bg-transparent'
            : 'bg-white/95 backdrop-blur-md shadow-sm'
      }`}
    >
      <div className="mx-auto max-w-6xl px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="group flex items-center gap-3" onClick={closeMenu}>
            <img
              src={lentoIcon}
              alt="Lento"
              className="h-10 w-10 rounded-full object-cover shadow-sm"
            />
            <span className="text-xl font-medium text-[#333333]">Lento</span>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {isLanding ? (
              <>
                <button
                  onClick={() => scrollToSection('features')}
                  className="text-[#888888] transition-colors hover:text-[#333333]"
                >
                  서비스 소개
                </button>
                <Link
                  to="/community"
                  className="text-[#888888] transition-colors hover:text-[#333333]"
                >
                  커뮤니티
                </Link>
              </>
            ) : (
              <>
                <Link to="/" className="text-[#888888] transition-colors hover:text-[#333333]">
                  홈
                </Link>
                <Link to="/community" className="text-[#FF630F] transition-colors">
                  커뮤니티
                </Link>
              </>
            )}
            {isLanding ? (
              <button
                onClick={() => scrollToSection('cta')}
                className="rounded-xl bg-[#FF630F] px-6 py-2 text-white transition-colors hover:bg-[#E55A0D]"
              >
                시작하기
              </button>
            ) : (
              <Link
                to="/pre-register"
                className="rounded-xl bg-[#FF630F] px-6 py-2 text-white transition-colors hover:bg-[#E55A0D]"
              >
                시작하기
              </Link>
            )}
          </div>

          <button
            type="button"
            className="relative z-50 flex h-10 w-10 items-center justify-center md:hidden"
            aria-label={isMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-[#333333]" />
            ) : (
              <span className="flex flex-col gap-1.5">
                <span className="h-0.5 w-6 bg-[#333333]" />
                <span className="h-0.5 w-6 bg-[#333333]" />
                <span className="h-0.5 w-6 bg-[#333333]" />
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-out ${
          isMenuOpen ? 'max-h-[420px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="border-t border-black/5 bg-white px-6 py-6 shadow-lg">
          <div className="mx-auto flex max-w-6xl flex-col items-stretch gap-2">
            {isLanding ? (
              <>
                <button
                  onClick={() => scrollToSection('features')}
                  className="rounded-xl px-4 py-3 text-left text-[#333333] transition-colors hover:bg-[#F8F9FA]"
                >
                  서비스 소개
                </button>
                <Link
                  to="/community"
                  onClick={closeMenu}
                  className="rounded-xl px-4 py-3 text-[#333333] transition-colors hover:bg-[#F8F9FA]"
                >
                  커뮤니티
                </Link>
                <button
                  onClick={() => scrollToSection('cta')}
                  className="mt-2 rounded-xl bg-[#FF630F] px-4 py-3 text-center text-white transition-colors hover:bg-[#E55A0D]"
                >
                  시작하기
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/"
                  onClick={closeMenu}
                  className="rounded-xl px-4 py-3 text-[#333333] transition-colors hover:bg-[#F8F9FA]"
                >
                  홈
                </Link>
                <Link
                  to="/community"
                  onClick={closeMenu}
                  className="rounded-xl px-4 py-3 text-[#333333] transition-colors hover:bg-[#F8F9FA]"
                >
                  커뮤니티
                </Link>
                <Link
                  to="/pre-register"
                  onClick={closeMenu}
                  className="mt-2 rounded-xl bg-[#FF630F] px-4 py-3 text-center text-white transition-colors hover:bg-[#E55A0D]"
                >
                  시작하기
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <button
          type="button"
          aria-label="메뉴 닫기"
          className="fixed inset-0 top-[72px] z-[-1] bg-black/20 md:hidden"
          onClick={closeMenu}
        />
      )}
    </nav>
  );
}
