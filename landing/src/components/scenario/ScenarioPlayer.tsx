"use client";

import { useMemo, useReducer } from "react";
import type {
  PortfolioState,
  Scenario,
  TradeInput,
  TradeLogEntry,
} from "@/lib/scenario-engine";
import { applyTrade, portfolioValue, summarize } from "@/lib/scenario-engine";
import { PriceSparkline } from "./PriceSparkline";
import { TradePanel } from "./TradePanel";
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

  const currentDay = scenario.days[Math.min(state.dayIndex, scenario.days.length - 1)];
  const pricesSoFar = scenario.days.slice(0, state.dayIndex + 1).map((d) => d.price);
  const totalValue = portfolioValue(state.portfolio, currentDay.price);

  if (state.finished) {
    const summary = summarize(state.tradeLog, totalValue, scenario.startingCash);
    return (
      <ResultReport scenario={scenario} tradeLog={state.tradeLog} summary={summary} />
    );
  }

  const positionValue = state.portfolio.units * currentDay.price;
  const dayNumber = state.dayIndex + 1;
  const isLastDay = dayNumber === scenario.days.length;

  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <div className="flex items-center justify-between text-xs text-muted">
        <span>{scenario.title}</span>
        <span>
          {dayNumber} / {scenario.days.length}일차
        </span>
      </div>

      <p className="mt-2 text-sm text-muted">{currentDay.date}</p>
      <p className="mt-3 text-lg font-semibold leading-7">{currentDay.headline}</p>

      <div className="mt-6">
        <PriceSparkline prices={pricesSoFar} />
      </div>

      <div className="mt-4 flex items-baseline justify-between">
        <span className="text-2xl font-bold">{currentDay.price.toLocaleString()}원</span>
        <span className="text-xs text-muted">{scenario.unitLabel} 1좌 가격</span>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-3 rounded-xl border border-border bg-surface p-4 text-center text-sm">
        <div>
          <p className="text-xs text-muted">현금</p>
          <p className="mt-1 font-semibold">
            {Math.round(state.portfolio.cash).toLocaleString()}원
          </p>
        </div>
        <div>
          <p className="text-xs text-muted">보유 포지션</p>
          <p className="mt-1 font-semibold">{Math.round(positionValue).toLocaleString()}원</p>
        </div>
        <div>
          <p className="text-xs text-muted">총 자산</p>
          <p className="mt-1 font-semibold">{Math.round(totalValue).toLocaleString()}원</p>
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
    </div>
  );
}
