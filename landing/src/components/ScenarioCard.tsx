import Link from "next/link";

export function ScenarioCard({
  title,
  subtitle,
  href,
}: {
  title: string;
  subtitle: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="block rounded-2xl border border-border bg-surface p-6 transition hover:border-accent"
    >
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-muted">{subtitle}</p>
      <span className="mt-4 inline-block text-sm font-semibold text-accent">
        체험하기 →
      </span>
    </Link>
  );
}

export function UpcomingScenarioCard({ title }: { title: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-border p-6 opacity-60">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-muted">준비 중이에요.</p>
      <span className="mt-4 inline-block rounded-full border border-border px-3 py-1 text-xs text-muted">
        Coming soon
      </span>
    </div>
  );
}
