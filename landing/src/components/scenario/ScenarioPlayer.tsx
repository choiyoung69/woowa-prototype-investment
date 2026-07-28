"use client";

import Link from "next/link";
import { useMemo, useReducer, useState } from "react";
import type {
  PortfolioState,
  Scenario,
  ScenarioDay,
  TradeInput,
  TradeLogEntry,
} from "@/lib/scenario-engine";
import {
  applyTrade,
  formatPivotContext,
  portfolioValue,
  summarize,
} from "@/lib/scenario-engine";
import { TradePanel } from "./TradePanel";
import { CheckpointScreen } from "./CheckpointScreen";
import { ResultReport } from "./ResultReport";

type Phase = "intro" | "mission";

interface PlayerState {
  dayIndex: number;
  portfolio: PortfolioState;
  tradeLog: TradeLogEntry[];
  finished: boolean;
}

function createReducer(scenario: Scenario) {
  return function reducer(
    state: PlayerState,
    action: { type: "TRADE"; input: TradeInput }
  ): PlayerState {
    const day = scenario.days[state.dayIndex];
    const { state: nextPortfolio, executedAmount } = applyTrade(
      state.portfolio,
      day.price,
      action.input
    );

    const nextLog: TradeLogEntry[] = [
      ...state.tradeLog,
      {
        dayIndex: state.dayIndex,
        date: day.date,
        action: action.input.type,
        amountKrw: executedAmount,
        price: day.price,
        tag: action.input.tag,
        reason: action.input.reason,
      },
    ];

    const nextDayIndex = state.dayIndex + 1;
    const finished = nextDayIndex >= scenario.days.length;

    return {
      dayIndex: finished ? state.dayIndex : nextDayIndex,
      portfolio: nextPortfolio,
      tradeLog: nextLog,
      finished,
    };
  };
}

function formatKrw(value: number) {
  return `${Math.round(value).toLocaleString()}원`;
}

function formatKoreanDate(value: string) {
  const [year, month, day] = value.split("-");
  return `${year}년 ${Number(month)}월 ${Number(day)}일`;
}

function formatShortDate(value: string) {
  const [, month, day] = value.split("-");
  return `${Number(month)}월 ${Number(day)}일`;
}

function getDayName(value: string) {
  return ["일", "월", "화", "수", "목", "금", "토"][new Date(value).getDay()];
}

function changeFromOpen(day: ScenarioDay) {
  const open = day.open ?? day.price;
  const diff = day.price - open;
  const pct = open === 0 ? 0 : (diff / open) * 100;
  return { open, diff, pct };
}

function makeSessionPrices(day: ScenarioDay) {
  const { open } = changeFromOpen(day);
  const close = day.price;
  const gap = close - open;
  return Array.from({ length: 18 }, (_, index) => {
    const progress = index / 17;
    const wave = Math.sin(progress * Math.PI * 3) * Math.abs(gap) * 0.08;
    const shake = ((index % 4) - 1.5) * Math.abs(gap) * 0.025;
    return Math.round(open + gap * progress + wave + shake);
  });
}

function Shell({
  scenario,
  dayIndex,
  phase,
  children,
}: {
  scenario: Scenario;
  dayIndex: number;
  phase: Phase;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-4 lg:px-6">
        <main className="min-w-0 rounded-[16px] border border-border bg-surface p-5 shadow-sm sm:p-7">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-bold text-muted">
                {scenario.title} · {dayIndex + 1}일차
              </p>
              <h1 className="mt-1 text-2xl font-black tracking-tight sm:text-3xl">
                {phase === "intro" && "시나리오 준비"}
                {phase === "mission" && "오늘의 시장 판단"}
              </h1>
            </div>
            <Link
              href="/scenarios"
              className="rounded-[10px] border border-border px-3 py-2 text-sm font-bold text-muted hover:text-foreground"
            >
              시나리오 선택
            </Link>
          </div>

          <div className="mt-6">{children}</div>
        </main>
      </div>
    </div>
  );
}

function IntroStep({
  scenario,
  onStart,
}: {
  scenario: Scenario;
  onStart: () => void;
}) {
  const keywords = scenario.knowledge?.keywords ?? [];
  const learningGoals = scenario.learningGoals ?? [
    "당시 뉴스 3개 이상 확인하기",
    "시장 지표가 왜 움직였는지 추론하기",
    "선택 이유를 한 문장 이상 기록하기",
  ];

  return (
    <div className="space-y-4">
      {scenario.persona && (
        <section className="rounded-[16px] bg-[#e8f3ff] p-5 sm:p-6">
          <p className="text-sm font-black text-accent">이번 판단에서 당신의 입장</p>
          <h2 className="mt-2 text-2xl font-black leading-tight sm:text-3xl">
            당신은 1997년의 투자자입니다
          </h2>
          <p className="mt-4 break-keep text-lg font-black leading-8 text-[#1b64da] sm:text-xl">
            {scenario.persona}
          </p>
        </section>
      )}

      <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
        <section className="min-w-0 rounded-[12px] border border-border bg-surface p-5">
          <p className="text-sm font-bold text-accent">1. 시나리오 확인</p>
          <h2 className="mt-2 text-2xl font-black">{scenario.title}</h2>
          <p className="mt-3 text-sm font-bold leading-6 text-muted">{scenario.description}</p>
          {scenario.knowledge && (
            <div className="mt-4 grid grid-cols-3 gap-2">
              {scenario.knowledge.summary.map((item) => (
                <div
                  key={item}
                  className="break-keep rounded-[10px] bg-background px-2 py-2.5 text-center text-xs font-black sm:text-sm"
                >
                  {item}
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="min-w-0 rounded-[12px] border border-border bg-background p-5">
          <p className="text-sm font-black text-muted">학습 목표</p>
          <div className="mt-4 space-y-3">
            {learningGoals.map((goal) => (
              <div key={goal} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-border bg-surface text-[10px] font-black text-muted">
                  ✓
                </span>
                <p className="text-sm font-bold leading-6 text-muted">{goal}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {keywords.length > 0 && (
        <section className="rounded-[12px] border border-border bg-surface p-5">
          <p className="text-sm font-black text-muted">이번 시나리오 키워드</p>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {keywords.map((keyword) => (
              <div key={keyword.term} className="rounded-[12px] bg-background p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-[#e8f3ff] px-3 py-1.5 text-sm font-black text-accent">
                    {keyword.term}
                  </span>
                  <span className="text-sm font-black">{keyword.meaning}</span>
                </div>
                {keyword.detail && (
                  <p className="mt-3 text-sm font-bold leading-6 text-muted">
                    {keyword.detail}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      <button
        type="button"
        onClick={onStart}
        className="w-full rounded-[12px] bg-accent px-4 py-4 text-sm font-black text-white transition hover:bg-[#1b64da] sm:px-5 sm:text-base"
      >
        실제 시나리오 시작하기
      </button>
    </div>
  );
}

function ScenarioTimeline({
  scenario,
  dayIndex,
}: {
  scenario: Scenario;
  dayIndex: number;
}) {
  return (
    <aside className="rounded-[12px] border border-border bg-surface p-5">
      <p className="text-sm font-black">1단계 ({scenario.days.length}일)</p>
      <p className="mt-1 text-sm font-bold text-muted">IMF 외환위기 (1997)</p>
      <div className="mt-6 space-y-5">
        {scenario.days.map((day, index) => {
          const active = index === dayIndex;
          const locked = index > dayIndex;
          return (
            <div key={day.date} className="flex gap-3">
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-black ${
                  active
                    ? "bg-accent text-white"
                    : "bg-surface-2 text-muted"
                }`}
              >
                {index + 1}
              </div>
              <div className="min-w-0">
                <p className={`text-sm font-black ${active ? "text-accent" : "text-muted"}`}>
                  DAY {index + 1}
                </p>
                <p className="mt-0.5 text-xs font-bold text-muted">
                  {formatShortDate(day.date)} ({getDayName(day.date)})
                  {locked ? " · 잠김" : ""}
                </p>
              </div>
            </div>
          );
        })}
        <div className="flex gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface-2 text-sm font-black text-muted">
            ✓
          </div>
          <div>
            <p className="text-sm font-black text-muted">결과 확인</p>
            <p className="mt-0.5 text-xs font-bold text-muted">선택 복기</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

function MarketChart({ day }: { day: ScenarioDay }) {
  const chartPrices = makeSessionPrices(day);
  const min = Math.min(...chartPrices);
  const max = Math.max(...chartPrices);
  const width = 720;
  const height = 260;
  const padX = 18;
  const padY = 24;
  const range = max - min || 1;
  const stepX = (width - padX * 2) / (chartPrices.length - 1);
  const toY = (price: number) =>
    padY + (height - padY * 2) - ((price - min) / range) * (height - padY * 2);
  const linePoints = chartPrices.map(
    (price, index) => `${padX + index * stepX},${toY(price)}`
  );
  const areaPoints = [
    `${padX},${height - padY}`,
    ...linePoints,
    `${width - padX},${height - padY}`,
  ];
  const { diff, pct } = changeFromOpen(day);
  const trendUp = diff >= 0;
  const color = trendUp ? "var(--up)" : "var(--down)";

  return (
    <div className="min-w-0">
      <div className="flex flex-wrap items-end gap-3">
        <div>
          <p className="text-sm font-black text-muted">{scenarioMarketName}</p>
          <p className="mt-1 text-4xl font-black tracking-tight">
            {day.price.toLocaleString()}
          </p>
        </div>
        <p className={`pb-1 text-lg font-black ${trendUp ? "text-up" : "text-down"}`}>
          {diff > 0 ? "+" : ""}
          {diff.toLocaleString()} ({pct > 0 ? "+" : ""}
          {pct.toFixed(2)}%)
        </p>
      </div>

      <div className="mt-4 flex max-w-xs rounded-full bg-background p-1 text-xs font-black text-muted">
        {["1일", "1주", "1개월", "3개월", "1년"].map((label, index) => (
          <span
            key={label}
            className={`flex-1 rounded-full px-3 py-2 text-center ${
              index === 0 ? "bg-[#e8f3ff] text-accent" : ""
            }`}
          >
            {label}
          </span>
        ))}
      </div>

      <div className="mt-4 rounded-[12px] bg-surface">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          preserveAspectRatio="none"
          className="h-[260px] w-full"
          role="img"
          aria-label="오늘 시장 가격 흐름"
        >
          {[0, 1, 2, 3, 4].map((line) => {
            const y = padY + ((height - padY * 2) / 4) * line;
            return (
              <line
                key={line}
                x1={padX}
                x2={width - padX}
                y1={y}
                y2={y}
                stroke="var(--border)"
                strokeWidth={1}
              />
            );
          })}
          <defs>
            <linearGradient id="market-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.24} />
              <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <polygon points={areaPoints.join(" ")} fill="url(#market-gradient)" />
          <polyline
            points={linePoints.join(" ")}
            fill="none"
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={3}
          />
        </svg>
        <div className="grid grid-cols-4 px-4 pb-2 text-xs font-bold text-muted">
          <span>09:00</span>
          <span>11:00</span>
          <span>13:00</span>
          <span className="text-right">15:00</span>
        </div>
      </div>
    </div>
  );
}

const scenarioMarketName = "코스피 KOSPI";

function MarketStats({
  day,
  cash,
  positionValue,
}: {
  day: ScenarioDay;
  cash: number;
  positionValue: number;
}) {
  const { open } = changeFromOpen(day);
  const low = Math.min(...makeSessionPrices(day));
  const high = Math.max(...makeSessionPrices(day));
  const fxRate = Math.round(day.price * 0.154 + 5);
  const foreignFlow = Math.round((open - day.price) * 2.7);

  return (
    <div className="grid gap-px overflow-hidden rounded-[12px] border border-border bg-border sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
      <MetricTile label="시가" value={open.toLocaleString()} />
      <MetricTile label="고가" value={high.toLocaleString()} />
      <MetricTile label="저가" value={low.toLocaleString()} />
      <MetricTile label="원/달러 환율" value={`${fxRate.toLocaleString()}원`} />
      <MetricTile label="외국인 순매도" value={`-${foreignFlow.toLocaleString()}억원`} tone="down" />
      <MetricTile label="보유 현금" value={formatKrw(cash)} />
      <MetricTile label="포지션" value={formatKrw(positionValue)} />
      <MetricTile label="판단 기준" value="뉴스·지표" />
    </div>
  );
}

function NewsSummary({ day }: { day: ScenarioDay }) {
  return (
    <section className="rounded-[12px] border border-border bg-surface p-5">
      <h2 className="text-xl font-black">뉴스 요약</h2>
      <div className="mt-4 space-y-3">
        {day.articles.map((article, index) => (
          <div key={article.title} className="flex gap-3 rounded-[12px] bg-background p-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-[#e8f3ff] text-sm font-black text-accent">
              {index + 1}
            </div>
            <div className="min-w-0">
              <p className="line-clamp-1 text-sm font-black">{article.title}</p>
              <p className="mt-1 line-clamp-2 text-sm font-bold leading-6 text-muted">
                {article.summary}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function MissionStep({
  scenario,
  day,
  dayIndex,
  cash,
  positionValue,
  onSubmit,
}: {
  scenario: Scenario;
  day: ScenarioDay;
  dayIndex: number;
  cash: number;
  positionValue: number;
  onSubmit: (input: TradeInput) => void;
}) {
  return (
    <div className="grid gap-4 xl:grid-cols-[220px_1fr]">
      <ScenarioTimeline scenario={scenario} dayIndex={dayIndex} />

      <div className="min-w-0 space-y-4">
        <section className="rounded-[16px] border border-border bg-surface p-5 shadow-sm sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-sm font-black text-accent">DAY {dayIndex + 1}</p>
              <h2 className="mt-1 text-3xl font-black tracking-tight">
                {formatKoreanDate(day.date)} ({getDayName(day.date)})
              </h2>
              <p className="mt-2 text-sm font-bold text-muted">
                공개된 정보만 보고 시장을 판단하고, 투자 전략을 선택하세요.
              </p>
            </div>
            <span className="rounded-full bg-background px-3 py-2 text-xs font-black text-muted">
              {scenario.pivotEvent && formatPivotContext(day.date, scenario.pivotEvent)}
            </span>
          </div>

          <div className="mt-6 grid gap-5 xl:grid-cols-[1fr_360px]">
            <MarketChart day={day} />
            <MarketStats day={day} cash={cash} positionValue={positionValue} />
          </div>

          <div className="mt-5 grid gap-3 rounded-[12px] border border-border bg-background p-4 2xl:grid-cols-[260px_1fr_220px]">
            <div className="flex items-center text-base font-black">
              오늘의 시장, 어떻게 대응하시겠어요?
            </div>
            <TradePanel
              cash={cash}
              positionValue={positionValue}
              onSubmit={onSubmit}
              variant="bar"
            />
            <div className="rounded-[12px] bg-surface p-4">
              <p className="text-xs font-black text-muted">보유 현금</p>
              <p className="mt-2 text-lg font-black">{formatKrw(cash)}</p>
            </div>
          </div>
        </section>

        <div className="grid gap-4 xl:grid-cols-[1.35fr_1fr]">
          <section className="overflow-hidden rounded-[12px] border border-border bg-surface">
            <div className="border-b border-border px-5 py-4">
              <h2 className="text-xl font-black">오늘의 주요 뉴스</h2>
              <div className="mt-3 flex gap-2 text-xs font-black text-muted">
                {["전체", "경제", "금융", "기업", "국제"].map((tab, index) => (
                  <span
                    key={tab}
                    className={`rounded-full px-3 py-1.5 ${
                      index === 0 ? "bg-[#e8f3ff] text-accent" : "bg-background"
                    }`}
                  >
                    {tab}
                  </span>
                ))}
              </div>
            </div>
            {day.articles.map((article, index) => (
              <article
                key={`${article.source}-${article.title}`}
                className="grid gap-3 border-b border-border p-5 last:border-b-0 sm:grid-cols-[96px_1fr_48px]"
              >
                <div>
                  <p className="text-xs font-black text-accent">{article.source}</p>
                  <p className="mt-1 text-xs font-bold text-muted">
                    {index === 0 ? "09:30" : "10:15"}
                  </p>
                </div>
                <div className="min-w-0">
                  <h3 className="text-base font-black leading-6">{article.title}</h3>
                  <p className="mt-1 text-sm font-bold leading-6 text-muted">
                    {article.summary}
                  </p>
                </div>
                <span className="h-fit rounded-full bg-background px-2 py-1 text-center text-xs font-black text-muted">
                  {index === 0 ? "경제" : "금융"}
                </span>
              </article>
            ))}
          </section>

          <NewsSummary day={day} />
        </div>
      </div>
    </div>
  );
}

function MetricTile({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone?: "up" | "down";
}) {
  return (
    <div className="bg-surface p-4">
      <p className="text-xs font-black text-muted">{label}</p>
      <p
        className={`mt-2 truncate text-lg font-black ${
          tone === "up" ? "text-up" : tone === "down" ? "text-down" : ""
        }`}
      >
        {value}
      </p>
    </div>
  );
}

export function ScenarioPlayer({ scenario }: { scenario: Scenario }) {
  const reducer = useMemo(() => createReducer(scenario), [scenario]);
  const [state, dispatch] = useReducer(reducer, {
    dayIndex: 0,
    portfolio: { cash: scenario.startingCash, units: 0 },
    tradeLog: [],
    finished: false,
  });
  const [checkpointDismissed, setCheckpointDismissed] = useState(false);
  const [phase, setPhase] = useState<Phase>("intro");

  const currentDay = scenario.days[Math.min(state.dayIndex, scenario.days.length - 1)];
  const totalValue = portfolioValue(state.portfolio, currentDay.price);
  const positionValue = state.portfolio.units * currentDay.price;

  if (state.finished) {
    const summary = summarize(state.tradeLog, totalValue, scenario.startingCash);
    return (
      <ResultReport scenario={scenario} tradeLog={state.tradeLog} summary={summary} />
    );
  }

  const shouldShowCheckpoint =
    scenario.checkpointAfterDay !== undefined &&
    state.dayIndex === scenario.checkpointAfterDay &&
    !checkpointDismissed;

  if (shouldShowCheckpoint) {
    const checkpointSummary = summarize(state.tradeLog, totalValue, scenario.startingCash);
    return (
      <CheckpointScreen
        scenario={scenario}
        dayNumber={state.dayIndex}
        summary={checkpointSummary}
        onContinue={() => setCheckpointDismissed(true)}
      />
    );
  }

  return (
    <Shell
      scenario={scenario}
      dayIndex={state.dayIndex}
      phase={phase}
    >
      {phase === "intro" && (
        <IntroStep scenario={scenario} onStart={() => setPhase("mission")} />
      )}

      {phase === "mission" && (
        <MissionStep
          scenario={scenario}
          day={currentDay}
          dayIndex={state.dayIndex}
          cash={state.portfolio.cash}
          positionValue={positionValue}
          onSubmit={(input) => {
            dispatch({ type: "TRADE", input });
            setPhase("mission");
          }}
        />
      )}
    </Shell>
  );
}
