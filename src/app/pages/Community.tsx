import { useEffect, useMemo, useState } from 'react';
import {
  ChevronUp,
  Crown,
  MessageCircle,
  PenLine,
} from 'lucide-react';
import lentoIcon from '../../imports/ic_lento.svg';
import { LoadingImage } from '../components/LoadingImage';

type CommunityPost = {
  id: number;
  category: string;
  tags: string[];
  time: string;
  title: string;
  author: string;
  preview: string;
  likes: number;
  views: number;
  comments: number;
  image?: string;
};

const categories = [
  '전체',
  '일상',
  '임신준비',
  '난임',
  '건강',
  '질문',
  '응원',
  '부부',
] as const;

const posts: CommunityPost[] = [
  {
    id: 1,
    category: '임신준비',
    tags: ['부부', '임신준비', '응원', '일상'],
    time: '방금',
    title: '첫 병원 예약 잡고 왔는데 마음이 복잡해요',
    author: '천천히가는중',
    preview:
      '오늘 드디어 같이 병원 예약을 잡았어요. 설레기도 하고 걱정되기도 하고… 비슷한 분들 계세요?',
    likes: 12,
    views: 84,
    comments: 5,
  },
  {
    id: 2,
    category: '건강',
    tags: ['건강리포트', '기록', '부부커넥트'],
    time: '4분 전',
    title: '기초체온 같이 보니 대화가 늘었어요',
    author: '우리둘만의속도',
    preview:
      '혼자 메모장에만 적다가 Lento처럼 같이 보는 방식이 있으면 좋겠다는 생각을 자주 해요. 여러분은 어떻게 기록하세요?',
    likes: 28,
    views: 156,
    comments: 9,
    image: '/img_header.png',
  },
  {
    id: 3,
    category: '난임',
    tags: ['난임', '마음케어', '응원'],
    time: '21분 전',
    title: '기다림이 길어질 때 서로에게 하는 말',
    author: '따뜻한하루',
    preview:
      '결과가 나올 때마다 분위기가 가라앉아서, 오늘은 일부러 산책하면서 이야기했어요. 작은 루틴이 도움이 되더라고요.',
    likes: 41,
    views: 203,
    comments: 14,
  },
  {
    id: 4,
    category: '질문',
    tags: ['질문', '병원', '일정'],
    time: '1시간 전',
    title: '병원 일정 공유할 때 팁 있으신가요?',
    author: '일정정리중',
    preview:
      '예약이 겹치거나 깜빡하는 날이 있어서요. 캘린더로 같이 보는 분들 꿀팁 부탁드려요.',
    likes: 7,
    views: 62,
    comments: 3,
  },
  {
    id: 5,
    category: '응원',
    tags: ['응원', '일상'],
    time: '2시간 전',
    title: '오늘도 서로에게 수고했다고 말했어요',
    author: '천천히함께',
    preview:
      '작은 한마디인데도 분위기가 부드러워지더라고요. 응원의 말을 나누는 분들 더 듣고 싶어요.',
    likes: 19,
    views: 91,
    comments: 6,
  },
  {
    id: 6,
    category: '부부',
    tags: ['부부', '커넥팅'],
    time: '어제',
    title: '감정 일기로 대화가 이어졌어요',
    author: '둘만의기록',
    preview:
      '말로 하기 어려웠던 마음을 짧게 적고 나니 배우자가 먼저 이야기해 주더라고요.',
    likes: 33,
    views: 140,
    comments: 11,
  },
];

export function Community() {
  const [showTop, setShowTop] = useState(false);
  const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]>('전체');

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 240);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const filteredPosts = useMemo(() => {
    if (activeCategory === '전체') return posts;
    return posts.filter(
      (post) =>
        post.category === activeCategory || post.tags.includes(activeCategory),
    );
  }, [activeCategory]);

  return (
    <div className="relative min-h-screen bg-white">
      <div className="min-h-screen w-full pt-[72px]">
        {/* Mobile: horizontal scroll chips */}
        <div className="sticky top-[72px] z-20 border-b border-[#eeeeee] bg-white md:hidden">
          <div className="flex gap-2 overflow-x-auto px-4 py-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {categories.map((category) => {
              const active = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`shrink-0 rounded-full px-3.5 py-1.5 text-sm transition-colors ${
                    active
                      ? 'bg-[#FF630F] text-white'
                      : 'bg-[#f5f5f5] text-[#666666]'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Desktop: top category tabs */}
        <div className="sticky top-[72px] z-20 hidden border-b border-[#eeeeee] bg-white md:block">
          <div className="mx-auto flex w-full max-w-5xl items-center gap-1 px-4 lg:max-w-6xl lg:px-6">
            {categories.map((category) => {
              const active = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`relative px-4 py-4 text-sm transition-colors ${
                    active
                      ? 'font-medium text-[#FF630F]'
                      : 'text-[#888888] hover:text-[#333333]'
                  }`}
                >
                  {category}
                  {active && (
                    <span className="absolute right-3 bottom-0 left-3 h-0.5 rounded-full bg-[#FF630F]" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mx-auto w-full max-w-md pb-24 md:max-w-5xl md:px-4 lg:max-w-6xl lg:px-6">
          {filteredPosts.length === 0 ? (
            <p className="px-4 py-16 text-center text-sm text-[#888888]">
              이 카테고리의 글이 아직 없어요.
            </p>
          ) : (
            <div className="md:grid md:grid-cols-2 md:gap-0">
              {filteredPosts.map((post) => (
                <article
                  key={post.id}
                  className="border-b border-[#eeeeee] bg-white px-4 py-4 md:border md:border-t-0 md:border-l-0 md:border-[#eeeeee] md:px-6 md:py-5 first:md:border-t"
                >
                  <div className="mb-2 flex items-start justify-between gap-3">
                    <p className="text-xs leading-relaxed text-[#FF630F] md:text-sm">
                      {post.tags.join(' ')}
                    </p>
                    <span className="shrink-0 text-xs text-[#aaaaaa]">{post.time}</span>
                  </div>

                  <h2 className="mb-3 text-[17px] font-bold leading-snug text-[#222222] md:text-xl">
                    {post.title}
                  </h2>

                  <div className="mb-3 flex items-center gap-2">
                    <LoadingImage
                      src={lentoIcon}
                      alt=""
                      wrapperClassName="h-6 w-6 shrink-0 rounded-full"
                      className="h-6 w-6 rounded-full object-cover"
                      spinnerClassName="h-3 w-3"
                    />
                    <span className="text-sm text-[#888888]">{post.author}</span>
                  </div>

                  <p className="mb-3 text-sm leading-relaxed text-[#555555] md:text-[15px]">
                    {post.preview}
                  </p>

                  {post.image && (
                    <LoadingImage
                      src={post.image}
                      alt=""
                      wrapperClassName="mb-3 w-full rounded-lg"
                      className="w-full rounded-lg object-cover md:max-h-64"
                    />
                  )}

                  <p className="mb-3 text-xs text-[#999999]">
                    공감 {post.likes} · 조회수 {post.views} · 댓글 {post.comments}
                  </p>

                  <div className="flex border-t border-[#eeeeee]">
                    <button
                      type="button"
                      className="flex flex-1 items-center justify-center gap-1.5 py-3 text-sm text-[#666666]"
                      tabIndex={-1}
                    >
                      <Crown className="h-4 w-4 text-[#FF630F]" />
                      공감해요
                    </button>
                    <div className="w-px bg-[#eeeeee]" />
                    <button
                      type="button"
                      className="flex flex-1 items-center justify-center gap-1.5 py-3 text-sm text-[#666666]"
                      tabIndex={-1}
                    >
                      <MessageCircle className="h-4 w-4" />
                      댓글달기
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        <div className="pointer-events-none fixed right-4 bottom-8 z-20 flex flex-col items-center gap-3 md:right-8 md:bottom-10">
          {showTop && (
            <button
              type="button"
              tabIndex={-1}
              className="flex h-12 w-12 flex-col items-center justify-center rounded-full border border-[#dddddd] bg-white text-[10px] text-[#666666] shadow-md"
              aria-hidden
            >
              <ChevronUp className="h-4 w-4" />
              TOP
            </button>
          )}
          <button
            type="button"
            tabIndex={-1}
            className="flex h-14 w-14 flex-col items-center justify-center rounded-full bg-[#555555] text-[10px] text-white shadow-lg"
            aria-hidden
          >
            <PenLine className="h-5 w-5" />
            글쓰기
          </button>
        </div>
      </div>

      <div
        className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 px-6"
        role="dialog"
        aria-modal="true"
        aria-label="커뮤니티 준비중"
      >
        <p className="text-center text-xl font-medium text-white md:text-2xl">
          아직 준비중이에요
        </p>
      </div>
    </div>
  );
}
