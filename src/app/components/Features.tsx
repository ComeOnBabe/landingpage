import { Calendar, Heart, Users, Check, Camera } from 'lucide-react';
import { PhoneFrame } from './PhoneFrame';
import calendarImg from '../../imports/image-1.png';
import homeImg from '../../imports/image.png';
import connectImg from '../../imports/image-2.png';
import aiImg from '../../imports/image-3.png';
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
    subtitle: '복잡한 일정도 렌토와 함께라면 쉽게',
    points: [
      '병원 예약 일정을 자동으로 알림',
      '배우자와 실시간으로 일정 공유',
      '검사 결과 및 메모를 함께 기록',
      '약 복용 시간 리마인더',
      '다음 진료 준비 체크리스트',
    ],
    screenshots: [cal1, cal2, cal3, cal4],
  },
  {
    icon: Heart,
    title: '건강 추적',
    color: '#E6F4EA',
    subtitle: '나의 몸 상태를 정확하게 파악하세요',
    points: [
      '기초 체온 그래프로 한눈에 확인',
      '생리 주기 및 배란일 예측',
      '컨디션과 증상 일기 작성',
      '건강 데이터 리포트 자동 생성',
      '의료진과 공유 가능한 기록',
    ],
    screenshots: [health1, health2],
  },
  {
    icon: Users,
    title: '부부 연결',
    color: '#FFF4ED',
    subtitle: '함께 하기에 더 힘이 나는 여정',
    points: [
      '서로의 일정과 건강 상태 확인',
      '감정 일기를 통한 소통',
      '서로를 응원하는 메시지',
      '중요한 날짜 함께 체크',
      '부부가 함께 보는 통계',
    ],
    screenshots: [connect1, connect2, connect3, connect4],
  },
  {
    icon: Camera,
    title: 'AI 라인 분석',
    color: '#FFF4ED',
    subtitle: '임신 테스트를 더 정확하고 쉽게',
    points: [
      '카메라로 임신 테스트기 촬영',
      '임신 가능성을 %로 확인',
      'AI 분석으로 객관적인 판단',
      '결과 히스토리 자동 저장',
      '의료진과 상담 시 활용 가능',
    ],
    screenshots: [ai1, ai2, ai3, ai4],
  },
];

export function Features() {
  return (
    <section id="features" className="w-full">
      <div className="text-center py-20 px-6 bg-white">
        <h2 className="text-3xl md:text-4xl text-[#333333] mb-4">
          일정 관리, 건강 추적, 부부 연결을 한 곳에서
        </h2>
        <p className="text-lg text-[#888888]">
          렌토와 함께 체계적이고 따뜻한 여정을 시작하세요
        </p>
      </div>

      {features.map((feature, index) => (
        <div
          key={index}
          className={`py-20 px-6 ${index % 2 === 0 ? 'bg-white' : 'bg-[#F8F9FA]'}`}
        >
          <div className="max-w-6xl mx-auto">
            <div className={`grid md:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
              <div className={`${index % 2 === 1 ? 'md:order-2' : ''}`}>
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center"
                    style={{ backgroundColor: feature.color }}
                  >
                    <feature.icon className="w-7 h-7 text-[#FF630F]" />
                  </div>
                  <h3 className="text-2xl text-[#333333]">{feature.title}</h3>
                </div>
                <h4 className="text-xl text-[#333333] mb-8">
                  {feature.subtitle}
                </h4>
                <div className="space-y-4">
                  {feature.points.map((point, idx) => (
                    <div key={idx} className="flex items-start gap-4">
                      <div className="w-6 h-6 rounded-full bg-[#FF630F] flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                      <p className="text-[#333333]">{point}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className={`flex justify-center ${index % 2 === 1 ? 'md:order-1' : ''}`}>
                <PhoneFrame
                  screenshot={feature.screenshot}
                  screenshots={feature.screenshots}
                  alt={feature.title}
                  pageCount={feature.pageCount}
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
