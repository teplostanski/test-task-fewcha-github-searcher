import { GithubRepos } from '@/pages/home/ui/GithubRepos';

export function Home() {
  return (
    <div className="flex flex-col items-center justify-start min-h-dvh w-full">
      <div className="w-72 xs:w-96 sm:w-[480px] md:w-[520px] py-10 min-h-dvh">
        <h1 className="text-center mb-6">GitHub Searcher</h1>
        <GithubRepos />
      </div>
    </div>
  );
}
