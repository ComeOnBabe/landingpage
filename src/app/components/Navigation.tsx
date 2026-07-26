import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { X } from 'lucide-react';
import lentoIcon from '../../imports/ic_lento.svg';
import { LoadingImage } from './LoadingImage';

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isAbout = location.pathname === '/about';
  const isCommunity = location.pathname === '/community';
  const isNotices = location.pathname.startsWith('/notices');
  const overlayNav = isHome && !isScrolled && !isMenuOpen;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  const navLinkClass = (active: boolean) => {
    if (overlayNav) {
      return `transition-colors duration-500 ease-in-out hover:text-white ${
        active ? 'text-white' : 'text-white/75'
      }`;
    }
    return `transition-colors duration-500 ease-in-out hover:text-[#333333] ${
      active ? 'text-[#FF630F]' : 'text-[#888888]'
    }`;
  };

  const mobileLinkClass =
    'rounded-xl px-4 py-3 text-[#333333] transition-colors hover:bg-[#F8F9FA]';

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,box-shadow,backdrop-filter,border-color] duration-500 ease-in-out ${
        overlayNav
          ? 'border-b border-transparent bg-transparent shadow-none'
          : isHome
            ? `border-b bg-white/95 shadow-sm backdrop-blur-md ${
                isScrolled || isMenuOpen ? 'border-black/10' : 'border-transparent'
              }`
            : `border-b bg-white/95 backdrop-blur-md ${
                isScrolled || isMenuOpen
                  ? 'border-black/10 shadow-sm'
                  : 'border-transparent shadow-none'
              }`
      }`}
    >
      <div className="w-full px-6 py-4 md:px-10 lg:px-12">
        <div className="flex w-full items-center justify-between">
          <Link
            to="/"
            className="group flex items-center gap-3"
            onClick={closeMenu}
            aria-label="홈으로 이동"
          >
            <LoadingImage
              src={lentoIcon}
              alt="Lento"
              wrapperClassName="h-10 w-10 shrink-0 rounded-full"
              className="h-10 w-10 rounded-full object-cover shadow-sm"
              spinnerClassName="h-4 w-4"
            />
            <span
              className={`text-xl font-medium transition-colors duration-500 ease-in-out ${
                overlayNav ? 'text-white' : 'text-[#333333]'
              }`}
            >
              Lento
            </span>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            <Link to="/about" className={navLinkClass(isAbout)}>
              서비스 소개
            </Link>
            <Link to="/community" className={navLinkClass(isCommunity)}>
              커뮤니티
            </Link>
            <Link to="/notices" className={navLinkClass(isNotices)}>
              공지사항
            </Link>
            <Link
              to="/pre-register"
              className={`rounded-xl border px-6 py-2 transition-[background-color,border-color,color] duration-500 ease-in-out ${
                overlayNav
                  ? 'border-white/80 bg-transparent text-white hover:bg-white hover:text-[#333333]'
                  : 'border-transparent bg-[#FF630F] text-white hover:bg-[#E55A0D]'
              }`}
            >
              시작하기
            </Link>
          </div>

          <button
            type="button"
            className="relative z-50 flex h-10 w-10 items-center justify-center md:hidden"
            aria-label={isMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-[#333333] transition-colors duration-500 ease-in-out" />
            ) : (
              <span className="flex flex-col gap-1.5">
                <span
                  className={`h-0.5 w-6 transition-colors duration-500 ease-in-out ${
                    overlayNav ? 'bg-white' : 'bg-[#333333]'
                  }`}
                />
                <span
                  className={`h-0.5 w-6 transition-colors duration-500 ease-in-out ${
                    overlayNav ? 'bg-white' : 'bg-[#333333]'
                  }`}
                />
                <span
                  className={`h-0.5 w-6 transition-colors duration-500 ease-in-out ${
                    overlayNav ? 'bg-white' : 'bg-[#333333]'
                  }`}
                />
              </span>
            )}
          </button>
        </div>
      </div>

      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-out ${
          isMenuOpen ? 'max-h-[480px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="border-t border-black/5 bg-white px-6 py-6 shadow-lg">
          <div className="mx-auto flex max-w-6xl flex-col items-stretch gap-2">
            <Link to="/about" onClick={closeMenu} className={mobileLinkClass}>
              서비스 소개
            </Link>
            <Link to="/community" onClick={closeMenu} className={mobileLinkClass}>
              커뮤니티
            </Link>
            <Link to="/notices" onClick={closeMenu} className={mobileLinkClass}>
              공지사항
            </Link>
            <Link
              to="/pre-register"
              onClick={closeMenu}
              className="mt-2 rounded-xl bg-[#FF630F] px-4 py-3 text-center text-white transition-colors hover:bg-[#E55A0D]"
            >
              시작하기
            </Link>
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
