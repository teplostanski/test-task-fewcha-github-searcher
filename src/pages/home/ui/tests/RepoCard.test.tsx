import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { RepoCard } from '../RepoCard';
import type { Repository } from '@/shared/types/github';

describe('RepoCard', () => {
  const mockRepo: Repository = {
    id: 1,
    name: 'test-repo',
    description: 'Test repository description',
    html_url: 'https://github.com/test/test-repo',
    stargazers_count: 42,
    updated_at: '2024-02-10T12:00:00Z'
  };

  it('должен отобразить название репозитория как ссылку', () => {
    render(<RepoCard repo={mockRepo} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', mockRepo.html_url);
    expect(link).toHaveTextContent(mockRepo.name);
  });

  it('должен отобразить описание репозитория', () => {
    render(<RepoCard repo={mockRepo} />);
    expect(screen.getByText(mockRepo.description!)).toBeInTheDocument();
  });

  it('не должен отображать описание, если его нет', () => {
    const repoWithoutDescription = { ...mockRepo, description: null };
    render(<RepoCard repo={repoWithoutDescription} />);
    expect(screen.queryByText('Test repository description')).not.toBeInTheDocument();
  });

  it('должен отобразить количество звезд', () => {
    render(<RepoCard repo={mockRepo} />);
    const starsElement = screen.getByTestId('stars-count');
    expect(starsElement).toHaveTextContent('42');
  });

  it('должен отобразить дату обновления в правильном формате', () => {
    render(<RepoCard repo={mockRepo} />);
    const dateElement = screen.getByTestId('updated-date');
    const formattedDate = new Date(mockRepo.updated_at).toLocaleDateString('ru', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
    expect(dateElement).toHaveTextContent(formattedDate);
  });
}); 