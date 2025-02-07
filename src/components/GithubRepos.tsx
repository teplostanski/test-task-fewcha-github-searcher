import { SVGProps, useState } from 'react';
import { useGetUserReposQuery } from '../store/github.api';
import debounce from 'debounce';
import { Input, Link, Spinner } from '@heroui/react';
import { colors } from '@heroui/react';

export const SearchIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path
        d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M22 22L20 20"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
};

export const StarIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path
        d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
};

export const GithubRepos = () => {
  const [username, setUsername] = useState('');

  console.log(JSON.stringify(colors.light, null, 2));

  const {
    data: repos,
    error,
    isFetching,
  } = useGetUserReposQuery(username, {
    skip: !username || username.length < 2,
  });

  const handleChange = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  }, 1000);

  const getErrorMessage = (error: any) => {
    console.log('Error object:', error);
    return error.message || 'Произошла ошибка при загрузке данных';
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
          <SearchIcon className="mb-0.5 text-default-200 pointer-events-none flex-shrink-0" />
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
            <li key={repo.id} className="border border-default rounded-lg p-3 flex flex-col gap-2">
              <Link
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {repo.name}
              </Link>
              {repo.description && <p>{repo.description}</p>}
              <span className="flex items-center gap-2">
                <StarIcon className="mb-0.5 text-default-200 pointer-events-none flex-shrink-0" />
                <span className="text-sm">{repo.stargazers_count}</span>
              </span>
            </li>
          ))}
        </ul>
      )}

      {showEmptyMessage && <div>У пользователя нет публичных репозиториев</div>}
    </div>
  );
};
