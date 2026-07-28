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

function formatNumber(value: number, maximumFractionDigits = 2) {
  return value.toLocaleString("ko-KR", {
    minimumFractionDigits: Number.isInteger(value) ? 0 : Math.min(maximumFractionDigits, 2),
    maximumFractionDigits,
  });
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
  if (day.intraday && day.intraday.length > 1) return day.intraday;

  const { open } = changeFromOpen(day);
  const close = day.price;
  const gap = close - open;
  return Array.from({ length: 48 }, (_, index) => {
    const progress = index / 47;
    const wave = Math.sin(progress * Math.PI * 3) * Math.abs(gap) * 0.08;
    const shake = ((index % 4) - 1.5) * Math.abs(gap) * 0.025;
    return Number((open + gap * progress + wave + shake).toFixed(2));
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
  const isMission = phase === "mission";

  return (
    <div className="min-h-screen bg-background">
      {isMission && <TopNav />}

      <div className={`mx-auto px-4 py-4 lg:px-6 ${isMission ? "max-w-[1920px]" : "max-w-7xl"}`}>
        <main
          className={
            isMission
              ? "min-w-0"
              : "min-w-0 rounded-[16px] border border-border bg-surface p-5 shadow-sm sm:p-7"
          }
        >
          {!isMission && (
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-bold text-muted">
                  {scenario.title} · {dayIndex + 1}일차
                </p>
                <h1 className="mt-1 text-2xl font-black tracking-tight sm:text-3xl">
                  시나리오 준비
                </h1>
              </div>
              <Link
                href="/scenarios"
                className="rounded-[10px] border border-border px-3 py-2 text-sm font-bold text-muted hover:text-foreground"
              >
                시나리오 선택
              </Link>
            </div>
          )}

          <div className={isMission ? "" : "mt-6"}>{children}</div>
        </main>
      </div>
    </div>
  );
}

function TopNav() {
  const navItems = ["홈", "오늘의 뉴스", "학습", "과거로 돌아가기", "포트폴리오", "내 정보"];

  return (
    <header className="border-b border-border bg-surface">
      <div className="mx-auto flex h-16 max-w-[1920px] items-center justify-between px-5 lg:px-8">
        <Link href="/" className="flex items-center gap-2 text-lg font-black">
          <span className="relative h-8 w-8 rounded-[9px] bg-[#191f28]">
            <span className="absolute left-2 top-2 h-4 w-4 rotate-45 rounded-[3px] bg-[#3182f6]" />
          </span>
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

        <div className="flex items-center gap-4 text-sm font-black">
          <span className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-[9px] bg-accent text-white">
              ◆
            </span>
            597P
          </span>
          <span className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-[9px] bg-[#f0448f] text-white">
              ↯
            </span>
            25
          </span>
          <span className="hidden text-muted sm:inline">Lv.3 투자초보</span>
        </div>
      </div>
    </header>
  );
}

function LockIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="5" y="10" width="14" height="10" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </svg>
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
  cash,
}: {
  scenario: Scenario;
  dayIndex: number;
  cash: number;
}) {
  return (
    <aside className="flex min-h-[620px] flex-col rounded-[12px] border border-border bg-surface p-5">
      <p className="text-sm font-black">1단계 ({scenario.days.length}일)</p>
      <p className="mt-1 text-sm font-bold text-muted">IMF 외환위기 (1997)</p>
      <div className="mt-6 flex-1 space-y-5">
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
                </p>
              </div>
              {locked && (
                <span className="ml-auto mt-1 text-muted">
                  <LockIcon />
                </span>
              )}
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
          <span className="ml-auto mt-1 text-muted">
            <LockIcon />
          </span>
        </div>
      </div>
      <div className="mt-8 rounded-[12px] bg-background p-4">
        <p className="text-xs font-black text-muted">보유 현금</p>
        <p className="mt-2 text-lg font-black">{formatKrw(cash)}</p>
      </div>
    </aside>
  );
}

function MarketChart({ day }: { day: ScenarioDay }) {
  const chartPrices = makeSessionPrices(day);
  const sessionLow = Math.min(day.low ?? Infinity, ...chartPrices);
  const sessionHigh = Math.max(day.high ?? -Infinity, ...chartPrices);
  const pricePadding = (sessionHigh - sessionLow || 1) * 0.1;
  const min = sessionLow - pricePadding;
  const max = sessionHigh + pricePadding;
  const width = 760;
  const height = 420;
  const padX = 44;
  const padRight = 64;
  const chartTop = 26;
  const chartBottom = 292;
  const volumeTop = 322;
  const volumeBottom = 392;
  const range = max - min || 1;
  const stepX = (width - padX - padRight) / (chartPrices.length - 1);
  const toY = (price: number) =>
    chartBottom - ((price - min) / range) * (chartBottom - chartTop);
  const linePoints = chartPrices.map(
    (price, index) => `${padX + index * stepX},${toY(price)}`
  );
  const areaPoints = [
    `${padX},${chartBottom}`,
    ...linePoints,
    `${width - padRight},${chartBottom}`,
  ];
  const priceTicks = Array.from({ length: 5 }, (_, index) => {
    const value = max - (range / 4) * index;
    return {
      value,
      y: toY(value),
    };
  });
  const volumes = chartPrices.map((price, index) => {
    const prev = chartPrices[Math.max(0, index - 1)];
    return Math.max(0.2, Math.abs(price - prev) / range + index / chartPrices.length / 3);
  });
  const maxVolume = Math.max(...volumes);
  const currentY = toY(day.price);
  const { diff, pct } = changeFromOpen(day);
  const trendUp = diff >= 0;
  const color = trendUp ? "var(--up)" : "var(--down)";

  return (
    <div className="min-w-0 rounded-[14px] border border-border bg-surface p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-sm font-black text-muted">{scenarioMarketName}</p>
            <span className="rounded-full bg-background px-2 py-1 text-[11px] font-black text-muted">
              장중 재구성
            </span>
          </div>
          <div className="mt-1 flex flex-wrap items-end gap-3">
            <p className="text-4xl font-black tracking-tight">{formatNumber(day.price)}</p>
            <p className={`pb-1 text-lg font-black ${trendUp ? "text-up" : "text-down"}`}>
              {diff > 0 ? "+" : ""}
              {formatNumber(diff)} ({pct > 0 ? "+" : ""}
              {pct.toFixed(2)}%)
            </p>
          </div>
        </div>
        <div className="rounded-[10px] bg-background px-3 py-2 text-right">
          <p className="text-[11px] font-black text-muted">거래량</p>
          <p className="mt-1 text-sm font-black">{day.tradingVolume ?? "-"}</p>
        </div>
      </div>

      <div className="mt-4 flex max-w-sm rounded-full bg-background p-1 text-xs font-black text-muted">
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

      <div className="mt-4 overflow-hidden rounded-[12px] bg-background">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          preserveAspectRatio="xMidYMid meet"
          className="h-[420px] w-full"
          role="img"
          aria-label="오늘 시장 가격 흐름"
        >
          <defs>
            <linearGradient id="market-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.24} />
              <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          {priceTicks.map((tick) => (
            <g key={tick.value}>
              <line
                x1={padX}
                x2={width - padRight}
                y1={tick.y}
                y2={tick.y}
                stroke="var(--border)"
                strokeWidth={1}
              />
              <text
                x={width - padRight + 10}
                y={tick.y + 4}
                fill="var(--muted)"
                fontSize="12"
                fontWeight="800"
              >
                {formatNumber(tick.value)}
              </text>
            </g>
          ))}
          <line
            x1={padX}
            x2={width - padRight}
            y1={currentY}
            y2={currentY}
            stroke={color}
            strokeDasharray="5 5"
            strokeOpacity={0.45}
            strokeWidth={1.4}
          />
          <polygon points={areaPoints.join(" ")} fill="url(#market-gradient)" />
          <polyline
            points={linePoints.join(" ")}
            fill="none"
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={3}
          />
          <rect
            x={width - padRight + 6}
            y={Math.max(chartTop, Math.min(chartBottom - 26, currentY - 13))}
            width={54}
            height={26}
            rx={8}
            fill={color}
          />
          <text
            x={width - padRight + 33}
            y={Math.max(chartTop, Math.min(chartBottom - 26, currentY - 13)) + 17}
            fill="white"
            fontSize="12"
            fontWeight="900"
            textAnchor="middle"
          >
            {formatNumber(day.price)}
          </text>
          <line
            x1={padX}
            x2={width - padRight}
            y1={volumeTop - 14}
            y2={volumeTop - 14}
            stroke="var(--border)"
            strokeWidth={1}
          />
          <text x={padX} y={volumeTop - 22} fill="var(--muted)" fontSize="12" fontWeight="900">
            거래량
          </text>
          {volumes.map((volume, index) => {
            const barWidth = Math.max(2, stepX * 0.62);
            const x = padX + index * stepX - barWidth / 2;
            const barHeight = (volume / maxVolume) * (volumeBottom - volumeTop);
            const up = chartPrices[index] >= chartPrices[Math.max(0, index - 1)];
            return (
              <rect
                key={`${index}-${volume}`}
                x={x}
                y={volumeBottom - barHeight}
                width={barWidth}
                height={barHeight}
                rx={1.5}
                fill={up ? "var(--up)" : "var(--down)"}
                opacity={0.22}
              />
            );
          })}
          {["09:00", "11:00", "13:00", "15:00"].map((label, index) => (
            <text
              key={label}
              x={padX + ((width - padX - padRight) / 3) * index}
              y={height - 8}
              fill="var(--muted)"
              fontSize="12"
              fontWeight="900"
              textAnchor={index === 0 ? "start" : index === 3 ? "end" : "middle"}
            >
              {label}
            </text>
          ))}
        </svg>
      </div>
    </div>
  );
}

const scenarioMarketName = "코스피 KOSPI";

function MarketStats({
  day,
  cash,
}: {
  day: ScenarioDay;
  cash: number;
}) {
  const { open } = changeFromOpen(day);
  const sessionPrices = makeSessionPrices(day);
  const low = day.low ?? Math.min(...sessionPrices);
  const high = day.high ?? Math.max(...sessionPrices);
  const fxRate = day.fxRate;
  const foreignFlow = day.foreignFlow;
  const foreignTone = foreignFlow === undefined ? undefined : foreignFlow >= 0 ? "up" : "down";
  const foreignLabel =
    foreignFlow === undefined ? "외국인 수급" : foreignFlow >= 0 ? "외국인 순매수" : "외국인 순매도";
  const foreignValue =
    foreignFlow === undefined
      ? "-"
      : `${foreignFlow > 0 ? "+" : ""}${foreignFlow.toLocaleString("ko-KR")}억원`;

  return (
    <div className="rounded-[12px] border border-border bg-surface p-4 shadow-sm">
      <p className="text-sm font-black text-muted">시장 요약</p>
      <div className="mt-3 grid gap-2">
        <CompactMetric label="시가" value={formatNumber(open)} />
        <CompactMetric label="고가" value={formatNumber(high)} />
        <CompactMetric label="저가" value={formatNumber(low)} />
        <CompactMetric
          label="원/달러 환율"
          value={fxRate === undefined ? "-" : `${formatNumber(fxRate)}원`}
        />
        <CompactMetric label={foreignLabel} value={foreignValue} tone={foreignTone} />
        <CompactMetric
          label="국고채 3년"
          value={day.bondYield === undefined ? "-" : `${formatNumber(day.bondYield)}%`}
          tone={day.bondYield && day.bondYield >= 20 ? "down" : undefined}
        />
        <CompactMetric label="거래대금" value={day.tradingValue ?? "-"} />
        <CompactMetric label="보유 현금" value={formatKrw(cash)} />
      </div>
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
  const newsTimes = ["09:30", "10:15", "11:20", "12:05", "14:10"];
  const newsCategories = ["경제", "금융", "기업", "국제", "시장"];

  return (
    <div className="grid gap-4 lg:grid-cols-[220px_1fr]">
      <ScenarioTimeline scenario={scenario} dayIndex={dayIndex} cash={cash} />

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

          <div className="mt-6 grid gap-5 xl:grid-cols-[minmax(0,1fr)_260px]">
            <MarketChart day={day} />
            <MarketStats day={day} cash={cash} />
          </div>

          <div className="mt-5 rounded-[12px] border border-border bg-background p-4">
            <TradePanel
              cash={cash}
              positionValue={positionValue}
              onSubmit={onSubmit}
              variant="bar"
            />
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
                    {newsTimes[index] ?? "15:00"}
                  </p>
                </div>
                <div className="min-w-0">
                  <h3 className="text-base font-black leading-6">{article.title}</h3>
                  <p className="mt-1 text-sm font-bold leading-6 text-muted">
                    {article.summary}
                  </p>
                </div>
                <span className="h-fit rounded-full bg-background px-2 py-1 text-center text-xs font-black text-muted">
                  {newsCategories[index] ?? "이슈"}
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

function CompactMetric({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone?: "up" | "down";
}) {
  return (
    <div className="rounded-[10px] bg-background px-3 py-2.5">
      <p className="text-[11px] font-black text-muted">{label}</p>
      <p
        className={`mt-1 truncate text-base font-black ${
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
