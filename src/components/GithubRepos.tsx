import { useState } from 'react';
import { useGetUserReposQuery } from '../store/github.api';
import debounce from 'debounce';

export const GithubRepos = () => {
  const [username, setUsername] = useState('');
  const { data: repos, isLoading, error } = useGetUserReposQuery(username, {
    skip: !username || username.length < 2,
  });

  const handleChange = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  }, 500);

  return (
    <div>
      <input
        type="text"
        onChange={handleChange}
        placeholder="Введите имя пользователя GitHub"
      />

      {isLoading && <div>Загрузка...</div>}
      {error && 'data' in error && <div>{(error.data as { message: string }).message}</div>}
      
      {repos && repos.length > 0 && (
        <ul>
          {repos.map((repo) => (
            <li key={repo.id}>
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                {repo.name}
              </a>
              {repo.description && <p>{repo.description}</p>}
              <span>⭐ {repo.stargazers_count}</span>
            </li>
          ))}
        </ul>
      )}
      
      {repos && repos.length === 0 && (
        <div>У пользователя нет публичных репозиториев</div>
      )}
    </div>
  );
}; 