"use client";

import { useMemo, useState } from "react";
import type { Scenario, TradeSummary } from "@/lib/scenario-engine";
import { encodeShareResult } from "@/lib/scenario-engine";
import { deriveInvestorType, getEmotionTag } from "@/data/concepts";

export function CheckpointScreen({
  scenario,
  dayNumber,
  summary,
  onContinue,
}: {
  scenario: Scenario;
  dayNumber: number;
  summary: TradeSummary;
  onContinue: () => void;
}) {
  const [copied, setCopied] = useState(false);

  const learnedTags = useMemo(
    () =>
      Object.keys(summary.tagCounts)
        .map((id) => getEmotionTag(id))
        .filter((tag): tag is NonNullable<typeof tag> => Boolean(tag)),
    [summary.tagCounts]
  );

  const investorType = deriveInvestorType(summary.topTag);

  async function handleSaveCard() {
    try {
      const encoded = encodeShareResult({
        scenarioId: scenario.id,
        scenarioTitle: `${scenario.title} · ${dayNumber}일차 체크포인트`,
        returnPct: summary.returnPct,
        topTag: summary.topTag,
        tradeCount: summary.buyCount + summary.sellCount,
        days: dayNumber,
      });
      const fullUrl = `${window.location.origin}/share/${encoded}`;
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/70 p-6 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-3xl border border-border bg-surface p-6">
        <span className="rounded-full border border-border px-3 py-1 text-xs text-muted">
          {dayNumber}일차 체크포인트
        </span>

        <h3 className="mt-4 text-lg font-bold">지금까지 배운 개념</h3>
        {learnedTags.length === 0 ? (
          <p className="mt-2 text-sm text-muted">
            아직 감정 태그를 고르지 않았어요. 다음 매매부터는 골라보세요.
          </p>
        ) : (
          <div className="mt-3 space-y-2">
            {learnedTags.map((tag) => (
              <div key={tag.id} className="rounded-xl border border-border bg-background p-3">
                <span className="text-sm font-semibold text-accent">{tag.label}</span>
                <p className="mt-1 text-xs leading-5 text-muted">{tag.description}</p>
              </div>
            ))}
          </div>
        )}

        <div className="mt-6 rounded-2xl border border-accent/40 bg-accent/10 p-4">
          <p className="text-xs text-muted">지금까지의 당신은</p>
          <p className="mt-1 text-xl font-bold text-accent">{investorType.label}</p>
          <p className="mt-1 text-sm leading-6">{investorType.description}</p>
        </div>

        <div className="mt-6 flex gap-2">
          <button
            type="button"
            onClick={handleSaveCard}
            className="flex-1 rounded-xl border border-border py-3 text-sm font-semibold text-muted transition hover:border-accent hover:text-accent"
          >
            {copied ? "링크가 복사됐어요" : "카드 저장"}
          </button>
          <button
            type="button"
            onClick={onContinue}
            className="flex-1 rounded-xl bg-accent py-3 text-sm font-semibold text-accent-foreground transition hover:brightness-110"
          >
            계속하기 →
          </button>
        </div>
      </div>
    </div>
  );
}
