import { Link } from 'react-router';
import { PhoneCarousel } from './PhoneCarousel';
import calendarImg from '../../imports/image-1.png';
import homeImg from '../../imports/image.png';
import connectImg from '../../imports/image-2.png';
import aiImg from '../../imports/image-3.png';

const screenshots = [homeImg, calendarImg, connectImg, aiImg];

export function Hero() {
  return (
    <section
      id="hero"
      className="w-full max-w-full overflow-x-hidden bg-white px-6 py-24 pt-24 md:py-40 md:pt-32"
    >
      <div className="mx-auto w-full min-w-0 max-w-6xl">
        <div className="flex min-w-0 flex-col items-center gap-12 md:grid md:grid-cols-2 md:items-center md:gap-10">
          <div className="mx-auto flex w-full min-w-0 max-w-xl flex-col items-center space-y-6 text-center md:mx-0 md:max-w-none md:items-start md:text-left">
            <h1 className="text-4xl text-[#333333] md:text-5xl lg:text-6xl">
              함께하는 편안한 여정, <span className="text-[#FF630F]">Lento</span>
            </h1>
            <p className="text-lg text-[#888888] md:text-xl">
              임신 준비와 난임 여정을 겪는 부부들을 위한 따뜻한 동반자예요.
              일정 관리부터 건강리포트, 그리고 부부 커넥팅까지 모든 걸 한곳에서 도와드려요.
            </p>
            <div className="flex w-full flex-col items-stretch justify-center gap-4 pt-4 sm:flex-row sm:items-center md:justify-start">
              <Link
                to="/pre-register"
                className="flex items-center justify-center gap-3 rounded-xl bg-black px-6 py-3.5 text-white shadow-md transition-colors hover:bg-gray-800"
              >
                <svg className="h-7 w-7 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                <div className="text-left">
                  <div className="text-[10px] opacity-70">Download on the</div>
                  <div className="-mt-0.5 text-base font-semibold">App Store</div>
                </div>
              </Link>
              <Link
                to="/pre-register"
                className="flex items-center justify-center gap-3 rounded-xl bg-black px-6 py-3.5 text-white shadow-md transition-colors hover:bg-gray-800"
              >
                <svg className="h-7 w-7 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                </svg>
                <div className="text-left">
                  <div className="text-[10px] opacity-70">GET IT ON</div>
                  <div className="-mt-0.5 text-base font-semibold">Google Play</div>
                </div>
              </Link>
            </div>
          </div>

          <div className="flex w-full min-w-0 justify-center md:justify-end">
            <PhoneCarousel alt="Lento 앱 미리보기" pageCount={screenshots.length}>
              {(index) => (
                <img
                  src={screenshots[index]}
                  alt={`Screen ${index + 1}`}
                  className="pointer-events-none h-full w-full object-cover object-top"
                  draggable={false}
                />
              )}
            </PhoneCarousel>
          </div>
        </div>
      </div>
    </section>
  );
}
