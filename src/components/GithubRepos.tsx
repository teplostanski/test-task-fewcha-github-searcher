import { useState } from 'react';
import { useGetUserReposQuery } from '../store/github.api';
import debounce from 'debounce';
import { Input, Link, Spinner } from '@heroui/react';
import {
  CiCalendar as CalendarIcon,
  CiStar as StarIcon,
  CiSearch as SearchIcon,
} from 'react-icons/ci';

export const GithubRepos = () => {
  const [username, setUsername] = useState('');

  const {
    data: repos,
    error,
    isFetching,
  } = useGetUserReposQuery(username, {
    skip: !username || username.length < 2,
  });

  const handleChange = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  }, 1500);

  const getErrorMessage = (error: any) => {
    console.log('Error object:', error);
    return error.message || 'Произошла ошибка при загрузке данных';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const showReposList = !isFetching && !error && repos && repos.length > 0;
  const showEmptyMessage = !isFetching && !error && repos && repos.length === 0;

  return (
    <div className="flex flex-col gap-6">
      <Input
        onChange={handleChange}
        placeholder="Введите имя пользователя..."
        variant="bordered"
        startContent={
          <SearchIcon size={22} color="hsl(var(--heroui-default-100))" />
        }
        classNames={{
          innerWrapper: 'gap-2',
        }}
      />

      {isFetching && <Spinner color="primary" />}

      {error && (
        <div className="text-red-500 mt-2.5">{getErrorMessage(error)}</div>
      )}

      {showReposList && (
        <ul className="flex flex-col gap-4">
          {repos.map((repo) => (
            <li
              key={repo.id}
              className="border border-default rounded-lg p-3 flex flex-col gap-2"
            >
              <Link
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {repo.name}
              </Link>
              {repo.description && <p>{repo.description}</p>}
              <span className="flex items-center gap-2 text-sm font-thin">
                <StarIcon size={23} color="hsl(var(--heroui-default-100))" />
                  {repo.stargazers_count}
                <CalendarIcon
                  size={23}
                  color="hsl(var(--heroui-default-100))"
                />
                {formatDate(repo.updated_at)}
              </span>
            </li>
          ))}
        </ul>
      )}

      {showEmptyMessage && <div>У пользователя нет публичных репозиториев</div>}
    </div>
  );
};
