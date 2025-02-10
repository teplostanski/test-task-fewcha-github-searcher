import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetUserReposQuery } from '../api/userRepos';
import { Spinner } from '@heroui/react';
import { SearchInput } from './SearchInput';
import { RepoCard } from './RepoCard';
import { ErrorMessage } from './ErrorMessage';
import { useInfiniteScroll } from '@/shared/pagination/useInfiniteScroll';
import { REPOS_PER_PAGE } from '@/shared/constants/github';
import { selectUsername, selectPage, incrementPage } from '../model/searchSlice';

export const GithubRepos = () => {
  const dispatch = useDispatch();
  const username = useSelector(selectUsername);
  const page = useSelector(selectPage);

  const {
    data: repos,
    error,
    isFetching
  } = useGetUserReposQuery(
    { username, page },
    { 
      skip: !username || username.length < 2,
      refetchOnMountOrArgChange: true
    }
  );

  const handleLoadMore = useCallback(() => {
    if (!error) {
      dispatch(incrementPage());
    }
  }, [dispatch, error]);

  const hasMore = !error && repos?.length && repos.length % REPOS_PER_PAGE === 0;

  const loader = useInfiniteScroll({
    onIntersect: handleLoadMore,
    isLoading: isFetching,
    hasMore: Boolean(hasMore)
  });

  const showReposList = !error && repos && repos.length > 0 && (!isFetching || page > 1);
  const showEmptyMessage = !error && repos && repos.length === 0 && !isFetching;

  return (
    <div className="flex flex-col gap-6">
      <SearchInput />

      {isFetching && page === 1 && <Spinner data-testid="spinner" color="primary" />}

      {!isFetching && error && <ErrorMessage error={error} />}

      {showReposList && (
        <ul className="flex flex-col gap-4" data-testid="repos-list">
          {repos.map((repo) => (
            <RepoCard key={repo.id} repo={repo} />
          ))}
        </ul>
      )}

      {showEmptyMessage && (
        <div data-testid="empty-message">
          У пользователя нет публичных репозиториев
        </div>
      )}
      
      {isFetching && page > 1 && <Spinner data-testid="spinner" color="primary" />}
      
      <div ref={loader} className="h-4" />
    </div>
  );
};
