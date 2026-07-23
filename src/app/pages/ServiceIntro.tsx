import { Link } from 'react-router';
import { Calendar, Heart, Users, Camera, Check, ArrowRight } from 'lucide-react';
import { Footer } from '../components/Footer';

const services = [
  {
    icon: Calendar,
    title: '일정 관리',
    color: '#EBF4FF',
    description: '복잡한 병원·복약 일정도 Lento와 함께라면 쉬워요.',
    points: [
      '병원 예약 일정을 자동으로 알려드려요',
      '배우자와 실시간으로 일정을 공유해요',
      '약 복용 시간도 리마인더로 챙겨드려요',
    ],
  },
  {
    icon: Heart,
    title: '건강리포트',
    color: '#E6F4EA',
    description: '나의 몸 상태를 정확하게 파악해요.',
    points: [
      '기초 체온 그래프를 한눈에 확인해요',
      '생리 주기와 배란일을 예측해요',
      '건강 데이터 리포트를 자동으로 생성해요',
    ],
  },
  {
    icon: Users,
    title: '부부 커넥팅',
    color: '#FFF4ED',
    description: '함께하기에 더 힘이 나는 여정이에요.',
    points: [
      '서로의 일정과 건강 상태를 확인해요',
      '감정 일기로 소통할 수 있어요',
      '서로를 응원하는 메시지를 보내요',
    ],
  },
  {
    icon: Camera,
    title: 'AI 라인 분석',
    color: '#FFF4ED',
    description: '임신 테스트를 더 정확하고 쉽게 도와드려요.',
    points: [
      '카메라로 임신 테스트기를 촬영해요',
      '임신 가능성을 %로 확인해요',
      '결과 히스토리를 자동으로 저장해요',
    ],
  },
];

export function ServiceIntro() {
  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <div className="px-6 pt-28 pb-16">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-3 text-sm font-medium text-[#FF630F]">서비스 소개</p>
          <h1 className="mb-4 text-3xl text-[#333333] md:text-5xl">
            임신 준비와 난임 여정을 위한
            <br className="hidden sm:block" />
            따뜻한 동반자, Lento
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-[#888888]">
            일정 관리부터 건강리포트, 부부 커넥팅, AI 라인 분석까지
            여정에 필요한 기능을 한곳에서 만나요.
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-5xl gap-6 md:grid-cols-2">
          {services.map((service) => (
            <div key={service.title} className="rounded-3xl bg-white p-8 shadow-sm">
              <div className="mb-5 flex items-center gap-3">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-2xl"
                  style={{ backgroundColor: service.color }}
                >
                  <service.icon className="h-6 w-6 text-[#FF630F]" />
                </div>
                <h2 className="text-xl text-[#333333]">{service.title}</h2>
              </div>
              <p className="mb-6 text-[#888888]">{service.description}</p>
              <ul className="space-y-3">
                {service.points.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#FF630F]">
                      <Check className="h-3 w-3 text-white" />
                    </div>
                    <span className="text-sm text-[#333333]">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-14 max-w-2xl rounded-3xl bg-white p-8 text-center shadow-sm">
          <h3 className="mb-3 text-2xl text-[#333333]">커뮤니티도 준비하고 있어요</h3>
          <p className="mb-6 text-[#888888]">
            같은 여정을 걷는 분들과 나눌 수 있는 공간을 만들고 있어요.
            로그인과 함께 곧 열려요.
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/pre-register"
              className="inline-flex items-center gap-2 rounded-xl bg-[#FF630F] px-6 py-3 text-white transition-colors hover:bg-[#E55A0D]"
            >
              출시 알림 받기
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/community"
              className="inline-flex rounded-xl bg-[#F8F9FA] px-6 py-3 text-[#333333] transition-colors hover:bg-[#EBF4FF]"
            >
              준비 현황 보기
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
