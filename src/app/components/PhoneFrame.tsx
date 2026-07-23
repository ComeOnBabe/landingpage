import { useEffect, useState, useRef } from 'react';

interface PhoneFrameProps {
  screenshot?: string;
  screenshots?: string[];
  alt: string;
  pageCount?: number;
}

export function PhoneFrame({ screenshot, screenshots, alt, pageCount = 3 }: PhoneFrameProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const isMultipleScreenshots = screenshots && screenshots.length > 0;
  const totalPages = isMultipleScreenshots ? screenshots.length : pageCount;

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isDragging) {
        setCurrentPage((prev) => (prev + 1) % totalPages);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [totalPages, isDragging]);

  const handleDragStart = (clientX: number) => {
    setIsDragging(true);
    setStartX(clientX);
  };

  const handleDragMove = (clientX: number) => {
    if (!isDragging) return;
    const diff = clientX - startX;
    setTranslateX(diff);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const threshold = 50;
    if (translateX < -threshold && currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    } else if (translateX > threshold && currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }

    setTranslateX(0);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleDragStart(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    e.preventDefault();
    handleDragMove(e.clientX);
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    e.preventDefault();
    handleDragEnd();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    handleDragStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleDragMove(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    handleDragEnd();
  };

  return (
    <div className="relative mx-auto w-full max-w-[288px] pb-10">
      <div className="relative mx-auto h-[560px] w-[260px] sm:h-[600px] sm:w-72">
        <div
          className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-[70%] w-[90%] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(255,99,15,0.10) 0%, rgba(255,255,255,0) 70%)',
          }}
        />

        <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-b from-[#2c2c2c] via-[#1f1f1f] to-[#2c2c2c] p-2 shadow-[0_24px_60px_rgba(0,0,0,0.16)]">
          <div className="relative flex h-full w-full flex-col overflow-hidden rounded-[2.5rem] bg-black">
            <div className="absolute top-0 left-1/2 z-20 flex h-7 w-32 -translate-x-1/2 items-end justify-center rounded-b-3xl bg-black pb-1">
              <div className="h-1 w-14 rounded-full bg-gray-800"></div>
            </div>

            <div
              ref={containerRef}
              className="relative flex-1 cursor-grab overflow-hidden select-none active:cursor-grabbing"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {isMultipleScreenshots ? (
                <div
                  className={`flex h-full ${isDragging ? '' : 'transition-transform duration-700 ease-in-out'}`}
                  style={{
                    transform: `translateX(calc(-${currentPage * 100}% + ${translateX}px))`,
                  }}
                >
                  {screenshots.map((img, index) => (
                    <div key={index} className="h-full min-w-full flex-shrink-0">
                      <img
                        src={img}
                        alt={`${alt} ${index + 1}`}
                        className="pointer-events-none h-full w-full object-cover object-top"
                        draggable={false}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div
                  className={`flex h-full ${isDragging ? '' : 'transition-transform duration-700 ease-in-out'}`}
                  style={{
                    transform: `translateX(calc(-${currentPage * 100}% + ${translateX}px))`,
                  }}
                >
                  {Array.from({ length: pageCount }).map((_, index) => (
                    <div key={index} className="h-full min-w-full flex-shrink-0 overflow-hidden">
                      <img
                        src={screenshot}
                        alt={`${alt} - Page ${index + 1}`}
                        className="pointer-events-none h-auto w-full object-cover object-top"
                        draggable={false}
                        style={{
                          transform: `translateY(-${index * 100}%)`,
                        }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="absolute -bottom-8 left-1/2 flex -translate-x-1/2 gap-2">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
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
    </div>
  );
}
