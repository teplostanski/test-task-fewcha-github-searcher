import { useState } from 'react';
import { useGetUserReposQuery } from '../store/github.api';
import debounce from 'debounce';

export const GithubRepos = () => {
  const [username, setUsername] = useState('');
  
  const { 
    data: repos,
    error,
    isFetching
  } = useGetUserReposQuery(username, {
    skip: !username || username.length < 2
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
    <div>
      <input
        type="text"
        onChange={handleChange}
        placeholder="Введите имя пользователя GitHub"
      />

      {isFetching && <div>Загрузка...</div>}
      
      {error && (
        <div className="text-red-500 mt-2.5">
          {getErrorMessage(error)}
        </div>
      )}
      
      {showReposList && (
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
      
      {showEmptyMessage && (
        <div>У пользователя нет публичных репозиториев</div>
      )}
    </div>
  );
}; 