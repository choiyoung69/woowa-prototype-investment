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
  const learningKeywords = scenario.knowledge?.keywords ?? [];
  const currentParallel = scenario.knowledge?.currentParallels[0];

  return (
    <div className="mx-auto max-w-2xl px-5 py-16 sm:px-6">
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

      {learningKeywords.length > 0 && (
        <div className="mt-10">
          <div className="flex items-end justify-between gap-4 px-1">
            <div>
              <p className="text-sm font-black text-accent">키워드 복기</p>
              <h3 className="mt-1 text-2xl font-black">오늘 배운 경제 신호</h3>
            </div>
            <span className="shrink-0 rounded-full bg-[#e8f3ff] px-3 py-1.5 text-xs font-black text-accent">
              {learningKeywords.length}개
            </span>
          </div>

          <div className="mt-4 grid gap-3">
            {learningKeywords.map((keyword) => (
              <div
                key={keyword.term}
                className="rounded-[14px] border border-border bg-surface p-4 shadow-sm"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-[#e8f3ff] px-3 py-1.5 text-sm font-black text-accent">
                    {keyword.term}
                  </span>
                  <span className="text-sm font-black text-foreground">{keyword.meaning}</span>
                </div>
                {keyword.detail && (
                  <p className="mt-3 text-sm font-bold leading-6 text-muted">
                    {keyword.detail}
                  </p>
                )}
                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  {keyword.pastSignal && (
                    <div className="rounded-[10px] bg-background p-3">
                      <p className="text-[11px] font-black text-muted">IMF 때</p>
                      <p className="mt-1 text-sm font-bold leading-5">{keyword.pastSignal}</p>
                    </div>
                  )}
                  {keyword.todaySignal && (
                    <div className="rounded-[10px] bg-[#f2f8ff] p-3">
                      <p className="text-[11px] font-black text-accent">요즘 비슷한 점</p>
                      <p className="mt-1 text-sm font-bold leading-5">{keyword.todaySignal}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {currentParallel && (
            <a
              href={currentParallel.href}
              target="_blank"
              rel="noreferrer"
              className="mt-4 block rounded-[14px] bg-[#191f28] p-5 text-white shadow-sm transition hover:bg-[#2b313b]"
            >
              <p className="text-xs font-black text-white/55">요즘 뉴스로 연결</p>
              <p className="mt-2 text-lg font-black">{currentParallel.title}</p>
              <p className="mt-2 text-sm font-bold leading-6 text-white/65">
                {currentParallel.summary}
              </p>
              <div className="mt-4 flex items-center justify-between gap-3">
                <span className="min-w-0 truncate text-xs font-bold text-white/50">
                  {currentParallel.source}
                </span>
                <span className="shrink-0 rounded-full bg-white px-3 py-1.5 text-xs font-black text-[#191f28]">
                  뉴스 보기
                </span>
              </div>
            </a>
          )}
        </div>
      )}

      <div className="mt-10 overflow-hidden rounded-[8px] border border-border bg-surface shadow-sm">
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
          className="rounded-[8px] bg-accent px-5 py-3 text-sm font-bold text-accent-foreground transition hover:bg-[#1b64da]"
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
