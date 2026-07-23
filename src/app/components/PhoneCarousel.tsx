import { useState, useEffect, type ReactNode } from 'react';

type PhoneCarouselProps = {
  alt: string;
  children: (page: number) => ReactNode;
  pageCount: number;
  className?: string;
};

/**
 * Responsive phone chrome + horizontal page carousel.
 * Slides use flex-basis 100% (not min-w-full) so they cannot blow out the layout width.
 */
export function PhoneCarousel({ alt, children, pageCount, className = '' }: PhoneCarouselProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isDragging) {
        setCurrentPage((prev) => (prev + 1) % pageCount);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [pageCount, isDragging]);

  const handleDragStart = (clientX: number) => {
    setIsDragging(true);
    setStartX(clientX);
  };

  const handleDragMove = (clientX: number) => {
    if (!isDragging) return;
    setTranslateX(clientX - startX);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    const threshold = 40;
    if (translateX < -threshold && currentPage < pageCount - 1) {
      setCurrentPage(currentPage + 1);
    } else if (translateX > threshold && currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
    setTranslateX(0);
  };

  return (
    <div
      className={`relative mx-auto w-full min-w-0 max-w-[280px] pb-10 ${className}`}
      style={{ width: 'min(70vw, 280px)' }}
      aria-label={alt}
    >
      <div
        className="relative mx-auto w-full"
        style={{ aspectRatio: '9 / 19.5' }}
      >
        <div
          className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-[70%] w-[90%] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(255,99,15,0.10) 0%, rgba(255,255,255,0) 70%)',
          }}
        />

        <div className="absolute inset-0 overflow-hidden rounded-[2.5rem] bg-gradient-to-b from-[#2c2c2c] via-[#1f1f1f] to-[#2c2c2c] p-[7px] shadow-[0_20px_50px_rgba(0,0,0,0.16)] sm:rounded-[3rem] sm:p-2">
          <div className="relative flex h-full w-full min-w-0 flex-col overflow-hidden rounded-[2.1rem] bg-black sm:rounded-[2.5rem]">
            <div className="absolute top-0 left-1/2 z-20 flex h-6 w-24 -translate-x-1/2 items-end justify-center rounded-b-2xl bg-black pb-1 sm:h-7 sm:w-32 sm:rounded-b-3xl">
              <div className="h-1 w-12 rounded-full bg-gray-800 sm:w-14" />
            </div>

            <div
              className="relative min-h-0 min-w-0 flex-1 touch-pan-y overflow-hidden"
              onMouseDown={(e) => {
                e.preventDefault();
                handleDragStart(e.clientX);
              }}
              onMouseMove={(e) => {
                if (!isDragging) return;
                e.preventDefault();
                handleDragMove(e.clientX);
              }}
              onMouseUp={handleDragEnd}
              onMouseLeave={handleDragEnd}
              onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
              onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
              onTouchEnd={handleDragEnd}
            >
              <div
                className={`flex h-full w-full ${isDragging ? '' : 'transition-transform duration-700 ease-in-out'}`}
                style={{
                  transform: `translate3d(calc(-${currentPage * 100}% + ${translateX}px), 0, 0)`,
                }}
              >
                {Array.from({ length: pageCount }).map((_, index) => (
                  <div
                    key={index}
                    className="h-full w-full min-w-0 shrink-0 grow-0 basis-full overflow-hidden"
                  >
                    {children(index)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-1/2 flex -translate-x-1/2 gap-2">
        {Array.from({ length: pageCount }).map((_, index) => (
          <button
            key={index}
            type="button"
            aria-label={`슬라이드 ${index + 1}`}
            onClick={() => setCurrentPage(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentPage
                ? 'w-8 bg-[#FF630F]'
                : 'w-2 bg-[#D1D5DB] hover:bg-[#9CA3AF]'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
