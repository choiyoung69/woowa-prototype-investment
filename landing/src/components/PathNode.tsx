import Link from "next/link";

export function WaveIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-7 w-7"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 12c2-4 4-4 6 0s4 4 6 0 4-4 6 0" />
    </svg>
  );
}

export function ChartIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-7 w-7"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 20V10M12 20V4M20 20v-7" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="5" y="11" width="14" height="9" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  );
}

export function PathNode({
  icon,
  label,
  sublabel,
  href,
  align,
  featured,
}: {
  icon: React.ReactNode;
  label: string;
  sublabel?: string;
  href?: string;
  align: "left" | "right";
  featured?: boolean;
}) {
  const alignClass = align === "left" ? "self-start" : "self-end";

  const circle = (
    <div
      className={`flex h-20 w-20 items-center justify-center rounded-full border-2 transition ${
        href
          ? featured
            ? "border-accent bg-accent text-accent-foreground shadow-lg shadow-blue-500/20"
            : "border-accent/30 bg-surface text-accent hover:border-accent hover:bg-[#e8f3ff]"
          : "border-border bg-surface text-muted"
      }`}
    >
      {href ? icon : <LockIcon />}
    </div>
  );

  return (
    <div className={`flex flex-col items-center gap-2 ${alignClass}`}>
      {href ? (
        <Link href={href} className="flex flex-col items-center gap-2">
          {circle}
          <span className="text-sm font-bold">{label}</span>
        </Link>
      ) : (
        <>
          {circle}
          <span className="text-sm text-muted">{label}</span>
        </>
      )}
      {sublabel && <span className="text-xs text-muted">{sublabel}</span>}
    </div>
  );
}
