import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { Flag, Search } from 'lucide-react';
import { Footer } from '../components/Footer';
import { notices } from '../data/notices';

export function Notices() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return notices;
    return notices.filter(
      (n) =>
        n.title.toLowerCase().includes(q) ||
        n.author.toLowerCase().includes(q) ||
        n.body.toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <div className="min-h-screen bg-white">
      <div className="px-6 pt-28 pb-20 md:px-10 lg:px-12">
        <div className="mx-auto w-full max-w-5xl">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-2xl font-medium tracking-wide text-[#333333] md:text-3xl">
              Notice
            </h1>

            <label className="relative block w-full sm:w-64">
              <span className="sr-only">공지사항 검색</span>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search"
                className="w-full rounded-full border border-[#dddddd] bg-white py-2.5 pr-11 pl-4 text-sm text-[#333333] outline-none transition-colors placeholder:text-[#bbbbbb] focus:border-[#888888]"
              />
              <Search className="pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 text-[#888888]" />
            </label>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-sm">
              <thead>
                <tr className="border-t-2 border-[#333333] border-b border-[#e5e5e5]">
                  <th className="w-16 py-4 text-center font-normal text-[#999999]">No</th>
                  <th className="py-4 text-left font-normal text-[#999999]">Subject</th>
                  <th className="w-28 py-4 text-center font-normal text-[#999999]">Name</th>
                  <th className="w-32 py-4 text-center font-normal text-[#999999]">Date</th>
                  <th className="w-20 py-4 text-center font-normal text-[#999999]">Hit</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr className="border-b border-[#eeeeee]">
                    <td colSpan={5} className="py-16 text-center text-[#888888]">
                      검색 결과가 없습니다.
                    </td>
                  </tr>
                ) : (
                  filtered.map((notice) => (
                    <tr
                      key={notice.id}
                      role="link"
                      tabIndex={0}
                      onClick={() => navigate(`/notices/${notice.id}`)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          navigate(`/notices/${notice.id}`);
                        }
                      }}
                      className={`cursor-pointer border-b border-[#eeeeee] transition-colors ${
                        notice.pinned ? 'bg-[#f5f5f5]' : 'bg-white hover:bg-[#fafafa]'
                      }`}
                    >
                      <td className="py-4 text-center text-[#888888]">
                        {notice.pinned ? (
                          <Flag className="mx-auto h-4 w-4 fill-[#888888] text-[#888888]" />
                        ) : (
                          notice.id
                        )}
                      </td>
                      <td className="py-4 pr-4 text-left text-[#555555]">{notice.title}</td>
                      <td className="py-4 text-center text-[#888888]">{notice.author}</td>
                      <td className="py-4 text-center text-[#888888]">{notice.date}</td>
                      <td className="py-4 text-center text-[#888888]">{notice.hits}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
