"use client";

import { useMemo, useReducer, useState } from "react";
import type {
  PortfolioState,
  Scenario,
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
import { NewsFeed } from "./NewsFeed";
import { CheckpointScreen } from "./CheckpointScreen";
import { ResultReport } from "./ResultReport";

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

export function ScenarioPlayer({ scenario }: { scenario: Scenario }) {
  const reducer = useMemo(() => createReducer(scenario), [scenario]);
  const [state, dispatch] = useReducer(reducer, {
    dayIndex: 0,
    portfolio: { cash: scenario.startingCash, units: 0 },
    tradeLog: [],
    finished: false,
  });
  const [checkpointDismissed, setCheckpointDismissed] = useState(false);

  const currentDay = scenario.days[Math.min(state.dayIndex, scenario.days.length - 1)];
  const previousDay = state.dayIndex > 0 ? scenario.days[state.dayIndex - 1] : null;
  const firstDayOpen = scenario.days[0]?.open;
  const closePrices = scenario.days.slice(0, state.dayIndex + 1).map((d) => d.price);
  const pricesSoFar = firstDayOpen !== undefined ? [firstDayOpen, ...closePrices] : closePrices;
  const totalValue = portfolioValue(state.portfolio, currentDay.price);

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

  const positionValue = state.portfolio.units * currentDay.price;
  const dayNumber = state.dayIndex + 1;
  const isLastDay = dayNumber === scenario.days.length;
  const progress = (dayNumber / scenario.days.length) * 100;

  const changePct = previousDay
    ? ((currentDay.price - previousDay.price) / previousDay.price) * 100
    : 0;
  const changeUp = changePct >= 0;

  return (
    <div className="mx-auto max-w-2xl px-5 pb-16 pt-8 sm:px-6">
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-2">
        <div
          className="h-full rounded-full bg-accent transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>

      {state.dayIndex === 0 && scenario.persona && (
        <div className="mt-5 rounded-[8px] bg-[#e8f3ff] p-4">
          <span className="text-xs font-bold text-accent">당신은</span>
          <p className="mt-1 text-sm leading-6">{scenario.persona}</p>
        </div>
      )}

      <div className="mt-4 flex items-center justify-between text-xs text-muted">
        <span>{scenario.title}</span>
        <span>
          {dayNumber} / {scenario.days.length}일차
        </span>
      </div>

      <p className="mt-3 text-sm text-muted">당신은 {currentDay.date}에 있어요</p>
      {scenario.pivotEvent && (
        <p className="mt-1 text-sm font-semibold text-accent">
          {formatPivotContext(currentDay.date, scenario.pivotEvent)}
        </p>
      )}

      <p className="mt-4 text-xl font-bold leading-8">{currentDay.headline}</p>

      <div className="mt-4 flex items-end gap-3">
        <span className="text-4xl font-bold tracking-tight">
          {currentDay.price.toLocaleString()}원
        </span>
        {previousDay && (
          <span
            className={`mb-1 rounded-full px-2 py-0.5 text-xs font-semibold ${
              changeUp ? "bg-up/10 text-up" : "bg-down/10 text-down"
            }`}
          >
            {changeUp ? "+" : ""}
            {changePct.toFixed(1)}%
          </span>
        )}
      </div>
      <p className="mt-1 text-xs text-muted">{scenario.unitLabel} 1좌 가격</p>

      <div className="mt-5">
        <PriceSparkline prices={pricesSoFar} />
      </div>

      <div className="mt-6 grid grid-cols-3 gap-3 rounded-[8px] border border-border bg-surface p-5 text-center text-sm shadow-sm">
        <div>
          <p className="text-xs text-muted">현금</p>
          <p className="mt-1.5 font-semibold">
            {Math.round(state.portfolio.cash).toLocaleString()}원
          </p>
        </div>
        <div>
          <p className="text-xs text-muted">보유 포지션</p>
          <p className="mt-1.5 font-semibold">{Math.round(positionValue).toLocaleString()}원</p>
        </div>
        <div>
          <p className="text-xs text-muted">총 자산</p>
          <p className="mt-1.5 font-semibold">{Math.round(totalValue).toLocaleString()}원</p>
        </div>
      </div>

      <div className="mt-6">
        <TradePanel
          cash={state.portfolio.cash}
          positionValue={positionValue}
          onSubmit={(input) => dispatch({ type: "TRADE", input })}
        />
      </div>

      {isLastDay && (
        <p className="mt-4 text-center text-xs text-muted">
          마지막 날이에요. 결정을 내리면 결과가 공개됩니다.
        </p>
      )}

      <NewsFeed articles={currentDay.articles} />
    </div>
  );
}
