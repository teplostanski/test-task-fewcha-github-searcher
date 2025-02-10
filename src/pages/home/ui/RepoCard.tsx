import { Link } from '@heroui/react';
import { CiCalendar as CalendarIcon, CiStar as StarIcon } from 'react-icons/ci';
import { Repository } from '@/shared/types/github';
import { memo } from 'react';
import { formatDate } from '@/shared/date/formatDate';

interface RepoCardProps {
  repo: Repository;
}

export const RepoCard = memo(({ repo }: RepoCardProps) => {
  return (
    <li className="border border-default rounded-lg p-3 flex flex-col gap-2">
      <Link href={repo.html_url} target="_blank" rel="noopener noreferrer">
        {repo.name}
      </Link>
      {repo.description && <p>{repo.description}</p>}
      <span className="flex items-center gap-2 text-sm font-thin">
        <StarIcon color="hsl(var(--heroui-default-100))" size={23} />
        <span data-testid="stars-count">{repo.stargazers_count}</span>
        <CalendarIcon color="hsl(var(--heroui-default-100))" size={23} />
        <span data-testid="updated-date">{formatDate(repo.updated_at)}</span>
      </span>
    </li>
  );
}); 