import { useState } from 'react';
import { MessageCircle, Heart, Send, Plus, Search, TrendingUp } from 'lucide-react';

interface Comment {
  id: number;
  author: string;
  content: string;
  timeAgo: string;
}

interface Post {
  id: number;
  author: string;
  timeAgo: string;
  title: string;
  content: string;
  likes: number;
  comments: Comment[];
  tag: string;
  liked: boolean;
}

const initialPosts: Post[] = [
  {
    id: 1,
    author: '희망이맘',
    timeAgo: '2시간 전',
    title: '첫 시술 후기 공유해요',
    content: '오늘 첫 시술을 받았어요. 많이 긴장했는데 생각보다 괜찮았습니다. 같은 여정을 걷고 계신 분들께 도움이 되길 바라며 후기 남깁니다. 병원 분위기도 좋았고 선생님께서 친절하게 설명해주셔서 마음이 편했어요.',
    likes: 24,
    comments: [
      { id: 1, author: '레몬트리', content: '후기 감사해요! 저도 다음주 시술인데 용기가 나네요 💪', timeAgo: '1시간 전' },
      { id: 2, author: '토리아빠', content: '좋은 결과 있으시길 응원합니다!', timeAgo: '30분 전' },
    ],
    tag: '시술후기',
    liked: false,
  },
  {
    id: 2,
    author: '토리아빠',
    timeAgo: '5시간 전',
    title: '남편으로서 어떻게 도와줄 수 있을까요?',
    content: '아내가 힘들어하는 모습을 보면서 제가 더 잘 도와주고 싶은데, 어떤 것들이 실질적으로 도움이 될까요? 같은 입장이신 분들의 조언 구합니다. 병원 동행은 항상 하고 있는데 일상에서 더 세심하게 배려하고 싶어요.',
    likes: 42,
    comments: [
      { id: 1, author: '희망이맘', content: '병원 동행해주시는 것만으로도 큰 힘이 돼요. 감정적으로 공감해주시는 게 제일 중요한 것 같아요.', timeAgo: '3시간 전' },
    ],
    tag: '부부소통',
    liked: false,
  },
  {
    id: 3,
    author: '레몬트리',
    timeAgo: '1일 전',
    title: '건강한 식단 레시피 공유합니다 🥗',
    content: '임신 준비하면서 식습관을 많이 바꿨는데요, 제가 먹어본 것 중에 좋았던 레시피들 공유드려요! 특히 엽산이 풍부한 시금치 샐러드와 단백질 보충을 위한 닭가슴살 요리 위주로 만들어 먹고 있어요.',
    likes: 56,
    comments: [
      { id: 1, author: '토리아빠', content: '레시피 감사합니다! 아내한테 만들어줘야겠어요', timeAgo: '20시간 전' },
      { id: 2, author: '새싹맘', content: '저도 따라해봤는데 너무 맛있어요!', timeAgo: '18시간 전' },
    ],
    tag: '건강정보',
    liked: false,
  },
];

export function Community() {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [newComment, setNewComment] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleLike = (postId: number) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          liked: !post.liked,
          likes: post.liked ? post.likes - 1 : post.likes + 1,
        };
      }
      return post;
    }));

    if (selectedPost?.id === postId) {
      setSelectedPost({
        ...selectedPost,
        liked: !selectedPost.liked,
        likes: selectedPost.liked ? selectedPost.likes - 1 : selectedPost.likes + 1,
      });
    }
  };

  const handleAddComment = () => {
    if (!selectedPost || !newComment.trim()) return;

    const newCommentObj: Comment = {
      id: selectedPost.comments.length + 1,
      author: '나',
      content: newComment,
      timeAgo: '방금 전',
    };

    const updatedPost = {
      ...selectedPost,
      comments: [...selectedPost.comments, newCommentObj],
    };

    setPosts(posts.map(post => post.id === selectedPost.id ? updatedPost : post));
    setSelectedPost(updatedPost);
    setNewComment('');
  };

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F8F9FA] pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl text-[#333333] mb-4">렌토 커뮤니티</h1>
          <p className="text-lg text-[#888888]">같은 여정을 걷는 사람들과 함께 나누는 공간</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#888888]" />
                <input
                  type="text"
                  placeholder="게시글 검색..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-[#F8F9FA] border border-[rgba(0,0,0,0.1)] rounded-xl text-[#333333] placeholder:text-[#888888] focus:outline-none focus:ring-2 focus:ring-[#FF630F] focus:border-transparent"
                />
              </div>
            </div>

            {filteredPosts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setSelectedPost(post)}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#FF630F] to-[#E55A0D] rounded-full flex items-center justify-center text-white">
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
                <h3 className="text-xl text-[#333333] mb-2">{post.title}</h3>
                <p className="text-[#888888] mb-4 line-clamp-2">{post.content}</p>
                <div className="flex items-center gap-6">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLike(post.id);
                    }}
                    className={`flex items-center gap-2 ${post.liked ? 'text-[#FF630F]' : 'text-[#888888]'} hover:text-[#FF630F] transition-colors`}
                  >
                    <Heart className={`w-5 h-5 ${post.liked ? 'fill-[#FF630F]' : ''}`} />
                    <span>{post.likes}</span>
                  </button>
                  <div className="flex items-center gap-2 text-[#888888]">
                    <MessageCircle className="w-5 h-5" />
                    <span>{post.comments.length}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <button className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-[#FF630F] text-white rounded-2xl hover:bg-[#E55A0D] transition-colors shadow-sm">
              <Plus className="w-5 h-5" />
              <span>새 글 쓰기</span>
            </button>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-[#FF630F]" />
                <h3 className="text-lg text-[#333333]">인기 주제</h3>
              </div>
              <div className="space-y-2">
                {['시술후기', '부부소통', '건강정보', '병원추천', '마음돌봄'].map((tag) => (
                  <button
                    key={tag}
                    className="block w-full text-left px-4 py-2 text-sm text-[#888888] hover:bg-[#F8F9FA] rounded-xl transition-colors"
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {selectedPost && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedPost(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-[rgba(0,0,0,0.1)]">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#FF630F] to-[#E55A0D] rounded-full flex items-center justify-center text-white text-lg">
                    {selectedPost.author[0]}
                  </div>
                  <div>
                    <div className="text-[#333333]">{selectedPost.author}</div>
                    <div className="text-sm text-[#888888]">{selectedPost.timeAgo}</div>
                  </div>
                </div>
                <span className="text-xs px-3 py-1 bg-[#EBF4FF] text-[#FF630F] rounded-full">
                  {selectedPost.tag}
                </span>
              </div>
              <h2 className="text-2xl text-[#333333] mb-4">{selectedPost.title}</h2>
              <p className="text-[#888888] leading-relaxed">{selectedPost.content}</p>
              <div className="flex items-center gap-6 mt-6">
                <button
                  onClick={() => handleLike(selectedPost.id)}
                  className={`flex items-center gap-2 ${selectedPost.liked ? 'text-[#FF630F]' : 'text-[#888888]'} hover:text-[#FF630F] transition-colors`}
                >
                  <Heart className={`w-5 h-5 ${selectedPost.liked ? 'fill-[#FF630F]' : ''}`} />
                  <span>{selectedPost.likes}</span>
                </button>
                <div className="flex items-center gap-2 text-[#888888]">
                  <MessageCircle className="w-5 h-5" />
                  <span>{selectedPost.comments.length}</span>
                </div>
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-lg text-[#333333] mb-4">댓글 {selectedPost.comments.length}</h3>
              <div className="space-y-4 mb-6">
                {selectedPost.comments.map((comment) => (
                  <div key={comment.id} className="flex gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-[#EBF4FF] to-[#E6F4EA] rounded-full flex items-center justify-center text-[#FF630F] text-sm flex-shrink-0">
                      {comment.author[0]}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm text-[#333333]">{comment.author}</span>
                        <span className="text-xs text-[#888888]">{comment.timeAgo}</span>
                      </div>
                      <p className="text-[#888888] text-sm">{comment.content}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="댓글을 입력하세요..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddComment()}
                  className="flex-1 px-4 py-3 bg-[#F8F9FA] border border-[rgba(0,0,0,0.1)] rounded-xl text-[#333333] placeholder:text-[#888888] focus:outline-none focus:ring-2 focus:ring-[#FF630F] focus:border-transparent"
                />
                <button
                  onClick={handleAddComment}
                  className="px-6 py-3 bg-[#FF630F] text-white rounded-xl hover:bg-[#E55A0D] transition-colors flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
