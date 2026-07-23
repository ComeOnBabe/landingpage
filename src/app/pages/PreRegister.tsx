import { useState } from 'react';
import { Calendar, Bell, Check } from 'lucide-react';

export function PreRegister() {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [notifyBy, setNotifyBy] = useState<'email' | 'phone'>('email');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FFF4ED] via-white to-[#EBF4FF] pt-24 pb-12 flex items-center justify-center px-6">
        <div className="max-w-lg w-full text-center">
          <div className="mb-8">
            <div className="w-20 h-20 bg-[#FF630F] rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
              <Check className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl text-[#333333] mb-4">
              사전예약이 완료되었어요!
            </h1>
            <p className="text-lg text-[#888888]">
              Lento가 4월에 출시되면 가장 먼저 알려드릴게요.
              <br />
              함께할 준비를 해주세요 💕
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Bell className="w-6 h-6 text-[#FF630F]" />
              <p className="text-[#333333]">
                {notifyBy === 'email' ? email : phone}
              </p>
            </div>
            <p className="text-sm text-[#888888]">
              위 {notifyBy === 'email' ? '이메일' : '연락처'}로 출시 소식을 전달드립니다
            </p>
          </div>

          <button
            onClick={() => window.location.href = '/'}
            className="mt-8 px-8 py-3 text-[#888888] hover:text-[#333333] transition-colors"
          >
            홈으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF4ED] via-white to-[#EBF4FF] pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FF630F]/10 rounded-full mb-6">
            <Calendar className="w-5 h-5 text-[#FF630F]" />
            <span className="text-[#FF630F] font-medium">2026년 4월 출시 예정</span>
          </div>
          <h1 className="text-4xl md:text-5xl text-[#333333] mb-4">
            Lento가 곧 찾아갑니다
          </h1>
          <p className="text-xl text-[#888888]">
            사전예약하시면 출시 즉시 알려드려요
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-xl text-[#333333] mb-6">사전예약 혜택</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#FF630F] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-[#333333] font-medium">출시 즉시 알림</p>
                  <p className="text-sm text-[#888888]">가장 먼저 Lento를 만나보세요</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#FF630F] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-[#333333] font-medium">프리미엄 기능 30일 무료</p>
                  <p className="text-sm text-[#888888]">모든 기능을 제한 없이</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#FF630F] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-[#333333] font-medium">런칭 이벤트 참여 기회</p>
                  <p className="text-sm text-[#888888]">특별한 선물을 준비했어요</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-xl text-[#333333] mb-6">알림 받기</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex gap-2 mb-4">
                <button
                  type="button"
                  onClick={() => setNotifyBy('email')}
                  className={`flex-1 px-4 py-2 rounded-xl transition-colors ${
                    notifyBy === 'email'
                      ? 'bg-[#FF630F] text-white'
                      : 'bg-[#F8F9FA] text-[#888888] hover:bg-[#EBF4FF]'
                  }`}
                >
                  이메일
                </button>
                <button
                  type="button"
                  onClick={() => setNotifyBy('phone')}
                  className={`flex-1 px-4 py-2 rounded-xl transition-colors ${
                    notifyBy === 'phone'
                      ? 'bg-[#FF630F] text-white'
                      : 'bg-[#F8F9FA] text-[#888888] hover:bg-[#EBF4FF]'
                  }`}
                >
                  문자
                </button>
              </div>

              {notifyBy === 'email' ? (
                <div>
                  <label className="block text-sm text-[#888888] mb-2">이메일</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@email.com"
                    className="w-full px-4 py-3 bg-[#F8F9FA] border border-[rgba(0,0,0,0.1)] rounded-xl text-[#333333] placeholder:text-[#888888] focus:outline-none focus:ring-2 focus:ring-[#FF630F] focus:border-transparent"
                    required
                  />
                </div>
              ) : (
                <div>
                  <label className="block text-sm text-[#888888] mb-2">휴대폰 번호</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="010-1234-5678"
                    className="w-full px-4 py-3 bg-[#F8F9FA] border border-[rgba(0,0,0,0.1)] rounded-xl text-[#333333] placeholder:text-[#888888] focus:outline-none focus:ring-2 focus:ring-[#FF630F] focus:border-transparent"
                    required
                  />
                </div>
              )}

              <button
                type="submit"
                className="w-full px-8 py-4 bg-[#FF630F] text-white rounded-xl hover:bg-[#E55A0D] transition-colors shadow-sm font-medium"
              >
                사전예약하기
              </button>

              <p className="text-xs text-[#888888] text-center">
                사전예약은 출시 알림을 위한 것이며, 언제든 취소할 수 있습니다.
              </p>
            </form>
          </div>
        </div>

        <div className="text-center">
          <div className="inline-block bg-white rounded-2xl px-8 py-4 shadow-sm">
            <p className="text-sm text-[#888888] mb-2">현재까지</p>
            <p className="text-3xl text-[#FF630F] font-medium">1,247명</p>
            <p className="text-sm text-[#888888] mt-2">사전예약 참여</p>
          </div>
        </div>
      </div>
    </div>
  );
}
