import type { NewsArticle } from "@/lib/scenario-engine";

export function NewsFeed({ articles }: { articles: NewsArticle[] }) {
  if (articles.length === 0) return null;

  return (
    <div className="mt-6">
      <h3 className="px-1 text-sm font-semibold text-muted">오늘의 뉴스</h3>
      <div className="mt-3 space-y-3">
        {articles.map((article, index) => (
          <div
            key={index}
            className="rounded-[8px] border border-border bg-surface p-4 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-muted">{article.source}</span>
            </div>
            <p className="mt-1.5 text-sm font-semibold leading-6">{article.title}</p>
            <p className="mt-1 text-xs leading-5 text-muted">{article.summary}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
