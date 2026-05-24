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
    <div className="relative w-72 h-[600px]">
      <div className="absolute inset-0 bg-gradient-to-b from-[#2c2c2c] via-[#1f1f1f] to-[#2c2c2c] rounded-[3rem] shadow-[0_30px_80px_rgba(0,0,0,0.2),0_0_0_1px_rgba(255,255,255,0.1)_inset] p-2">
        <div className="relative w-full h-full bg-black rounded-[2.5rem] overflow-hidden flex flex-col">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20 w-32 h-7 bg-black rounded-b-3xl flex items-end justify-center pb-1">
            <div className="w-14 h-1 bg-gray-800 rounded-full"></div>
          </div>

          <div
            ref={containerRef}
            className="flex-1 relative overflow-hidden cursor-grab active:cursor-grabbing select-none"
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
                  <div key={index} className="min-w-full h-full flex-shrink-0">
                    <img
                      src={img}
                      alt={`${alt} ${index + 1}`}
                      className="w-full h-full object-cover object-top pointer-events-none"
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
                  <div key={index} className="min-w-full h-full flex-shrink-0 overflow-hidden">
                    <img
                      src={screenshot}
                      alt={`${alt} - Page ${index + 1}`}
                      className="w-full h-auto object-cover object-top pointer-events-none"
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

      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentPage
                ? 'bg-[#FF630F] w-8'
                : 'bg-[#333333] w-2 hover:bg-[#555555]'
            }`}
          />
        ))}
      </div>

      <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#FF630F] opacity-10 rounded-full blur-3xl"></div>
    </div>
  );
}
