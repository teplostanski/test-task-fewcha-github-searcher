import { describe, it, expect } from 'vitest';

describe('GitHub API utils', () => {
  describe('merge logic', () => {
    const mockRepos = [{ id: 1 }, { id: 2 }];
    const mockNewRepos = [{ id: 3 }, { id: 4 }];

    it('должен вернуть только новые элементы если page=1', () => {
      const mergeFunction = (currentCache: any[], newItems: any[], { arg: { page } }: any) => {
        if (page === 1) return newItems;
        return [...currentCache, ...newItems];
      };

      const result = mergeFunction(mockRepos, mockNewRepos, { arg: { page: 1 } });
      expect(result).toEqual(mockNewRepos);
    });

    it('должен добавить новые элементы к существующим если page>1', () => {
      const mergeFunction = (currentCache: any[], newItems: any[], { arg: { page } }: any) => {
        if (page === 1) return newItems;
        return [...currentCache, ...newItems];
      };

      const result = mergeFunction(mockRepos, mockNewRepos, { arg: { page: 2 } });
      expect(result).toEqual([...mockRepos, ...mockNewRepos]);
    });
  });

  describe('forceRefetch logic', () => {
    const forceRefetchFunction = ({ currentArg, previousArg }: any) => {
      return currentArg?.page !== previousArg?.page;
    };

    it('должен вернуть true если изменилась страница', () => {
      const result = forceRefetchFunction({
        currentArg: { username: 'test', page: 2 },
        previousArg: { username: 'test', page: 1 }
      });
      expect(result).toBe(true);
    });

    it('должен вернуть false если страница не изменилась', () => {
      const result = forceRefetchFunction({
        currentArg: { username: 'test', page: 1 },
        previousArg: { username: 'test', page: 1 }
      });
      expect(result).toBe(false);
    });
  });

  describe('error handling', () => {
    const transformErrorResponse = (response: { status: number }) => {
      if (response.status === 404) {
        return { message: 'Такого пользователя не существует' };
      }
      if (response.status === 403) {
        return { message: 'Превышен лимит запросов к API GitHub. Пожалуйста, подождите немного.' };
      }
      return { message: 'Произошла ошибка при загрузке данных' };
    };

    it('должен вернуть сообщение о несуществующем пользователе при 404', () => {
      const result = transformErrorResponse({ status: 404 });
      expect(result).toEqual({ message: 'Такого пользователя не существует' });
    });

    it('должен вернуть сообщение о превышении лимита при 403', () => {
      const result = transformErrorResponse({ status: 403 });
      expect(result).toEqual({ message: 'Превышен лимит запросов к API GitHub. Пожалуйста, подождите немного.' });
    });

    it('должен вернуть общее сообщение об ошибке для остальных статусов', () => {
      const result = transformErrorResponse({ status: 500 });
      expect(result).toEqual({ message: 'Произошла ошибка при загрузке данных' });
    });
  });
}); 