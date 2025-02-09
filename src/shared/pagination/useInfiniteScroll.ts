import { useEffect, useRef, RefObject } from 'react';

interface UseInfiniteScrollProps {
  onIntersect: () => void;
  isLoading: boolean;
  hasMore: boolean;
}

export const useInfiniteScroll = ({ onIntersect, isLoading, hasMore }: UseInfiniteScrollProps): RefObject<HTMLDivElement | null> => {
  const loader = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading && hasMore) {
          onIntersect();
        }
      },
      { threshold: 1.0 }
    );

    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => observer.disconnect();
  }, [isLoading, hasMore, onIntersect]);

  return loader;
}; 