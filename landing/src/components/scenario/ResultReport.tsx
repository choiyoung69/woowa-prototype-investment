"use client";

import { useMemo, useState } from "react";
import type { Scenario, TradeLogEntry, TradeSummary } from "@/lib/scenario-engine";
import { encodeShareResult } from "@/lib/scenario-engine";
import { getEmotionTag } from "@/data/concepts";
import { EmailForm } from "@/components/EmailForm";

const actionLabels: Record<string, string> = {
  buy: "매수",
  sell: "매도",
  hold: "관망",
};

export function ResultReport({
  scenario,
  tradeLog,
  summary,
}: {
  scenario: Scenario;
  tradeLog: TradeLogEntry[];
  summary: TradeSummary;
}) {
  const [copied, setCopied] = useState(false);

  const shareUrl = useMemo(() => {
    const encoded = encodeShareResult({
      scenarioId: scenario.id,
      scenarioTitle: scenario.title,
      returnPct: summary.returnPct,
      topTag: summary.topTag,
      tradeCount: summary.buyCount + summary.sellCount,
      days: scenario.days.length,
    });
    return `/share/${encoded}`;
  }, [scenario, summary]);

  async function handleCopy() {
    try {
      const fullUrl = `${window.location.origin}${shareUrl}`;
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  const isPositive = summary.returnPct >= 0;
  const topTag = summary.topTag ? getEmotionTag(summary.topTag) : null;

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <p className="text-center text-sm text-muted">{scenario.title} 결과</p>
      <p
        className={`mt-2 text-center text-5xl font-bold ${isPositive ? "text-up" : "text-down"}`}
      >
        {isPositive ? "+" : ""}
        {summary.returnPct.toFixed(1)}%
      </p>
      <p className="mt-2 text-center text-sm text-muted">
        최종 자산 {Math.round(summary.finalValue).toLocaleString()}원 (시작{" "}
        {scenario.startingCash.toLocaleString()}원)
      </p>

      {topTag && (
        <p className="mt-6 text-center text-base leading-7">
          당신은 이 시나리오에서{" "}
          <span className="font-semibold text-accent">
            {topTag.label} {summary.tagCounts[topTag.id]}회
          </span>
          를 했어요.
        </p>
      )}

      <div className="mt-8 flex justify-center gap-6 text-center text-sm text-muted">
        <span>매수 {summary.buyCount}회</span>
        <span>매도 {summary.sellCount}회</span>
        <span>관망 {summary.holdCount}회</span>
      </div>

      <div className="mt-10 overflow-hidden rounded-2xl border border-border bg-surface">
        <h3 className="border-b border-border px-5 py-3 text-sm font-semibold">
          매매 타임라인
        </h3>
        <ul className="divide-y divide-border">
          {tradeLog.every((entry) => entry.action === "hold" && !entry.tag) && (
            <li className="px-5 py-4 text-sm text-muted">
              특별한 기록 없이 관망만 하셨네요.
            </li>
          )}
          {tradeLog.map((entry, index) => {
            const tag = entry.tag ? getEmotionTag(entry.tag) : null;
            return (
              <li key={index} className="px-5 py-4 text-sm">
                <div className="flex items-center justify-between gap-3">
                  <span className="font-medium">
                    {entry.date} · {actionLabels[entry.action]}
                    {tag ? ` · ${tag.label}` : ""}
                  </span>
                  {entry.amountKrw > 0 && (
                    <span className="shrink-0 text-muted">
                      {Math.round(entry.amountKrw).toLocaleString()}원
                    </span>
                  )}
                </div>
                {entry.reason && (
                  <p className="mt-1 text-xs text-muted">&ldquo;{entry.reason}&rdquo;</p>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mt-10 flex flex-col items-center gap-3">
        <button
          type="button"
          onClick={handleCopy}
          className="rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground transition hover:brightness-110"
        >
          {copied ? "링크가 복사됐어요" : "결과 공유 링크 복사"}
        </button>
      </div>

      <div className="mt-14 border-t border-border pt-10 text-center">
        <h3 className="text-lg font-semibold">이 결과를 저장하고 싶다면</h3>
        <p className="mt-2 text-sm text-muted">
          이메일을 남겨주시면 계정 기능이 열릴 때 가장 먼저 알려드릴게요.
        </p>
        <div className="mt-5">
          <EmailForm
            source={`result_${scenario.id}`}
            align="center"
            ctaLabel="결과 저장 알림 받기"
          />
        </div>
      </div>
    </div>
  );
}
