import { Link, Navigate, useParams } from 'react-router';
import { ChevronDown, ChevronUp, Share2 } from 'lucide-react';
import { Footer } from '../components/Footer';
import { getAdjacentNotices, getNoticeById } from '../data/notices';
import lentoIcon from '../../imports/ic_lento.svg';

const URL_REGEX = /(https?:\/\/[^\s]+)/g;

function NoticeBody({ text }: { text: string }) {
  const parts = text.split(URL_REGEX);

  return (
    <div className="pt-6 pb-6 text-base leading-relaxed whitespace-pre-wrap text-[#555555] md:text-[15px] md:leading-7">
      {parts.map((part, index) => {
        if (/^https?:\/\//.test(part)) {
          const href = part.replace(/[),.;]+$/, '');
          const trailing = part.slice(href.length);
          return (
            <span key={index}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="break-all text-[#FF630F] underline underline-offset-2 transition-colors hover:text-[#E55A0D]"
              >
                {href}
              </a>
              {trailing}
            </span>
          );
        }
        return <span key={index}>{part}</span>;
      })}
    </div>
  );
}

export function NoticeDetail() {
  const { id } = useParams();
  const noticeId = Number(id);
  const notice = Number.isFinite(noticeId) ? getNoticeById(noticeId) : undefined;

  if (!notice) {
    return <Navigate to="/notices" replace />;
  }

  const { prev, next } = getAdjacentNotices(notice.id);

  const handleShare = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: notice.title, url });
        return;
      }
      await navigator.clipboard.writeText(url);
    } catch {
      // user cancelled or clipboard unavailable
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="px-6 pt-28 pb-20 md:px-10 lg:px-12">
        <article className="mx-auto w-full max-w-3xl">
          <h1 className="mb-6 text-2xl leading-snug text-[#333333] md:text-3xl">
            {notice.title}
          </h1>

          <div className="mb-6 flex items-center gap-3">
            <img
              src={lentoIcon}
              alt="Lento"
              className="h-11 w-11 rounded-full object-cover shadow-sm"
            />
            <div>
              <p className="font-medium text-[#333333]">{notice.author}</p>
              <p className="mt-0.5 text-sm text-[#999999]">
                Notice
                <span className="mx-2 text-[#cccccc]">·</span>
                {notice.date}
                <span className="mx-2 text-[#cccccc]">·</span>
                Hit {notice.hits}
              </p>
            </div>
          </div>

          <div className="border-t border-[#eeeeee]" />

          <img
            src="/img_header.png"
            alt="Lento"
            className="mt-8 mb-2 w-full h-auto"
          />

          <NoticeBody text={notice.body} />

          <div className="flex items-center justify-end pb-4">
            <button
              type="button"
              onClick={handleShare}
              aria-label="공유하기"
              className="text-[#888888] transition-colors hover:text-[#333333]"
            >
              <Share2 className="h-5 w-5" />
            </button>
          </div>

          <nav className="mt-2 border-t border-[#eeeeee]" aria-label="이전·다음 공지">
            {next && (
              <Link
                to={`/notices/${next.id}`}
                className="flex items-center gap-3 border-b border-[#eeeeee] py-4 text-[#555555] transition-colors hover:text-[#333333]"
              >
                <ChevronUp className="h-4 w-4 flex-shrink-0 text-[#999999]" />
                <span className="truncate">{next.title}</span>
              </Link>
            )}
            {prev && (
              <Link
                to={`/notices/${prev.id}`}
                className="flex items-center gap-3 border-b border-[#eeeeee] py-4 text-[#555555] transition-colors hover:text-[#333333]"
              >
                <ChevronDown className="h-4 w-4 flex-shrink-0 text-[#999999]" />
                <span className="truncate">{prev.title}</span>
              </Link>
            )}
          </nav>

          <div className="mt-10 text-center">
            <Link
              to="/notices"
              className="inline-flex rounded-xl border border-[#dddddd] px-6 py-2.5 text-sm text-[#555555] transition-colors hover:border-[#888888] hover:text-[#333333]"
            >
              목록으로
            </Link>
          </div>
        </article>
      </div>
      <Footer />
    </div>
  );
}
