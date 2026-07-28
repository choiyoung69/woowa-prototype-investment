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
import { PriceSparkline } from "./PriceSparkline";
import { TradePanel } from "./TradePanel";
import { CheckpointScreen } from "./CheckpointScreen";
import { ResultReport } from "./ResultReport";

type Phase = "mission" | "news" | "trade";

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

function Shell({
  scenario,
  dayIndex,
  phase,
  portfolioValueText,
  children,
}: {
  scenario: Scenario;
  dayIndex: number;
  phase: Phase;
  portfolioValueText: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto grid max-w-7xl gap-4 px-4 py-4 lg:grid-cols-[240px_1fr] lg:px-6">
        <aside className="hidden rounded-[16px] border border-border bg-surface p-5 shadow-sm lg:block">
          <Link href="/" className="text-base font-black">
            투자체험랩
          </Link>
          <nav className="mt-8 space-y-1 text-sm">
            {["홈", "오늘의 뉴스", "퀴즈", "실시간 투자"].map((item) => (
              <span
                key={item}
                className="block rounded-[10px] px-3 py-2 font-bold text-muted"
              >
                {item}
              </span>
            ))}
            <Link
              href="/scenarios"
              className="block rounded-[10px] bg-[#e8f3ff] px-3 py-2 font-bold text-accent"
            >
              과거로 돌아가기
            </Link>
          </nav>

          <div className="mt-28 rounded-[12px] bg-background p-4">
            <p className="text-xs font-bold text-muted">보유 포인트</p>
            <p className="mt-2 text-xl font-black text-accent">597P</p>
            <div className="mt-4 flex justify-between text-xs font-bold text-muted">
              <span>연속 학습</span>
              <span className="text-accent">3일</span>
            </div>
          </div>
        </aside>

        <main className="min-w-0 rounded-[16px] border border-border bg-surface p-5 shadow-sm sm:p-7">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-bold text-muted">
                {scenario.title} · {dayIndex + 1}일차
              </p>
              <h1 className="mt-1 text-2xl font-black tracking-tight sm:text-3xl">
                {phase === "mission" && "오늘의 학습 미션"}
                {phase === "news" && "오늘의 뉴스"}
                {phase === "trade" && "투자 결정하기"}
              </h1>
            </div>
            <Link
              href="/scenarios"
              className="rounded-[10px] border border-border px-3 py-2 text-sm font-bold text-muted hover:text-foreground"
            >
              시나리오 선택
            </Link>
          </div>

          <div className="mt-5 grid min-w-0 gap-4 lg:grid-cols-[1fr_260px]">
            <ProgressPanel scenario={scenario} dayIndex={dayIndex} />
            <PortfolioMini value={portfolioValueText} />
          </div>

          <div className="mt-6">{children}</div>
        </main>
      </div>
    </div>
  );
}

function ProgressPanel({
  scenario,
  dayIndex,
}: {
  scenario: Scenario;
  dayIndex: number;
}) {
  return (
    <div className="min-w-0 overflow-hidden rounded-[12px] border border-border bg-surface p-4">
      <div className="flex max-w-full items-center gap-3 overflow-x-auto pb-1">
        {scenario.days.map((day, index) => {
          const active = index === dayIndex;
          const done = index < dayIndex;

          return (
            <div key={day.date} className="flex min-w-[90px] items-center gap-3 sm:min-w-[104px]">
              <div
                className={`rounded-[14px] border p-4 ${
                  active
                    ? "border-accent bg-[#e8f3ff] text-accent"
                    : done
                      ? "border-border bg-background text-muted"
                      : "border-border bg-surface-2 text-muted"
                }`}
              >
                <p className="text-xs font-black">{index + 1}일차</p>
                <p className="mt-1 text-sm font-bold">{day.date.slice(5)}</p>
              </div>
              {index < scenario.days.length - 1 && (
                <span className="hidden h-px w-8 bg-border sm:block" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function PortfolioMini({ value }: { value: string }) {
  return (
    <div className="min-w-0 overflow-hidden rounded-[12px] border border-border bg-surface p-4">
      <p className="text-xs font-bold text-muted">현재 총 자산</p>
      <p className="mt-2 text-2xl font-black">{value}</p>
      <div className="mt-4 h-2 overflow-hidden rounded-full bg-surface-2">
        <div className="h-full w-1/3 rounded-full bg-accent" />
      </div>
    </div>
  );
}

function MissionStep({
  scenario,
  day,
  dayNumber,
  onStart,
}: {
  scenario: Scenario;
  day: ScenarioDay;
  dayNumber: number;
  onStart: () => void;
}) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <section className="min-w-0 rounded-[12px] border border-border bg-surface p-6">
        <p className="text-sm font-bold text-accent">2. 미션 확인</p>
        <h2 className="mt-2 text-2xl font-black">
          오늘은 {formatKoreanDate(day.date)}입니다
        </h2>
        <p className="mt-3 text-sm font-bold leading-6 text-muted">
          뉴스 확인 → 판단 → 복기
        </p>
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
        {scenario.knowledge?.currentParallels[0] && (
          <a
            href={scenario.knowledge.currentParallels[0].href}
            target="_blank"
            rel="noreferrer"
            className="mt-3 flex min-w-0 items-center gap-3 rounded-[10px] bg-surface-2 px-3 py-2.5 transition hover:bg-[#e8f3ff]"
          >
            <span className="shrink-0 rounded-full bg-white px-2 py-1 text-[11px] font-black text-accent">
              현재
            </span>
            <span className="min-w-0 truncate text-xs font-black sm:text-sm">
              {scenario.knowledge.currentParallels[0].title}
            </span>
          </a>
        )}
        {scenario.persona && dayNumber === 1 && (
          <div className="mt-5 rounded-[12px] bg-[#e8f3ff] p-4">
            <p className="text-xs font-black text-accent">당신의 상황</p>
            <p className="mt-1 line-clamp-1 text-sm leading-6">{scenario.persona}</p>
          </div>
        )}
        <button
          type="button"
          onClick={onStart}
          className="mt-6 w-full rounded-[12px] bg-accent px-4 py-4 text-sm font-black text-white transition hover:bg-[#1b64da] sm:px-5 sm:text-base"
        >
          뉴스 확인하러 가기
        </button>
      </section>

      <section className="min-w-0 rounded-[12px] border border-border bg-background p-6">
        <KnowledgeSnapshot scenario={scenario} />
      </section>
    </div>
  );
}

function KnowledgeSnapshot({ scenario }: { scenario: Scenario }) {
  const summary = scenario.knowledge?.summary ?? [];
  const keywords = scenario.knowledge?.keywords ?? [];
  const current = scenario.knowledge?.currentParallels[0];

  return (
    <div>
      <p className="text-sm font-black text-muted">한눈 요약</p>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {summary.map((item) => (
          <div key={item} className="rounded-[10px] bg-surface px-3 py-3 text-center">
            <p className="break-keep text-xs font-black sm:text-sm">{item}</p>
          </div>
        ))}
      </div>

      <p className="mt-5 text-sm font-black text-muted">키워드</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {keywords.map((keyword) => (
          <span
            key={keyword.term}
            className="rounded-full bg-[#e8f3ff] px-3 py-2 text-sm font-black text-accent"
            title={keyword.meaning}
          >
            {keyword.term}
          </span>
        ))}
      </div>

      {current && (
        <a
          href={current.href}
          target="_blank"
          rel="noreferrer"
          className="mt-5 block rounded-[12px] border border-border bg-surface p-4 transition hover:border-accent"
        >
          <p className="text-xs font-black text-muted">현재 비슷한 뉴스</p>
          <p className="mt-1 line-clamp-1 text-sm font-black">{current.title}</p>
          <p className="mt-1 text-xs font-bold text-accent">{current.source}</p>
        </a>
      )}
    </div>
  );
}

function NewsStep({
  scenario,
  day,
  prices,
  onNext,
}: {
  scenario: Scenario;
  day: ScenarioDay;
  prices: number[];
  onNext: () => void;
}) {
  return (
    <div className="space-y-5">
      <div>
        <p className="text-sm font-bold text-accent">3. 정보 확인</p>
        <h2 className="mt-2 text-2xl font-black">뉴스를 보고 시장을 판단하세요</h2>
        <p className="mt-2 text-sm leading-6 text-muted">
          {scenario.pivotEvent && formatPivotContext(day.date, scenario.pivotEvent)} ·{" "}
          {scenario.unitLabel} 1좌 {day.price.toLocaleString()}원
        </p>
      </div>

      {scenario.knowledge && (
        <div className="grid gap-3 md:grid-cols-[1fr_1fr_1.1fr]">
          <div className="rounded-[12px] bg-[#e8f3ff] p-4">
            <p className="text-xs font-black text-accent">내용 요약</p>
            <p className="mt-2 text-lg font-black">{scenario.knowledge.summary.join(" → ")}</p>
          </div>
          <div className="rounded-[12px] bg-surface p-4">
            <p className="text-xs font-black text-muted">오늘 볼 키워드</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {scenario.knowledge.keywords.map((keyword) => (
                <span key={keyword.term} className="rounded-full bg-surface-2 px-2.5 py-1 text-xs font-black">
                  {keyword.term}
                </span>
              ))}
            </div>
          </div>
          <a
            href={scenario.knowledge.currentParallels[0]?.href}
            target="_blank"
            rel="noreferrer"
            className="rounded-[12px] bg-surface p-4 transition hover:bg-surface-2"
          >
            <p className="text-xs font-black text-muted">현재 비슷한 뉴스</p>
            <p className="mt-2 line-clamp-2 text-sm font-black">
              {scenario.knowledge.currentParallels[0]?.title}
            </p>
          </a>
        </div>
      )}

      <div className="grid gap-5 lg:grid-cols-[1fr_280px]">
        <section className="overflow-hidden rounded-[12px] border border-border bg-surface">
          {day.articles.map((article, index) => (
            <article
              key={`${article.source}-${article.title}`}
              className="flex gap-4 border-b border-border p-5 last:border-b-0"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[12px] bg-surface-2 text-sm font-black text-accent">
                {index + 1}
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-xs font-bold text-muted">{article.source}</p>
                  <p className="text-xs text-muted">{day.date}</p>
                </div>
                <h3 className="mt-1 text-base font-black leading-6">{article.title}</h3>
                <p className="mt-1 text-sm leading-6 text-muted">{article.summary}</p>
              </div>
            </article>
          ))}
        </section>

        <aside className="space-y-4">
          <div className="rounded-[12px] border border-border bg-surface p-4">
            <p className="text-xs font-bold text-muted">시장 지표</p>
            <p className="mt-2 text-3xl font-black">{day.price.toLocaleString()}원</p>
            <p className="mt-1 text-sm font-bold text-muted">{scenario.unitLabel}</p>
          </div>
          <PriceSparkline prices={prices} />
        </aside>
      </div>

      <button
        type="button"
        onClick={onNext}
        className="w-full rounded-[12px] bg-accent px-5 py-4 text-base font-black text-white transition hover:bg-[#1b64da]"
      >
        투자 결정하러 가기
      </button>
    </div>
  );
}

function TradeStep({
  cash,
  positionValue,
  totalValue,
  onSubmit,
}: {
  cash: number;
  positionValue: number;
  totalValue: number;
  onSubmit: (input: TradeInput) => void;
}) {
  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_1.2fr]">
      <section className="rounded-[12px] border border-border bg-surface p-5">
        <p className="text-sm font-bold text-accent">4. 투자 결정</p>
        <h2 className="mt-2 text-2xl font-black">오늘의 선택을 남겨주세요</h2>
        <p className="mt-2 text-sm leading-6 text-muted">
          매수, 매도, 관망 중 하나를 선택하면 이유와 감정을 기록하고 다음 날로
          넘어갑니다.
        </p>

        <div className="mt-5 grid grid-cols-3 gap-3 rounded-[12px] bg-background p-4 text-center text-sm">
          <div>
            <p className="text-xs font-bold text-muted">현금</p>
            <p className="mt-1 font-black">{formatKrw(cash)}</p>
          </div>
          <div>
            <p className="text-xs font-bold text-muted">포지션</p>
            <p className="mt-1 font-black">{formatKrw(positionValue)}</p>
          </div>
          <div>
            <p className="text-xs font-bold text-muted">총 자산</p>
            <p className="mt-1 font-black">{formatKrw(totalValue)}</p>
          </div>
        </div>
      </section>

      <section className="rounded-[12px] border border-border bg-surface p-5">
        <TradePanel cash={cash} positionValue={positionValue} onSubmit={onSubmit} />
      </section>
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
  const [phase, setPhase] = useState<Phase>("mission");

  const currentDay = scenario.days[Math.min(state.dayIndex, scenario.days.length - 1)];
  const firstDayOpen = scenario.days[0]?.open;
  const closePrices = scenario.days.slice(0, state.dayIndex + 1).map((d) => d.price);
  const pricesSoFar = firstDayOpen !== undefined ? [firstDayOpen, ...closePrices] : closePrices;
  const totalValue = portfolioValue(state.portfolio, currentDay.price);
  const positionValue = state.portfolio.units * currentDay.price;
  const dayNumber = state.dayIndex + 1;

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
      portfolioValueText={formatKrw(totalValue)}
    >
      {phase === "mission" && (
        <MissionStep
          scenario={scenario}
          day={currentDay}
          dayNumber={dayNumber}
          onStart={() => setPhase("news")}
        />
      )}

      {phase === "news" && (
        <NewsStep
          scenario={scenario}
          day={currentDay}
          prices={pricesSoFar}
          onNext={() => setPhase("trade")}
        />
      )}

      {phase === "trade" && (
        <TradeStep
          cash={state.portfolio.cash}
          positionValue={positionValue}
          totalValue={totalValue}
          onSubmit={(input) => {
            dispatch({ type: "TRADE", input });
            setPhase("mission");
          }}
        />
      )}
    </Shell>
  );
}
