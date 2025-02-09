import { Link } from '@heroui/react';
import { CiCalendar as CalendarIcon, CiStar as StarIcon } from 'react-icons/ci';
import { Repository } from '../types/github';
import { memo } from 'react';

interface RepoCardProps {
  repo: Repository;
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
};

export const RepoCard = memo(({ repo }: RepoCardProps) => {
  return (
    <li className="border border-default rounded-lg p-3 flex flex-col gap-2">
      <Link href={repo.html_url} target="_blank" rel="noopener noreferrer">
        {repo.name}
      </Link>
      {repo.description && <p>{repo.description}</p>}
      <span className="flex items-center gap-2 text-sm font-thin">
        <StarIcon size={23} color="hsl(var(--heroui-default-100))" />
        {repo.stargazers_count}
        <CalendarIcon size={23} color="hsl(var(--heroui-default-100))" />
        {formatDate(repo.updated_at)}
      </span>
    </li>
  );
}); 