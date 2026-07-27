export function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <span className="text-sm font-semibold tracking-tight">
          그날의 나에게
        </span>
        <a
          href="#subscribe"
          className="rounded-full border border-border px-4 py-2 text-xs font-medium text-muted transition hover:border-accent hover:text-accent"
        >
          출시 알림 받기
        </a>
      </div>
    </header>
  );
}
