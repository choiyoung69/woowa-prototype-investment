import Link from "next/link";
import type { Metadata } from "next";
import { scenarios } from "@/data/scenarios";

export const metadata: Metadata = {
  title: "시나리오 선택 | 그날의 나에게",
};

const featuredScenario = scenarios[0];

const marketTiles = [
  { label: "원달러 환율", value: "1,960원", change: "+18.4%", tone: "down" },
  { label: "가상 ETF", value: "6,500원", change: "-35.0%", tone: "down" },
  { label: "남은 현금", value: "1,000만원", change: "시작 자산", tone: "neutral" },
];

const featuredSummary = featuredScenario.knowledge?.summary ?? [];

const steps = [
  {
    title: "당시 뉴스 확인",
    description: "결과는 숨기고 공개된 정보만 봅니다.",
  },
  {
    title: "투자 판단 기록",
    description: "매수·매도·관망과 이유를 남깁니다.",
  },
  {
    title: "결과 복기",
    description: "내가 놓친 경제 신호를 확인합니다.",
  },
];

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.4}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.3}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 19V5" />
      <path d="M4 19h16" />
      <path d="m7 14 3-3 3 2 5-7" />
    </svg>
  );
}

function NewsIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.3}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 4h11a3 3 0 0 1 3 3v13H7a2 2 0 0 1-2-2V4Z" />
      <path d="M8 8h7" />
      <path d="M8 12h7" />
      <path d="M8 16h4" />
    </svg>
  );
}

function ScenarioCard({
  scenario,
  index,
}: {
  scenario: (typeof scenarios)[number];
  index: number;
}) {
  const firstDay = scenario.days[0]?.date.replace("1997-", "").replace("1998-", "");
  const summary = scenario.knowledge?.summary ?? [];
  const keywords = scenario.knowledge?.keywords ?? [];
  const tones = [
    "bg-[#e8f3ff] text-accent",
    "bg-[#fff3d6] text-[#b77900]",
    "bg-[#f3e8ff] text-[#7c3aed]",
    "bg-[#e6fcf5] text-[#008f5d]",
  ];

  return (
    <Link
      href={`/scenario/${scenario.id}`}
      className="block rounded-[12px] border border-border bg-surface p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:p-5"
    >
      <div className="flex items-start gap-4">
        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] ${
            tones[index % tones.length]
          }`}
        >
          {index % 2 === 0 ? <ChartIcon /> : <NewsIcon />}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-bold text-muted">
                {firstDay} 시작 · {scenario.startingCash.toLocaleString()}원
              </p>
              <h2 className="mt-1 text-lg font-bold leading-6">{scenario.title}</h2>
            </div>
            <span className="shrink-0 rounded-full bg-[#e8f3ff] px-2.5 py-1 text-xs font-bold text-accent">
              시작
            </span>
          </div>
          {summary.length > 0 && (
            <div className="mt-3 grid grid-cols-3 gap-1.5">
              {summary.map((item) => (
                <span
                  key={item}
                  className="break-keep rounded-[9px] bg-background px-2 py-2 text-center text-[11px] font-black text-foreground"
                >
                  {item}
                </span>
              ))}
            </div>
          )}
          {keywords.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {keywords.slice(0, 3).map((keyword) => (
                <span
                  key={keyword.term}
                  className="rounded-full bg-surface-2 px-2 py-1 text-[11px] font-black text-muted"
                >
                  {keyword.term}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

export default function ScenariosPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-5xl px-5 py-8 sm:px-6 sm:py-12">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-sm font-bold text-muted hover:text-foreground">
            그날의 나에게
          </Link>
          <span className="rounded-full bg-surface px-3 py-1.5 text-xs font-bold text-muted">
            MVP 체험판
          </span>
        </div>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-[16px] bg-surface p-6 shadow-sm sm:p-8">
            <p className="text-sm font-bold text-accent">오늘 바로 체험할 경제 사건</p>
            <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
              IMF 외환위기 체험
            </h1>
            <p className="mt-4 max-w-2xl text-base font-bold leading-7 text-muted">
              첫 시나리오는 대기업 직장인 입장에서 1997년 11월 19일,
              IMF 구제금융 요청 직전의 뉴스와 시장 지표를 보고 투자 판단을
              내려보는 과정입니다.
            </p>

            <div className="mt-5 rounded-[14px] border border-border bg-background p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-black text-accent">첫 시나리오</p>
                  <h2 className="mt-1 text-xl font-black">{featuredScenario.title}</h2>
                </div>
                <span className="rounded-full bg-[#e8f3ff] px-3 py-1.5 text-xs font-black text-accent">
                  11-19 시작 · {featuredScenario.startingCash.toLocaleString()}원
                </span>
              </div>
              {featuredSummary.length > 0 && (
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {featuredSummary.map((item) => (
                    <span
                      key={item}
                      className="break-keep rounded-[10px] bg-surface px-2 py-2 text-center text-xs font-black"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {marketTiles.map((tile) => (
                <div key={tile.label} className="rounded-[12px] bg-background p-3 sm:p-4">
                  <p className="text-xs font-bold text-muted">{tile.label}</p>
                  <p className="mt-2 text-xl font-bold">{tile.value}</p>
                  <p
                    className={`mt-1 text-sm font-bold ${
                      tile.tone === "down" ? "text-down" : "text-muted"
                    }`}
                  >
                    {tile.change}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href={`/scenario/${featuredScenario.id}`}
                className="inline-flex items-center justify-center gap-2 rounded-[12px] bg-accent px-5 py-4 text-base font-bold text-white transition hover:bg-[#1b64da]"
              >
                첫 시나리오 시작하기
                <ArrowIcon />
              </Link>
              <Link
                href="#scenario-list"
                className="inline-flex items-center justify-center rounded-[12px] bg-[#e8f3ff] px-5 py-4 text-base font-bold text-accent transition hover:bg-[#d7eaff]"
              >
                다른 역할 고르기
              </Link>
            </div>
          </div>

          <div className="rounded-[16px] bg-[#191f28] p-6 text-white shadow-sm sm:p-7">
            <p className="text-sm font-bold text-white/60">체험 흐름</p>
            <div className="mt-5 grid gap-3">
              {steps.map((step, index) => (
                <div key={step.title} className="flex items-center gap-4 rounded-[12px] bg-white/10 p-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-sm font-black text-[#191f28]">
                    {index + 1}
                  </div>
                  <div>
                    <h2 className="font-bold">{step.title}</h2>
                    <p className="text-sm font-bold text-white/50">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-5 grid grid-cols-3 gap-2">
              {["요약", "키워드", "현재뉴스"].map((item) => (
                <div key={item} className="break-keep rounded-[10px] bg-white px-3 py-3 text-center text-sm font-black text-[#191f28]">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="scenario-list" className="mt-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-bold text-accent">시나리오 선택</p>
              <h2 className="mt-1 text-2xl font-bold">어떤 입장에서 판단해볼까요?</h2>
            </div>
            <p className="hidden text-sm text-muted sm:block">회원가입 없이 바로 체험</p>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {scenarios.map((scenario, index) => (
              <ScenarioCard key={scenario.id} scenario={scenario} index={index} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
