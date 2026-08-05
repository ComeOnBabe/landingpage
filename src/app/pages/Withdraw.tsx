import { useState } from 'react';
import { Link } from 'react-router';
import { AlertTriangle, Check, UserMinus } from 'lucide-react';
import { Footer } from '../components/Footer';

const REASONS = [
  '서비스를 더 이상 이용하지 않아요',
  '개인정보 삭제를 원해요',
  '사용이 불편해요',
  '다른 서비스를 이용하게 됐어요',
  '기타',
];

// 계정을 지우지 않고 기록만 삭제하는 경로. Play 데이터 보안의
// '데이터 삭제 요청 가능' 신고와 실제 앱 동작을 일치시키기 위해 안내한다.
const PARTIAL_DELETIONS = [
  { label: '게시글 · 댓글', path: '메뉴 → 내가 쓴 글 → 내 글 삭제' },
  { label: '몸상태 기록', path: '몸상태 기록 → 기록 선택 → 삭제' },
  { label: '일정', path: '캘린더 → 일정 선택 → 삭제' },
  { label: 'AI라인 분석', path: 'AI라인 → 분석 기록 → 삭제' },
  { label: '배우자 연결', path: '설정 및 기타 → 배우자 연결 → 연결 해제' },
];

const NOTICES = [
  '탈퇴 요청은 접수 후 영업일 기준 3일 이내에 처리해 드립니다.',
  '탈퇴가 완료되면 계정 정보와 기록한 데이터는 모두 삭제되며 복구할 수 없습니다.',
  '관련 법령에 따라 보관이 필요한 정보는 정해진 기간 동안만 별도로 보관한 뒤 파기합니다.',
  '사전예약만 신청하신 경우에도 이 양식으로 신청 정보 삭제를 요청하실 수 있습니다.',
];

export function Withdraw() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [reason, setReason] = useState('');
  const [detail, setDetail] = useState('');
  const [agree, setAgree] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/withdraw', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim() || undefined,
          email: email.trim(),
          phone: phone.trim() || undefined,
          reason,
          detail: detail.trim() || undefined,
          agree,
        }),
      });

      const data = (await response.json()) as { ok?: boolean; error?: string };

      if (!response.ok || !data.ok) {
        throw new Error(data.error ?? 'submit_failed');
      }

      setIsSubmitted(true);
    } catch (err) {
      const message =
        err instanceof Error && err.message !== 'submit_failed'
          ? err.message
          : '탈퇴 요청 접수에 실패했어요. 잠시 후 다시 시도해 주세요.';
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-[#F8F9FA]">
        <div className="flex min-h-[70vh] items-center justify-center px-6 pt-28 pb-16">
          <div className="w-full max-w-lg text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#FF630F]">
              <Check className="h-8 w-8 text-white" />
            </div>
            <h1 className="mb-4 text-2xl text-[#333333] md:text-3xl">
              탈퇴 요청이 접수되었습니다
            </h1>
            <p className="mb-8 text-[#888888]">
              영업일 기준 3일 이내에 처리하고
              <br />
              <span className="text-[#333333]">{email}</span> 으로 결과를 안내해 드릴게요.
            </p>
            <Link
              to="/"
              className="inline-flex rounded-xl bg-[#FF630F] px-6 py-3 text-white transition-colors hover:bg-[#E55A0D]"
            >
              홈으로 돌아가기
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <div className="px-6 pt-28 pb-16">
        <div className="mx-auto max-w-3xl">
          <div className="mb-10 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#FF630F]/10">
              <UserMinus className="h-7 w-7 text-[#FF630F]" />
            </div>
            <h1 className="mb-3 text-3xl text-[#333333] md:text-4xl">회원탈퇴</h1>
            <p className="text-[#888888]">
              탈퇴 요청을 남겨 주시면 확인 후 계정과 데이터를 삭제해 드립니다.
            </p>
          </div>

          <div className="mb-8 rounded-3xl border border-[#FF630F]/20 bg-[#FFF4ED] p-6 md:p-8">
            <div className="mb-4 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 flex-shrink-0 text-[#FF630F]" />
              <h2 className="text-lg text-[#333333]">탈퇴 전 확인해 주세요</h2>
            </div>
            <ul className="space-y-2">
              {NOTICES.map((notice) => (
                <li key={notice} className="flex gap-2 text-sm leading-relaxed text-[#666666]">
                  <span className="text-[#FF630F]">·</span>
                  <span>{notice}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-8 rounded-3xl bg-white p-6 shadow-sm md:p-8">
            <h2 className="mb-2 text-xl text-[#333333]">
              계정은 그대로 두고 일부 기록만 지우고 싶으신가요?
            </h2>
            <p className="mb-5 text-sm text-[#888888]">
              탈퇴하지 않아도 앱에서 직접 삭제하실 수 있습니다.
            </p>
            <ul className="space-y-3">
              {PARTIAL_DELETIONS.map((item) => (
                <li key={item.label} className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-3">
                  <span className="min-w-[7rem] text-sm text-[#333333]">{item.label}</span>
                  <span className="text-sm leading-relaxed text-[#888888]">{item.path}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm leading-relaxed text-[#888888]">
              앱에서 삭제하기 어려운 경우
              {' '}
              <a href="mailto:u.lento25@gmail.com" className="text-[#FF630F] underline">
                u.lento25@gmail.com
              </a>
              으로 요청해 주시면 확인 후 처리해 드립니다.
            </p>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm md:p-8">
            <h2 className="mb-2 text-xl text-[#333333]">탈퇴 요청하기</h2>
            <p className="mb-6 text-sm text-[#888888]">
              가입하실 때 사용하신 정보를 입력해 주세요. 본인 확인 후 처리해 드립니다.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="withdraw-name" className="mb-2 block text-sm text-[#888888]">
                  이름 <span className="text-[#BBBBBB]">(선택)</span>
                </label>
                <input
                  id="withdraw-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="이름을 입력해 주세요"
                  className="w-full rounded-xl border border-black/10 bg-[#F8F9FA] px-4 py-3 text-[#333333] placeholder:text-[#888888] outline-none focus:ring-2 focus:ring-[#FF630F]"
                />
              </div>

              <div>
                <label htmlFor="withdraw-email" className="mb-2 block text-sm text-[#888888]">
                  이메일
                </label>
                <input
                  id="withdraw-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="example@email.com"
                  className="w-full rounded-xl border border-black/10 bg-[#F8F9FA] px-4 py-3 text-[#333333] placeholder:text-[#888888] outline-none focus:ring-2 focus:ring-[#FF630F]"
                />
              </div>

              <div>
                <label htmlFor="withdraw-phone" className="mb-2 block text-sm text-[#888888]">
                  연락처 <span className="text-[#BBBBBB]">(선택)</span>
                </label>
                <input
                  id="withdraw-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="010-1234-5678"
                  className="w-full rounded-xl border border-black/10 bg-[#F8F9FA] px-4 py-3 text-[#333333] placeholder:text-[#888888] outline-none focus:ring-2 focus:ring-[#FF630F]"
                />
              </div>

              <div>
                <span className="mb-2 block text-sm text-[#888888]">탈퇴 사유</span>
                <div className="space-y-2">
                  {REASONS.map((item) => (
                    <label
                      key={item}
                      className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 transition-colors ${
                        reason === item
                          ? 'border-[#FF630F] bg-[#FFF4ED]'
                          : 'border-black/10 bg-[#F8F9FA] hover:bg-[#EBF4FF]'
                      }`}
                    >
                      <input
                        type="radio"
                        name="reason"
                        value={item}
                        checked={reason === item}
                        onChange={(e) => setReason(e.target.value)}
                        required
                        className="h-4 w-4 accent-[#FF630F]"
                      />
                      <span className="text-sm text-[#333333]">{item}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="withdraw-detail" className="mb-2 block text-sm text-[#888888]">
                  상세 내용{' '}
                  <span className="text-[#BBBBBB]">
                    {reason === '기타' ? '(필수)' : '(선택)'}
                  </span>
                </label>
                <textarea
                  id="withdraw-detail"
                  value={detail}
                  onChange={(e) => setDetail(e.target.value)}
                  required={reason === '기타'}
                  rows={4}
                  placeholder="불편하셨던 점을 남겨 주시면 서비스 개선에 참고하겠습니다"
                  className="w-full resize-none rounded-xl border border-black/10 bg-[#F8F9FA] px-4 py-3 text-[#333333] placeholder:text-[#888888] outline-none focus:ring-2 focus:ring-[#FF630F]"
                />
              </div>

              <label className="flex cursor-pointer items-start gap-3 rounded-xl bg-[#F8F9FA] px-4 py-3">
                <input
                  type="checkbox"
                  checked={agree}
                  onChange={(e) => setAgree(e.target.checked)}
                  required
                  className="mt-0.5 h-4 w-4 accent-[#FF630F]"
                />
                <span className="text-sm leading-relaxed text-[#666666]">
                  위 안내 사항을 확인했으며, 탈퇴 시 데이터가 삭제되어 복구할 수 없다는 점에
                  동의합니다.
                </span>
              </label>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-xl bg-[#FF630F] px-6 py-3.5 text-white transition-colors hover:bg-[#E55A0D] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? '접수 중…' : '탈퇴 요청하기'}
              </button>

              {error && <p className="text-center text-sm text-red-500">{error}</p>}

              <p className="text-center text-xs text-[#888888]">
                문의가 필요하시면{' '}
                <Link to="/support" className="text-[#333333] underline-offset-2 hover:underline">
                  고객센터
                </Link>
                로 연락해 주세요.
              </p>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
