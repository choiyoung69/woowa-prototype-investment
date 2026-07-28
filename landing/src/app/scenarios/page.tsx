import Link from "next/link";
import type { Metadata } from "next";
import { scenarios } from "@/data/scenarios";

export const metadata: Metadata = {
  title: "시나리오 선택 | 그날의 나에게",
};

const featuredScenario = scenarios[0];
const featuredDays = featuredScenario.days.slice(0, 3);

const flowCards = [
  {
    title: "당시 뉴스로 판단",
    description: "1997년 실제 상황을 바탕으로 한 뉴스 제공",
    tone: "text-accent bg-[#e8f3ff]",
    icon: "news",
  },
  {
    title: "매수·매도·관망",
    description: "매일 투자 결정을 선택하고 이유 기록",
    tone: "text-down bg-[#fff1f3]",
    icon: "trade",
  },
  {
    title: "결과로 복기",
    description: "내 선택의 결과와 놓친 신호 확인",
    tone: "text-up bg-[#e9fbf2]",
    icon: "review",
  },
];

const detailTiles = [
  { label: "체험 기간", value: "1997.11.19 ~ 1998.01.14 (5일)" },
  { label: "진행률", value: "0 / 5일" },
];

const navItems = ["홈", "오늘의 뉴스", "학습", "과거로 돌아가기", "포트폴리오", "내 정보"];

const issueFallbacks = [
  ["환율 급등", "외국인 자금 이탈", "시장 불안"],
  ["긴급 금리 인상", "신용경색", "주가 급락"],
  ["IMF 협상", "구제금융 임박", "시장 충격"],
];

function ArrowIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

function LogoIcon() {
  return (
    <div className="relative h-8 w-8 rounded-[10px] bg-[#3182f6] shadow-sm">
      <div className="absolute left-2 top-1.5 h-4 w-4 rotate-45 rounded-[4px] bg-[#65b5ff]" />
      <div className="absolute bottom-1.5 right-1.5 h-3 w-3 rounded-[4px] bg-[#125de6]" />
    </div>
  );
}

function StatIcon({ label, tone }: { label: string; tone: "blue" | "pink" }) {
  return (
    <div className="flex items-center gap-2 text-sm font-black">
      <span
        className={`flex h-7 w-7 items-center justify-center rounded-[9px] text-white ${
          tone === "blue" ? "bg-accent" : "bg-[#f0448f]"
        }`}
      >
        {tone === "blue" ? "◆" : "↯"}
      </span>
      <span>{label}</span>
    </div>
  );
}

function BellIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5 text-muted"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
      <path d="M10 21h4" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-7 w-7"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <path d="M3 10h18" />
      <path d="M5 4h14a2 2 0 0 1 2 2v14H3V6a2 2 0 0 1 2-2Z" />
    </svg>
  );
}

function FlowIcon({ type }: { type: string }) {
  if (type === "trade") {
    return (
      <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth={2.4}>
        <path d="M7 17V5" />
        <path d="m3 9 4-4 4 4" />
        <path d="M17 7v12" />
        <path d="m13 15 4 4 4-4" />
      </svg>
    );
  }

  if (type === "review") {
    return (
      <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth={2.4}>
        <path d="M20 7 9 18l-5-5" />
        <path d="M18 12a6 6 0 1 1-4-5.66" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth={2.4}>
      <path d="M5 4h11a3 3 0 0 1 3 3v13H7a2 2 0 0 1-2-2V4Z" />
      <path d="M8 8h7" />
      <path d="M8 12h7" />
      <path d="M8 16h4" />
    </svg>
  );
}

function HeroIllustration() {
  return (
    <div className="relative hidden min-h-[230px] items-center justify-center lg:flex">
      <div className="absolute top-6 h-28 w-44 rounded-t-[70px] bg-[#191f28]" />
      <div className="absolute top-20 h-16 w-16 rounded-full bg-white shadow-sm">
        <div className="absolute left-4 top-6 h-4 w-2 rounded-full bg-[#191f28]" />
        <div className="absolute right-4 top-6 h-4 w-2 rounded-full bg-[#191f28]" />
        <div className="absolute left-7 top-9 h-2 w-4 rounded-b-full border-b-2 border-[#191f28]" />
      </div>
      <div className="absolute top-[102px] h-28 w-72 rounded-[10px] border border-border bg-white shadow-[0_16px_40px_rgba(25,31,40,0.12)]">
        <div className="absolute left-6 top-6 h-16 w-24 rounded-[8px] bg-[#f2f7ff]">
          <svg viewBox="0 0 120 80" className="h-full w-full" fill="none">
            <path d="M12 58 34 42 50 49 68 29 85 35 106 15" stroke="#3182f6" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 68h96" stroke="#dbeafe" strokeWidth="5" strokeLinecap="round" />
          </svg>
        </div>
        <div className="absolute right-7 top-7 space-y-2">
          <div className="h-2 w-24 rounded-full bg-[#dfe6ee]" />
          <div className="h-2 w-32 rounded-full bg-[#dfe6ee]" />
          <div className="h-2 w-20 rounded-full bg-[#dfe6ee]" />
          <div className="mt-4 h-10 w-24 rounded-[8px] bg-[#e5e8eb]" />
        </div>
      </div>
    </div>
  );
}

function FlowCard({ card }: { card: (typeof flowCards)[number] }) {
  return (
    <div className="flex min-h-24 items-center gap-4 rounded-[12px] bg-background p-4">
      <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-[10px] ${card.tone}`}>
        <FlowIcon type={card.icon} />
      </div>
      <div>
        <p className="text-base font-black">{card.title}</p>
      </div>
    </div>
  );
}

function ScenarioDayCard({
  day,
  index,
}: {
  day: (typeof featuredScenario.days)[number];
  index: number;
}) {
  const unlocked = index === 0;
  const issues = issueFallbacks[index] ?? [];
  const titles = ["IMF 시작 2일 전", "위기 심화, 시장 불안 확대", "긴급 브리핑, 시장 충격"];
  const descriptions = [
    "한국 금융시장 불안이 커지기 시작한 날입니다.",
    "정부 긴급 대응에도 시장 불안이 커졌습니다.",
    "IMF 구제금융 발표를 앞두고 충격이 번집니다.",
  ];

  const content = (
    <div className="flex h-full min-h-[360px] flex-col rounded-[14px] border border-border bg-surface p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <span className={`rounded-[8px] px-3 py-1 text-sm font-black ${unlocked ? "bg-accent text-white" : "bg-[#6b7684] text-white"}`}>
              {index + 1}일차
            </span>
            <span className="text-sm font-black text-muted">{day.date.replaceAll("-", ".")}</span>
          </div>
          <h3 className="mt-4 text-2xl font-black">{titles[index]}</h3>
          <p className="mt-3 text-sm font-bold leading-6 text-muted">{descriptions[index]}</p>
        </div>
        <div className={`hidden h-24 w-24 shrink-0 items-center justify-center rounded-[20px] sm:flex ${index === 0 ? "bg-[#e8f3ff] text-accent" : index === 1 ? "bg-[#fff1f3] text-down" : "bg-[#e9fbf2] text-up"}`}>
          <FlowIcon type={index === 0 ? "trade" : index === 1 ? "news" : "review"} />
        </div>
      </div>

      <div className="mt-5 flex-1 border-t border-border pt-4">
        <p className="text-xs font-black text-muted">예상 주요 이슈</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {issues.slice(0, 3).map((issue) => (
            <span key={issue} className="break-keep rounded-full bg-surface-2 px-3 py-1.5 text-xs font-black text-muted">
              {issue}
            </span>
          ))}
        </div>
      </div>

      <div className={`mt-5 flex h-12 shrink-0 items-center justify-center rounded-[10px] text-base font-black ${unlocked ? "bg-accent text-white" : "bg-surface-2 text-muted"}`}>
        {unlocked ? "1일차 시작하기" : `${index}일차 완료 후 열려요`}
      </div>
    </div>
  );

  if (unlocked) {
    return <Link href={`/scenario/${featuredScenario.id}`}>{content}</Link>;
  }

  return <div aria-disabled="true">{content}</div>;
}

export default function ScenariosPage() {
  return (
    <main className="min-h-screen bg-background">
      <header className="border-b border-border bg-surface">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
          <Link href="/" className="flex items-center gap-3 text-xl font-black">
            <LogoIcon />
            투자체험랩
          </Link>

          <nav className="hidden h-full items-center gap-8 text-sm font-black text-muted lg:flex">
            {navItems.map((item) => (
              <Link
                key={item}
                href={item === "과거로 돌아가기" ? "/scenarios" : "#"}
                className={`flex h-full items-center border-b-4 ${
                  item === "과거로 돌아가기"
                    ? "border-accent text-accent"
                    : "border-transparent hover:text-foreground"
                }`}
              >
                {item}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <StatIcon label="597P" tone="blue" />
            <StatIcon label="25" tone="pink" />
            <BellIcon />
            <div className="hidden items-center gap-2 sm:flex">
              <div className="h-9 w-9 rounded-full bg-surface-2" />
              <span className="text-sm font-black text-muted">Lv.3 투자초보</span>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
        <section className="rounded-[18px] border border-border bg-surface p-6 shadow-sm sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <p className="text-sm font-black text-accent">오늘 바로 경험할 경제 사건</p>
              <h1 className="mt-4 text-4xl font-black leading-tight tracking-tight sm:text-5xl">
                IMF 외환위기 체험
              </h1>
              <p className="mt-5 max-w-xl text-lg font-bold leading-8 text-muted">
                1997년 실제 시장 속으로 들어가 뉴스를 읽고 투자 결정을 내려보세요.
              </p>

              <div className="mt-8 grid gap-4 md:grid-cols-3">
                {flowCards.map((card) => (
                  <FlowCard key={card.title} card={card} />
                ))}
              </div>
            </div>

            <HeroIllustration />
          </div>

          <div className="mt-7 grid gap-4 lg:grid-cols-[1fr_1fr_auto]">
            {detailTiles.map((tile, index) => (
              <div key={tile.label} className="flex items-center gap-4 rounded-[12px] bg-[#f4f8ff] p-4">
                <div className="text-[#191f28]">
                  {index === 0 ? <CalendarIcon /> : <LogoIcon />}
                </div>
                <div>
                  <p className="text-sm font-black text-muted">{tile.label}</p>
                  <p className="mt-1 text-base font-black">{tile.value}</p>
                </div>
              </div>
            ))}
            <Link
              href={`/scenario/${featuredScenario.id}`}
              className="flex min-h-16 items-center justify-center gap-3 rounded-[12px] bg-accent px-8 text-lg font-black text-white transition hover:bg-[#1b64da]"
            >
              1일차 시작하기
              <ArrowIcon />
            </Link>
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-black">시나리오 선택</h2>
          <p className="mt-3 text-base font-bold text-muted">
            첫 시나리오부터 순서대로 진행해 주세요.
          </p>

          <div className="mt-5 grid gap-5 lg:grid-cols-3">
            {featuredDays.map((day, index) => (
              <ScenarioDayCard key={day.date} day={day} index={index} />
            ))}
          </div>
        </section>

        <div className="mt-7 flex flex-wrap items-center justify-between gap-3 rounded-[12px] border border-[#d7eaff] bg-[#f7fbff] px-5 py-4">
          <p className="text-sm font-black text-muted">
            <span className="text-accent">TIP</span> 매일 제공되는 뉴스와 지표를 참고해 판단하고, 이유를 기록해보세요.
          </p>
          <Link href={`/scenario/${featuredScenario.id}`} className="flex items-center gap-2 text-sm font-black text-muted hover:text-accent">
            더 알아보기
            <ArrowIcon className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </main>
  );
}
