import {
  useCallback,
  useEffect,
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
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(false);
  }, [src]);

  const markLoaded = useCallback(() => setLoaded(true), []);

  const handleRef = useCallback((img: HTMLImageElement | null) => {
    if (img?.complete && img.naturalWidth > 0) {
      setLoaded(true);
    }
  }, []);

  const handleLoad = (e: SyntheticEvent<HTMLImageElement>) => {
    markLoaded();
    onLoad?.(e);
  };

  const handleError = (e: SyntheticEvent<HTMLImageElement>) => {
    markLoaded();
    onError?.(e);
  };

  return (
    <span className={`relative block overflow-hidden ${wrapperClassName}`}>
      {!loaded && (
        <span
          className={`absolute inset-0 z-10 flex items-center justify-center bg-[#f3f3f3] ${placeholderClassName}`}
          aria-hidden
        >
          <Loader2
            className={`h-7 w-7 animate-spin text-[#FF630F] ${spinnerClassName}`}
          />
        </span>
      )}
      <img
        ref={handleRef}
        src={src}
        alt={alt}
        className={`${className} ${loaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
        onLoad={handleLoad}
        onError={handleError}
        {...props}
      />
    </span>
  );
}
