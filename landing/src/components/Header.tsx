import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-sm font-semibold tracking-tight">
          그날의 나에게
        </Link>
        <div className="flex items-center gap-2">
          <Link
            href="/#subscribe"
            className="hidden rounded-full border border-border px-4 py-2 text-xs font-medium text-muted transition hover:border-accent hover:text-accent sm:inline-block"
          >
            출시 알림 받기
          </Link>
          <Link
            href="/scenario/covid-crash"
            className="rounded-full bg-accent px-4 py-2 text-xs font-semibold text-accent-foreground transition hover:brightness-110"
          >
            지금 체험하기
          </Link>
        </div>
      </div>
    </header>
  );
}
