import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { notices } from "../data/notices";
import { LoadingImage } from "./LoadingImage";

type HeroSlideMeta = {
  id: string;
  /** File basename under /public/hero, e.g. "slide-1" */
  imageBase: string;
  eyebrow: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaTo: string;
};

type ResolvedSlide = HeroSlideMeta & { image: string };

/** Prefer photo formats; fall back to svg placeholders. */
const IMAGE_EXTENSIONS = [
  "png",
  "webp",
  "jpg",
  "jpeg",
  "avif",
  "gif",
  "svg",
] as const;

const conferenceNoticeId =
  notices.find((n) => n.pinned)?.id ?? notices[0]?.id ?? 2;

const heroSlideMetas: HeroSlideMeta[] = [
  {
    id: "conference",
    imageBase: "slide-1",
    eyebrow: "2026.08.08 Conference",
    title: "Lento",
    description: "Lento 클로즈베타 오프라인 컨퍼런스",
    ctaLabel: "자세히 보기",
    ctaTo: `/notices/${conferenceNoticeId}`,
  },
  {
    id: "launch",
    imageBase: "slide-2",
    eyebrow: "Coming Soon",
    title: "Lento",
    description: "일정 관리부터 건강리포트, 부부 커넥팅까지 Lento에서",
    ctaLabel: "출시 알림 받기",
    ctaTo: "/pre-register",
  },
];

function probeImage(url: string): Promise<boolean> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
  });
}

async function resolveHeroImage(imageBase: string): Promise<string | null> {
  for (const ext of IMAGE_EXTENSIONS) {
    const url = `/hero/${imageBase}.${ext}`;
    if (await probeImage(url)) return url;
  }
  return null;
}

const AUTO_MS = 5500;
const DRAG_THRESHOLD = 56;

export function HeroCarousel() {
  const [slides, setSlides] = useState<ResolvedSlide[]>(() =>
    heroSlideMetas.map((meta) => ({
      ...meta,
      image: '',
    })),
  );
  const [index, setIndex] = useState(0);
  const [copyVisible, setCopyVisible] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const startXRef = useRef(0);
  const startYRef = useRef(0);
  const axisRef = useRef<"undecided" | "horizontal" | "vertical">("undecided");
  const widthRef = useRef(1);
  const pointerIdRef = useRef<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const slide = slides[index] ?? slides[0];

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const resolved = await Promise.all(
        heroSlideMetas.map(async (meta) => ({
          ...meta,
          image: (await resolveHeroImage(meta.imageBase)) ?? '',
        })),
      );
      if (!cancelled) {
        setSlides(resolved);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    setCopyVisible(false);
    const frame = requestAnimationFrame(() => setCopyVisible(true));
    return () => cancelAnimationFrame(frame);
  }, [index]);

  useEffect(() => {
    if (slides.length === 0 || isDragging) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, AUTO_MS);
    return () => clearInterval(timer);
  }, [slides.length, isDragging]);

  const goTo = (next: number) => {
    if (slides.length === 0) return;
    const clamped = Math.max(0, Math.min(slides.length - 1, next));
    setIndex(clamped);
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0) return;
    const target = e.target as HTMLElement;
    if (target.closest("a, button")) return;

    widthRef.current = sectionRef.current?.clientWidth || window.innerWidth;
    startXRef.current = e.clientX;
    startYRef.current = e.clientY;
    axisRef.current = "undecided";
    pointerIdRef.current = e.pointerId;
    setIsDragging(true);
    setDragOffset(0);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging || pointerIdRef.current !== e.pointerId) return;

    const dx = e.clientX - startXRef.current;
    const dy = e.clientY - startYRef.current;

    if (axisRef.current === "undecided") {
      if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;
      axisRef.current = Math.abs(dx) > Math.abs(dy) ? "horizontal" : "vertical";
      if (axisRef.current === "vertical") {
        setIsDragging(false);
        setDragOffset(0);
        pointerIdRef.current = null;
        try {
          e.currentTarget.releasePointerCapture(e.pointerId);
        } catch {
          // already released
        }
        return;
      }
    }

    if (axisRef.current === "horizontal") {
      e.preventDefault();
      setDragOffset(dx);
    }
  };

  const endDrag = (e: React.PointerEvent) => {
    if (pointerIdRef.current !== e.pointerId) return;

    if (isDragging && axisRef.current === "horizontal") {
      const offset = e.clientX - startXRef.current;
      if (offset < -DRAG_THRESHOLD) {
        goTo(index + 1);
      } else if (offset > DRAG_THRESHOLD) {
        goTo(index - 1);
      }
    }

    setIsDragging(false);
    setDragOffset(0);
    axisRef.current = "undecided";
    pointerIdRef.current = null;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // already released
    }
  };

  if (!slide) return null;

  const trackOffset = -index * 100 + (dragOffset / widthRef.current) * 100;

  return (
    <section
      ref={sectionRef}
      className="relative h-svh min-h-[560px] w-full cursor-grab overflow-hidden bg-[#6B6560] select-none active:cursor-grabbing"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
    >
      <div
        className={`flex h-full w-full ${isDragging ? "" : "transition-transform duration-700 ease-out"}`}
        style={{ transform: `translateX(${trackOffset}%)` }}
      >
        {slides.map((item) => (
          <div key={item.id} className="relative h-full w-full flex-shrink-0">
            {item.image ? (
              <LoadingImage
                src={item.image}
                alt=""
                wrapperClassName="h-full w-full"
                className="pointer-events-none h-full w-full object-cover"
                placeholderClassName="bg-[#6B6560]"
                spinnerClassName="h-10 w-10 text-white"
                draggable={false}
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-[#6B6560]">
                <span className="h-10 w-10 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-black/25" />
          </div>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-end px-6 pb-16 pt-28 md:px-12 md:pb-20 lg:px-16">
        <div
          key={slide.id}
          className={`pointer-events-auto max-w-xl transition-all duration-700 ease-out ${
            copyVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <p className="mb-3 text-xs font-medium tracking-[0.2em] text-white/80 uppercase md:text-sm">
            {slide.eyebrow}
          </p>
          <h1 className="mb-3 text-5xl font-light tracking-tight text-white md:text-6xl lg:text-7xl">
            {slide.title}
          </h1>
          <p className="mb-8 max-w-md text-base leading-relaxed text-white/85 md:text-lg">
            {slide.description}
          </p>
          <Link
            to={slide.ctaTo}
            onClick={(e) => e.stopPropagation()}
            onPointerDown={(e) => e.stopPropagation()}
            className="relative z-20 inline-flex items-center justify-center border border-white/80 px-8 py-3 text-sm tracking-wide text-white transition-colors hover:bg-white hover:text-[#333333]"
          >
            {slide.ctaLabel}
          </Link>
        </div>

        <div
          className="pointer-events-auto mt-10 flex items-center gap-3"
          role="tablist"
          aria-label="히어로 슬라이드"
        >
          {slides.map((item, i) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`${i + 1}번째 슬라이드`}
              onClick={() => goTo(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index
                  ? "w-8 bg-white"
                  : "w-1.5 bg-white/45 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
