"use client";

import { useState } from "react";
import type { TradeAction, TradeInput } from "@/lib/scenario-engine";
import { emotionTagsByAction } from "@/data/concepts";
import { ConceptPopover } from "./ConceptPopover";

const actionLabels: Record<TradeAction, string> = {
  buy: "매수",
  sell: "매도",
  hold: "관망",
};

const actionActiveClass: Record<TradeAction, string> = {
  buy: "border-up bg-up/10 text-up",
  sell: "border-down bg-down/10 text-down",
  hold: "border-accent bg-accent/10 text-accent",
};

export function TradePanel({
  cash,
  positionValue,
  onSubmit,
}: {
  cash: number;
  positionValue: number;
  onSubmit: (input: TradeInput) => void;
}) {
  const [action, setAction] = useState<TradeAction | null>(null);
  const [amount, setAmount] = useState("");
  const [tagId, setTagId] = useState<string | null>(null);
  const [reason, setReason] = useState("");

  function reset() {
    setAction(null);
    setAmount("");
    setTagId(null);
    setReason("");
  }

  function handleSelectAction(next: TradeAction) {
    setAction(next);
    setAmount("");
    setTagId(null);
    setReason("");
  }

  function handleConfirm() {
    if (!action) return;
    if (action !== "hold" && !tagId) return;

    const amountKrw =
      action === "hold" ? 0 : Number(amount.replace(/[^0-9]/g, ""));
    if (action !== "hold" && (!amountKrw || amountKrw <= 0)) return;

    onSubmit({
      type: action,
      amountKrw,
      tag: tagId ?? undefined,
      reason: reason.trim() || undefined,
    });
    reset();
  }

  const maxAmount = action === "buy" ? cash : action === "sell" ? positionValue : 0;
  const canConfirm = action === "hold" || (Boolean(tagId) && Boolean(amount));

  return (
    <div className="rounded-2xl border border-border bg-surface p-5">
      <div className="grid grid-cols-3 gap-2">
        {(["buy", "sell", "hold"] as TradeAction[]).map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => handleSelectAction(type)}
            className={`rounded-lg border px-4 py-3 text-sm font-semibold transition ${
              action === type
                ? actionActiveClass[type]
                : "border-border text-muted hover:border-foreground/30"
            }`}
          >
            {actionLabels[type]}
          </button>
        ))}
      </div>

      {action && action !== "hold" && (
        <div className="mt-4 space-y-3">
          <div>
            <label className="text-xs text-muted">
              {action === "buy" ? "투자 금액" : "매도 금액"} (최대{" "}
              {Math.floor(maxAmount).toLocaleString()}원)
            </label>
            <div className="mt-1 flex gap-2">
              <input
                type="text"
                inputMode="numeric"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                placeholder="금액 입력 (원)"
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-accent focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setAmount(String(Math.floor(maxAmount)))}
                className="shrink-0 rounded-lg border border-border px-3 py-2 text-xs text-muted hover:border-accent hover:text-accent"
              >
                전액
              </button>
            </div>
          </div>

          <div>
            <label className="text-xs text-muted">이번 판단에 가까운 감정을 골라주세요</label>
            <div className="mt-2 flex flex-wrap gap-2">
              {emotionTagsByAction[action].map((tag) => (
                <button
                  key={tag.id}
                  type="button"
                  onClick={() => setTagId(tag.id)}
                  className={`rounded-full border px-3 py-1.5 text-xs transition ${
                    tagId === tag.id
                      ? "border-accent bg-accent/10 text-accent"
                      : "border-border text-muted hover:border-foreground/30"
                  }`}
                >
                  {tag.label}
                </button>
              ))}
            </div>
            {tagId && (
              <div className="mt-2">
                <ConceptPopover tagId={tagId} />
              </div>
            )}
          </div>

          <div>
            <label className="text-xs text-muted">왜 그렇게 판단했나요? (선택)</label>
            <textarea
              value={reason}
              onChange={(event) => setReason(event.target.value)}
              rows={2}
              placeholder="예: 더 떨어질 것 같아서 무서웠어요"
              className="mt-1 w-full resize-none rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-accent focus:outline-none"
            />
          </div>

          <button
            type="button"
            onClick={handleConfirm}
            disabled={!canConfirm}
            className="w-full rounded-lg bg-accent px-4 py-3 text-sm font-semibold text-accent-foreground transition hover:brightness-110 disabled:opacity-40"
          >
            {actionLabels[action]} 확정하고 다음 날로
          </button>
        </div>
      )}

      {action === "hold" && (
        <div className="mt-4 space-y-3">
          <div>
            <label className="text-xs text-muted">지금 기분은 어떤가요? (선택)</label>
            <div className="mt-2 flex flex-wrap gap-2">
              {emotionTagsByAction.hold.map((tag) => (
                <button
                  key={tag.id}
                  type="button"
                  onClick={() => setTagId(tag.id)}
                  className={`rounded-full border px-3 py-1.5 text-xs transition ${
                    tagId === tag.id
                      ? "border-accent bg-accent/10 text-accent"
                      : "border-border text-muted hover:border-foreground/30"
                  }`}
                >
                  {tag.label}
                </button>
              ))}
            </div>
            {tagId && (
              <div className="mt-2">
                <ConceptPopover tagId={tagId} />
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={handleConfirm}
            className="w-full rounded-lg border border-accent px-4 py-3 text-sm font-semibold text-accent transition hover:bg-accent/10"
          >
            관망하고 다음 날로
          </button>
        </div>
      )}
    </div>
  );
}
