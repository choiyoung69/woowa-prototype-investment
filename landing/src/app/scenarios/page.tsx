import Link from "next/link";
import type { Metadata } from "next";
import { scenarios, upcomingScenarios } from "@/data/scenarios";

export const metadata: Metadata = {
  title: "시나리오 선택 | 그날의 나에게",
};

const mapNodes = [
  { kind: "star", x: "52%", y: 48, active: true },
  { kind: "star", x: "39%", y: 158, hrefIndex: 1 },
  { kind: "news", x: "30%", y: 276, hrefIndex: 2 },
  { kind: "brief", x: "38%", y: 398, hrefIndex: 3 },
  { kind: "star", x: "53%", y: 520 },
  { kind: "news", x: "66%", y: 642 },
  { kind: "trophy", x: "53%", y: 764 },
];

function TopStat({
  icon,
  value,
  color,
}: {
  icon: React.ReactNode;
  value: string;
  color: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex h-8 w-8 items-center justify-center rounded-[8px] bg-surface-2">
        {icon}
      </div>
      <span className={`text-xl font-black ${color}`}>{value}</span>
    </div>
  );
}

function DotIcon() {
  return <span className="block h-3.5 w-3.5 rounded-full bg-down" />;
}

function FlameIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6 fill-[#b0b8c1]">
      <path d="M12.4 2.3c.5 3-1 4.8-2.4 6.3-1.2 1.3-2.4 2.5-2.4 4.6 0 2.1 1.5 3.9 3.5 4.4-.7-1.5-.4-3 .7-4.3.5-.6 1.1-1.2 1.3-2.2 1.9 1.4 3 3.1 3 5.2 0 .4 0 .8-.1 1.2 1.8-.8 3-2.6 3-4.8 0-4.7-4.6-6.3-6.6-10.4Z" />
      <path d="M12 22c-4.5 0-8-3.4-8-8 0-2.9 1.6-5 3.3-6.8.3 1.6.9 2.8 1.8 3.6.3-1.8 1.8-3.4 3.9-5.4.2 2.8 1.7 4.4 3.1 5.8 1.1 1.2 2.2 2.4 2.2 4.6 0 3.7-2.8 6.2-6.3 6.2Z" />
    </svg>
  );
}

function GemIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7 fill-[#1bb1ff]">
      <path d="M7 2h10l5 6-10 14L2 8l5-6Z" />
      <circle cx="17" cy="18" r="3" className="fill-down" />
    </svg>
  );
}

function EnergyIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7 fill-[#ff7bd2]">
      <rect x="2" y="4" width="17" height="16" rx="4" />
      <path
        d="M12.5 6 8 13h3l-1.2 5L15 10h-3l.5-4Z"
        className="fill-white"
      />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-8 w-8"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.7}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 6h10M9 12h10M9 18h10" />
      <path d="M5 6h.01M5 12h.01M5 18h.01" />
    </svg>
  );
}

function NodeIcon({ kind }: { kind: string }) {
  if (kind === "news") {
    return (
      <svg viewBox="0 0 24 24" className="h-10 w-10 fill-current">
        <path d="M5 6.5A2.5 2.5 0 0 1 7.5 4h6A2.5 2.5 0 0 1 16 6.5V9l3-1.8A1.3 1.3 0 0 1 21 8.3v7.4a1.3 1.3 0 0 1-2 1.1L16 15v2.5a2.5 2.5 0 0 1-2.5 2.5h-6A2.5 2.5 0 0 1 5 17.5v-11Z" />
      </svg>
    );
  }

  if (kind === "brief") {
    return (
      <svg viewBox="0 0 24 24" className="h-11 w-11 fill-current">
        <path d="M7 5h10a2 2 0 0 1 2 2v9a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V7a2 2 0 0 1 2-2Z" />
        <path d="M8 9h8v2H8V9Zm0 4h8v2H8v-2Z" className="fill-white/45" />
      </svg>
    );
  }

  if (kind === "trophy") {
    return (
      <svg viewBox="0 0 24 24" className="h-11 w-11 fill-current">
        <path d="M7 4h10v3h3v2a5 5 0 0 1-4.7 5A5.8 5.8 0 0 1 13 16.7V19h3v2H8v-2h3v-2.3A5.8 5.8 0 0 1 8.7 14 5 5 0 0 1 4 9V7h3V4Zm10 5v2.8A3 3 0 0 0 18 9h-1ZM6 9a3 3 0 0 0 1 2.8V9H6Z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="h-11 w-11 fill-current">
      <path d="m12 2.8 2.7 5.5 6.1.9-4.4 4.3 1 6.1L12 16.7l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 2.8Z" />
    </svg>
  );
}

function StageNode({
  kind,
  x,
  y,
  active,
  href,
}: {
  kind: string;
  x: string;
  y: number;
  active?: boolean;
  href?: string;
}) {
  const node = (
    <div
      className={`relative flex h-[86px] w-[86px] items-center justify-center rounded-full ${
        active
          ? "bg-[#49d900] text-white shadow-[0_12px_0_#37aa00]"
          : href
            ? "bg-[#e8f3ff] text-accent shadow-[0_12px_0_#b7d8ff]"
            : "bg-[#e5e7ea] text-[#b0b8c1] shadow-[0_12px_0_#b6bbc1]"
      }`}
      style={{ transform: "translateX(-50%)" }}
    >
      {active && (
        <div className="absolute -inset-4 rounded-full border-[10px] border-[#49d900]/20 border-t-[#8bed62]" />
      )}
      <NodeIcon kind={kind} />
    </div>
  );

  return (
    <div className="absolute" style={{ left: x, top: y }}>
      {href ? (
        <Link aria-label="시나리오 시작" href={href}>
          {node}
        </Link>
      ) : (
        node
      )}
    </div>
  );
}

function BottomNav() {
  const items = [
    { label: "홈", color: "text-down", active: true, icon: "home" },
    { label: "보관함", color: "text-[#ffb800]", icon: "chest" },
    { label: "랭킹", color: "text-[#c57526]", icon: "rank" },
    { label: "복기", color: "text-[#ff7bd2]", icon: "heart" },
    { label: "학습", color: "text-accent", icon: "gem" },
    { label: "더보기", color: "text-[#c970ff]", icon: "more" },
  ];

  return (
    <nav className="fixed inset-x-0 bottom-0 z-10 border-t border-border bg-surface">
      <div className="mx-auto grid h-[76px] max-w-md grid-cols-6 items-center px-4">
        {items.map((item) => (
          <button
            key={item.label}
            type="button"
            className={`mx-auto flex h-14 w-14 items-center justify-center rounded-[12px] ${
              item.active ? "border-2 border-[#8bdcff] bg-[#e8f8ff]" : ""
            } ${item.color}`}
            aria-label={item.label}
          >
            <NavIcon kind={item.icon} />
          </button>
        ))}
      </div>
    </nav>
  );
}

function NavIcon({ kind }: { kind: string }) {
  if (kind === "home") {
    return (
      <svg viewBox="0 0 24 24" className="h-8 w-8 fill-current">
        <path d="M3 11.5 12 4l9 7.5-2.2 2.6-1.3-1.1V20H6.5v-7L5.2 14.1 3 11.5Z" />
        <circle cx="12" cy="15" r="2.4" className="fill-[#c57526]" />
      </svg>
    );
  }
  if (kind === "chest") {
    return <NodeIcon kind="brief" />;
  }
  if (kind === "rank") {
    return (
      <svg viewBox="0 0 24 24" className="h-8 w-8 fill-current">
        <path d="M12 3c4.2 0 7.5 3.1 7.5 7 0 3-2 5.6-4.8 6.6l.9 2.4H8.4l.9-2.4C6.5 15.6 4.5 13 4.5 10c0-3.9 3.3-7 7.5-7Z" />
      </svg>
    );
  }
  if (kind === "heart") {
    return (
      <svg viewBox="0 0 24 24" className="h-8 w-8 fill-current">
        <path d="M12 20.5s-8-4.7-8-10.5a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 5.8-8 10.5-8 10.5Z" />
      </svg>
    );
  }
  if (kind === "gem") {
    return <GemIcon />;
  }
  return (
    <svg viewBox="0 0 24 24" className="h-8 w-8 fill-current">
      <circle cx="6" cy="12" r="2" />
      <circle cx="12" cy="12" r="2" />
      <circle cx="18" cy="12" r="2" />
    </svg>
  );
}

export default function ScenariosPage() {
  const firstScenario = scenarios[0];

  return (
    <main className="min-h-screen bg-surface pb-[96px]">
      <h1 className="sr-only">투자 학습 시나리오 맵</h1>
      <div className="mx-auto min-h-screen max-w-md px-6 pt-14">
        <div className="flex items-center justify-between">
          <TopStat icon={<DotIcon />} value="5" color="text-[#4e5968]" />
          <TopStat icon={<FlameIcon />} value="0" color="text-[#b0b8c1]" />
          <TopStat icon={<GemIcon />} value="597" color="text-[#1bb1ff]" />
          <TopStat icon={<EnergyIcon />} value="25" color="text-[#ff7bd2]" />
        </div>

        <Link
          href={firstScenario ? `/scenario/${firstScenario.id}` : "/"}
          className="mt-9 grid min-h-[116px] grid-cols-[1fr_74px] overflow-hidden rounded-[16px] bg-[#49d900] text-white shadow-[0_8px_0_#37aa00]"
        >
          <div className="px-5 py-5">
            <p className="text-xl font-black text-white/75">섹션 1, 유닛 1</p>
            <p className="mt-2 text-[28px] font-black leading-tight">
              과거 위기에서
              <br />
              투자 판단하기
            </p>
          </div>
          <div className="flex items-center justify-center border-l-4 border-[#37aa00]">
            <MenuIcon />
          </div>
        </Link>

        <div className="relative mx-auto mt-10 h-[900px] max-w-[360px]">
          <Link
            href="/"
            className="absolute left-0 top-0 flex h-[74px] w-[74px] flex-col items-center justify-end overflow-hidden rounded-[14px] bg-[#8d56f6] pb-2 text-xs font-black text-white shadow-[0_6px_0_#6937d5]"
          >
            <span className="absolute top-2 h-8 w-11 rounded-b-[10px] rounded-t-[4px] border-[7px] border-[#ffd02f] bg-[#fff3a1]" />
            돌아가기
          </Link>

          {mapNodes.map((node, index) => {
            const scenario = scenarios[node.hrefIndex ?? 0];
            const href = node.active
              ? `/scenario/${firstScenario.id}`
              : node.hrefIndex !== undefined && scenario
                ? `/scenario/${scenario.id}`
                : undefined;

            return (
              <StageNode
                key={`${node.kind}-${index}`}
                kind={node.kind}
                x={node.x}
                y={node.y}
                active={node.active}
                href={href}
              />
            );
          })}

          <div className="absolute left-[66%] top-[350px] -translate-x-1/2 text-center text-[#d8dce1]">
            <div className="text-[82px] font-black leading-none">?</div>
            <div className="mt-2 flex gap-2">
              <NodeIcon kind="star" />
              <NodeIcon kind="star" />
              <NodeIcon kind="star" />
            </div>
          </div>

          <div className="absolute bottom-5 left-1/2 w-full -translate-x-1/2 text-center">
            <p className="text-sm font-bold text-muted">
              다음 공개 예정: {upcomingScenarios.map((item) => item.title).join(", ")}
            </p>
          </div>
        </div>
      </div>

      <BottomNav />
    </main>
  );
}
