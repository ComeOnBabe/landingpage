import { PhoneCarousel } from './PhoneCarousel';

interface PhoneFrameProps {
  screenshot?: string;
  screenshots?: string[];
  alt: string;
  pageCount?: number;
}

export function PhoneFrame({ screenshot, screenshots, alt, pageCount = 3 }: PhoneFrameProps) {
  const isMultiple = Boolean(screenshots && screenshots.length > 0);
  const totalPages = isMultiple ? screenshots!.length : pageCount;

  return (
    <PhoneCarousel alt={alt} pageCount={totalPages}>
      {(index) =>
        isMultiple ? (
          <img
            src={screenshots![index]}
            alt={`${alt} ${index + 1}`}
            className="pointer-events-none h-full w-full object-cover object-top"
            draggable={false}
          />
        ) : (
          <div className="h-full w-full overflow-hidden">
            <img
              src={screenshot}
              alt={`${alt} - Page ${index + 1}`}
              className="pointer-events-none h-auto w-full object-cover object-top"
              draggable={false}
              style={{ transform: `translateY(-${index * 100}%)` }}
            />
          </div>
        )
      }
    </PhoneCarousel>
  );
}
