import { MessageCircle, Heart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router';

const previewPosts = [
  {
    id: 1,
    author: '희망이맘',
    timeAgo: '2시간 전',
    title: '첫 시술 후기 공유해요',
    content: '오늘 첫 시술을 받았어요. 많이 긴장했는데 생각보다 괜찮았습니다. 같은 여정을 걷고 계신 분들께 도움이 되길 바라며...',
    likes: 24,
    comments: 8,
    tag: '시술후기',
  },
  {
    id: 2,
    author: '토리아빠',
    timeAgo: '5시간 전',
    title: '남편으로서 어떻게 도와줄 수 있을까요?',
    content: '아내가 힘들어하는 모습을 보면서 제가 더 잘 도와주고 싶은데, 어떤 것들이 실질적으로 도움이 될까요? 같은 입장이신 분들의 조언 구합니다.',
    likes: 42,
    comments: 15,
    tag: '부부소통',
  },
  {
    id: 3,
    author: '레몬트리',
    timeAgo: '1일 전',
    title: '건강한 식단 레시피 공유합니다 🥗',
    content: '임신 준비하면서 식습관을 많이 바꿨는데요, 제가 먹어본 것 중에 좋았던 레시피들 공유드려요!',
    likes: 56,
    comments: 23,
    tag: '건강정보',
  },
];

export function CommunityPreview() {
  return (
    <section className="w-full max-w-full overflow-x-hidden bg-white px-6 py-20">
      <div className="mx-auto w-full max-w-6xl">
        <div className="mx-auto mb-12 w-full max-w-2xl text-center">
          <h2 className="mb-4 text-3xl text-[#333333] md:text-4xl">
            혼자가 아니에요, 함께해요
          </h2>
          <p className="text-lg text-[#888888]">
            같은 여정을 걷는 사람들과 경험을 나누고 위로를 주고받으세요
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {previewPosts.map((post) => (
            <div
              key={post.id}
              className="bg-[#F8F9FA] rounded-2xl p-6 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-[#FF630F] to-[#E55A0D] rounded-full flex items-center justify-center text-white text-sm">
                    {post.author[0]}
                  </div>
                  <div>
                    <div className="text-sm text-[#333333]">{post.author}</div>
                    <div className="text-xs text-[#888888]">{post.timeAgo}</div>
                  </div>
                </div>
                <span className="text-xs px-3 py-1 bg-[#EBF4FF] text-[#FF630F] rounded-full">
                  {post.tag}
                </span>
              </div>
              <h3 className="text-lg text-[#333333] mb-2 group-hover:text-[#FF630F] transition-colors">
                {post.title}
              </h3>
              <p className="text-sm text-[#888888] mb-4 line-clamp-2">{post.content}</p>
              <div className="flex items-center gap-4 text-sm text-[#888888]">
                <div className="flex items-center gap-1">
                  <Heart className="w-4 h-4" />
                  <span>{post.likes}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle className="w-4 h-4" />
                  <span>{post.comments}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/community"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#FF630F] text-white rounded-2xl hover:bg-[#E55A0D] transition-colors shadow-sm group"
          >
            <span>커뮤니티 입장하기</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
