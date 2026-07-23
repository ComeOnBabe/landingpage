import { Link } from 'react-router';
import lentoIcon from '../../imports/ic_lento.svg';

const links = [
  { to: '/about', label: '서비스 소개' },
  { to: '/terms', label: '이용약관' },
  { to: '/privacy', label: '개인정보처리방침' },
  { to: '/support', label: '고객센터' },
];

export function Footer() {
  return (
    <footer className="w-full max-w-full overflow-x-hidden border-t border-[rgba(0,0,0,0.1)] px-6 py-12">
      <div className="mx-auto w-full max-w-6xl">
        <div className="flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
          <Link to="/" className="flex items-center gap-3">
            <img
              src={lentoIcon}
              alt="Lento"
              className="h-10 w-10 rounded-full object-cover shadow-sm"
            />
            <span className="text-xl font-medium text-[#333333]">Lento</span>
          </Link>

          <div className="flex flex-wrap justify-center gap-6 text-sm text-[#888888]">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="transition-colors hover:text-[#333333]"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-[#888888]">
          <p>© 2026 Lento. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
