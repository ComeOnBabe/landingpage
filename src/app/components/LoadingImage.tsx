import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ImgHTMLAttributes,
  type SyntheticEvent,
} from 'react';
import { Loader2 } from 'lucide-react';

type LoadingImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  /** Classes for the wrapper that holds spinner + image */
  wrapperClassName?: string;
  /** Classes for the spinner icon */
  spinnerClassName?: string;
  /** Classes for the loading placeholder backdrop */
  placeholderClassName?: string;
};

export function LoadingImage({
  className = '',
  wrapperClassName = '',
  spinnerClassName = '',
  placeholderClassName = '',
  onLoad,
  onError,
  alt = '',
  src,
  ...props
}: LoadingImageProps) {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading');

  useEffect(() => {
    if (!src) {
      setStatus('loading');
      return;
    }
    const img = imgRef.current;
    if (img?.complete && img.naturalWidth + img.naturalHeight > 0) {
      setStatus('loaded');
      return;
    }
    // complete but 0x0 is common for some SVGs — still treat as loaded if complete
    if (img?.complete) {
      setStatus('loaded');
      return;
    }
    setStatus('loading');
  }, [src]);

  const setRefs = useCallback((img: HTMLImageElement | null) => {
    imgRef.current = img;
    if (!img || !src) return;
    if (img.complete) {
      setStatus('loaded');
    }
  }, [src]);

  const handleLoad = (e: SyntheticEvent<HTMLImageElement>) => {
    setStatus('loaded');
    onLoad?.(e);
  };

  const handleError = (e: SyntheticEvent<HTMLImageElement>) => {
    // Keep placeholder — don't reveal broken-image icon
    setStatus('error');
    onError?.(e);
  };

  const showPlaceholder = status !== 'loaded';

  return (
    <span className={`relative block overflow-hidden ${wrapperClassName}`}>
      {showPlaceholder && (
        <span
          className={`absolute inset-0 z-10 flex items-center justify-center bg-[#f3f3f3] ${placeholderClassName}`}
          aria-hidden
        >
          {status === 'loading' && (
            <Loader2
              className={`h-7 w-7 animate-spin text-[#FF630F] ${spinnerClassName}`}
            />
          )}
        </span>
      )}
      {src ? (
        <img
          ref={setRefs}
          src={src}
          alt={alt}
          className={`${className} ${status === 'loaded' ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
          onLoad={handleLoad}
          onError={handleError}
          {...props}
        />
      ) : null}
    </span>
  );
}
