import { Calendar, Heart, Users, Check, Camera } from 'lucide-react';
import { PhoneFrame } from './PhoneFrame';
import health1 from '../../imports/image-21.png';
import health2 from '../../imports/image-22.png';
import connect1 from '../../imports/image-4.png';
import connect2 from '../../imports/image-5.png';
import connect3 from '../../imports/image-6.png';
import connect4 from '../../imports/image-7.png';
import ai1 from '../../imports/image-11.png';
import ai2 from '../../imports/image-10.png';
import ai3 from '../../imports/image-9.png';
import ai4 from '../../imports/image-8.png';
import cal1 from '../../imports/image-20.png';
import cal2 from '../../imports/image-19.png';
import cal3 from '../../imports/image-18.png';
import cal4 from '../../imports/image-17.png';

const features = [
  {
    icon: Calendar,
    title: '일정 관리',
    color: '#EBF4FF',
    subtitle: '복잡한 일정도 Lento와 함께라면 쉬워요',
    points: [
      '병원 예약 일정을 자동으로 알려드려요',
      '배우자와 실시간으로 일정을 공유해요',
      '약 복용 시간도 리마인더로 챙겨드려요',
    ],
    screenshots: [cal1, cal2, cal3, cal4],
  },
  {
    icon: Heart,
    title: '건강리포트',
    color: '#E6F4EA',
    subtitle: '나의 몸 상태를 정확하게 파악해요',
    points: [
      '기초 체온 그래프를 한눈에 확인해요',
      '생리 주기와 배란일을 예측해요',
      '건강 데이터 리포트를 자동으로 생성해요',
    ],
    screenshots: [health1, health2],
  },
  {
    icon: Users,
    title: '부부 커넥팅',
    color: '#FFF4ED',
    subtitle: '함께하기에 더 힘이 나는 여정이에요',
    points: [
      '서로의 일정과 건강 상태를 확인해요',
      '감정 일기로 소통할 수 있어요',
      '서로를 응원하는 메시지를 보내요',
    ],
    screenshots: [connect1, connect2, connect3, connect4],
  },
  {
    icon: Camera,
    title: 'AI 라인 분석',
    color: '#FFF4ED',
    subtitle: '임신 테스트를 더 정확하고 쉽게 도와드려요',
    points: [
      '카메라로 임신 테스트기를 촬영해요',
      '임신 가능성을 %로 확인해요',
      '결과 히스토리를 자동으로 저장해요',
    ],
    screenshots: [ai1, ai2, ai3, ai4],
  },
];

export function Features() {
  return (
    <section id="features" className="w-full max-w-full overflow-x-hidden">
      <div className="bg-white px-6 py-16 text-center md:py-20">
        <div className="mx-auto w-full max-w-2xl">
          <h2 className="mb-4 text-3xl text-[#333333] md:text-4xl">
            일정 관리, 건강리포트, 부부 커넥팅을 한곳에서 만나요
          </h2>
          <p className="text-lg text-[#888888]">
            Lento와 함께 체계적이고 따뜻한 여정을 시작해요
          </p>
        </div>
      </div>

      {features.map((feature, index) => (
        <div
          key={index}
          className={`w-full max-w-full overflow-x-hidden px-6 py-16 md:py-20 ${
            index % 2 === 0 ? 'bg-white' : 'bg-[#F8F9FA]'
          }`}
        >
          <div className="mx-auto flex w-full min-w-0 max-w-6xl flex-col items-center gap-12 md:grid md:grid-cols-2 md:items-center md:gap-12">
            <div
              className={`flex w-full min-w-0 max-w-xl flex-col items-center text-center md:max-w-none md:items-start md:text-left ${
                index % 2 === 1 ? 'md:order-2' : ''
              }`}
            >
              <div className="mb-6 flex items-center justify-center gap-3 md:justify-start">
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-2xl"
                  style={{ backgroundColor: feature.color }}
                >
                  <feature.icon className="h-7 w-7 text-[#FF630F]" />
                </div>
                <h3 className="text-2xl text-[#333333]">{feature.title}</h3>
              </div>
              <h4 className="mb-8 text-xl text-[#333333]">{feature.subtitle}</h4>
              <div className="w-full space-y-4 text-left">
                {feature.points.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#FF630F]">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                    <p className="text-[#333333]">{point}</p>
                  </div>
                ))}
              </div>
            </div>

            <div
              className={`flex w-full min-w-0 justify-center ${
                index % 2 === 1 ? 'md:order-1' : ''
              }`}
            >
              <PhoneFrame screenshots={feature.screenshots} alt={feature.title} />
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
