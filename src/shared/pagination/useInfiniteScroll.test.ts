import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useInfiniteScroll } from './useInfiniteScroll';

describe('useInfiniteScroll', () => {
  const mockDisconnect = vi.fn();
  const mockObserve = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    global.IntersectionObserver = vi.fn().mockImplementation(() => ({
      observe: mockObserve,
      disconnect: mockDisconnect,
      unobserve: vi.fn(),
      root: null,
      rootMargin: '',
      thresholds: [],
      takeRecords: () => []
    }));
  });

  it('должен вызвать onIntersect когда элемент виден и hasMore=true и isLoading=false', () => {
    const onIntersect = vi.fn();
    renderHook(() =>
      useInfiniteScroll({
        onIntersect,
        isLoading: false,
        hasMore: true,
      })
    );

    const [callback] = (global.IntersectionObserver as any).mock.calls[0];
    
    callback([{ isIntersecting: true }]);

    expect(onIntersect).toHaveBeenCalledTimes(1);
  });

  it('не должен вызывать onIntersect когда isLoading=true', () => {
    const onIntersect = vi.fn();
    renderHook(() =>
      useInfiniteScroll({
        onIntersect,
        isLoading: true,
        hasMore: true,
      })
    );

    const [callback] = (global.IntersectionObserver as any).mock.calls[0];
    callback([{ isIntersecting: true }]);

    expect(onIntersect).not.toHaveBeenCalled();
  });

  it('не должен вызывать onIntersect когда hasMore=false', () => {
    const onIntersect = vi.fn();
    renderHook(() =>
      useInfiniteScroll({
        onIntersect,
        isLoading: false,
        hasMore: false,
      })
    );

    const [callback] = (global.IntersectionObserver as any).mock.calls[0];
    callback([{ isIntersecting: true }]);

    expect(onIntersect).not.toHaveBeenCalled();
  });

  it('должен отключить observer при размонтировании', () => {
    const { unmount } = renderHook(() =>
      useInfiniteScroll({
        onIntersect: vi.fn(),
        isLoading: false,
        hasMore: true,
      })
    );

    unmount();
    expect(mockDisconnect).toHaveBeenCalled();
  });
}); 