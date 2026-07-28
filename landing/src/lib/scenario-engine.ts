export type TradeAction = "buy" | "sell" | "hold";

export interface NewsArticle {
  title: string;
  summary: string;
  source: string;
}

export interface ScenarioDay {
  date: string;
  price: number;
  headline: string;
  articles: NewsArticle[];
}

export interface Scenario {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  disclaimer: string;
  unitLabel: string;
  startingCash: number;
  days: ScenarioDay[];
}

export interface PortfolioState {
  cash: number;
  units: number;
}

export interface TradeInput {
  type: TradeAction;
  amountKrw?: number;
  tag?: string;
  reason?: string;
}

export interface TradeLogEntry {
  dayIndex: number;
  date: string;
  action: TradeAction;
  amountKrw: number;
  price: number;
  tag?: string;
  reason?: string;
}

export function portfolioValue(state: PortfolioState, price: number): number {
  return state.cash + state.units * price;
}

export function applyTrade(
  state: PortfolioState,
  price: number,
  input: TradeInput
): { state: PortfolioState; executedAmount: number } {
  if (input.type === "buy") {
    const amount = Math.max(0, Math.min(input.amountKrw ?? 0, state.cash));
    if (amount <= 0) return { state, executedAmount: 0 };
    return {
      state: { cash: state.cash - amount, units: state.units + amount / price },
      executedAmount: amount,
    };
  }

  if (input.type === "sell") {
    const positionValue = state.units * price;
    const amount = Math.max(0, Math.min(input.amountKrw ?? 0, positionValue));
    if (amount <= 0) return { state, executedAmount: 0 };
    const unitsSold = amount / price;
    return {
      state: { cash: state.cash + amount, units: state.units - unitsSold },
      executedAmount: amount,
    };
  }

  return { state, executedAmount: 0 };
}

export interface TradeSummary {
  finalValue: number;
  returnPct: number;
  tagCounts: Record<string, number>;
  topTag: string | null;
  buyCount: number;
  sellCount: number;
  holdCount: number;
}

export function summarize(
  tradeLog: TradeLogEntry[],
  finalValue: number,
  startingCash: number
): TradeSummary {
  const tagCounts: Record<string, number> = {};
  let buyCount = 0;
  let sellCount = 0;
  let holdCount = 0;

  for (const entry of tradeLog) {
    if (entry.tag) {
      tagCounts[entry.tag] = (tagCounts[entry.tag] ?? 0) + 1;
    }
    if (entry.action === "buy") buyCount += 1;
    else if (entry.action === "sell") sellCount += 1;
    else holdCount += 1;
  }

  let topTag: string | null = null;
  let topCount = 0;
  for (const [tag, count] of Object.entries(tagCounts)) {
    if (count > topCount) {
      topTag = tag;
      topCount = count;
    }
  }

  return {
    finalValue,
    returnPct: ((finalValue - startingCash) / startingCash) * 100,
    tagCounts,
    topTag,
    buyCount,
    sellCount,
    holdCount,
  };
}

export interface ShareResult {
  scenarioId: string;
  scenarioTitle: string;
  returnPct: number;
  topTag: string | null;
  tradeCount: number;
  days: number;
}

export function encodeShareResult(result: ShareResult): string {
  const json = JSON.stringify(result);
  const bytes = new TextEncoder().encode(json);
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  const base64 = btoa(binary);
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export function decodeShareResult(encoded: string): ShareResult | null {
  try {
    const base64 = encoded.replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), "=");
    const binary = atob(padded);
    const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
    const json = new TextDecoder().decode(bytes);
    return JSON.parse(json) as ShareResult;
  } catch {
    return null;
  }
}
