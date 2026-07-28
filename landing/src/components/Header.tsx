import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-border bg-surface/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 sm:px-6">
        <Link href="/" className="text-[15px] font-bold tracking-tight">
          그날의 나에게
        </Link>
        <div className="flex items-center gap-2">
          <Link
            href="/#subscribe"
            className="hidden rounded-[8px] px-4 py-2 text-sm font-semibold text-muted transition hover:bg-surface-2 hover:text-foreground sm:inline-block"
          >
            출시 알림 받기
          </Link>
          <Link
            href="/scenarios"
            className="rounded-[8px] bg-accent px-4 py-2 text-sm font-bold text-accent-foreground transition hover:bg-[#1b64da]"
          >
            지금 체험하기
          </Link>
        </div>
      </div>
    </header>
  );
}
