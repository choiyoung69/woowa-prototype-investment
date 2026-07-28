"use client";

import { useEffect, useState } from "react";
import type { TradeAction, TradeInput } from "@/lib/scenario-engine";
import { emotionTagsByAction } from "@/data/concepts";
import { ConceptPopover } from "./ConceptPopover";

const actionLabels: Record<TradeAction, string> = {
  buy: "매수",
  sell: "매도",
  hold: "관망",
};

const actionButtonClass: Record<TradeAction, string> = {
  buy: "bg-up/10 text-up hover:bg-up/15",
  sell: "bg-down/10 text-down hover:bg-down/15",
  hold: "bg-surface text-foreground ring-1 ring-border hover:bg-surface-2",
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
  const [openAction, setOpenAction] = useState<TradeAction | null>(null);

  return (
    <>
      <div className="grid grid-cols-3 gap-3">
        {(["buy", "sell", "hold"] as TradeAction[]).map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => setOpenAction(type)}
            className={`rounded-[8px] py-4 text-base font-bold transition ${actionButtonClass[type]}`}
          >
            {actionLabels[type]}
          </button>
        ))}
      </div>

      {openAction && (
        <TradeSheet
          action={openAction}
          cash={cash}
          positionValue={positionValue}
          onClose={() => setOpenAction(null)}
          onSubmit={(input) => {
            onSubmit(input);
            setOpenAction(null);
          }}
        />
      )}
    </>
  );
}

function TradeSheet({
  action,
  cash,
  positionValue,
  onClose,
  onSubmit,
}: {
  action: TradeAction;
  cash: number;
  positionValue: number;
  onClose: () => void;
  onSubmit: (input: TradeInput) => void;
}) {
  const [amount, setAmount] = useState("");
  const [tagId, setTagId] = useState<string | null>(null);
  const [reason, setReason] = useState("");

  useEffect(() => {
    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const maxAmount = action === "buy" ? cash : action === "sell" ? positionValue : 0;
  const amountKrw = Number(amount.replace(/[^0-9]/g, ""));
  const canConfirm = action === "hold" || amountKrw > 0;

  function handleConfirm() {
    if (!canConfirm) return;
    onSubmit({
      type: action,
      amountKrw: action === "hold" ? 0 : amountKrw,
      tag: tagId ?? undefined,
      reason: reason.trim() || undefined,
    });
  }

  return (
    <div className="fixed inset-0 z-20 flex items-end justify-center bg-black/35 backdrop-blur-sm sm:items-center">
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />

      <div className="relative w-full max-w-md rounded-t-[20px] border border-border bg-surface p-6 shadow-2xl sm:rounded-[16px]">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold">{actionLabels[action]}</h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1 text-muted hover:bg-surface-2 hover:text-foreground"
            aria-label="닫기"
          >
            ✕
          </button>
        </div>

        {action !== "hold" && (
          <div className="mt-5">
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
                className="w-full rounded-[8px] border border-border bg-background px-4 py-3 text-base focus:border-accent focus:outline-none"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setAmount(String(Math.floor(maxAmount)))}
                className="shrink-0 rounded-[8px] border border-border px-3 py-3 text-xs font-bold text-muted hover:border-accent hover:text-accent"
              >
                전액
              </button>
            </div>
          </div>
        )}

        <div className="mt-5">
          <label className="text-xs text-muted">
            이번 판단에 가까운 감정이 있다면 골라주세요 (선택)
          </label>
          <div className="mt-2 flex flex-wrap gap-2">
            {emotionTagsByAction[action].map((tag) => (
              <button
                key={tag.id}
                type="button"
                onClick={() => setTagId(tagId === tag.id ? null : tag.id)}
                className={`rounded-full border px-3 py-1.5 text-xs transition ${
                  tagId === tag.id
                    ? "border-accent bg-[#e8f3ff] text-accent"
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

        <div className="mt-5">
          <label className="text-xs text-muted">왜 그렇게 판단했나요? (선택)</label>
          <textarea
            value={reason}
            onChange={(event) => setReason(event.target.value)}
            rows={2}
            placeholder="예: 더 떨어질 것 같아서 무서웠어요"
            className="mt-1 w-full resize-none rounded-[8px] border border-border bg-background px-4 py-3 text-sm focus:border-accent focus:outline-none"
          />
        </div>

        <button
          type="button"
          onClick={handleConfirm}
          disabled={!canConfirm}
          className="mt-6 w-full rounded-[8px] bg-accent py-4 text-base font-bold text-accent-foreground transition hover:bg-[#1b64da] disabled:opacity-40"
        >
          {actionLabels[action]} 확정하고 다음 날로
        </button>
      </div>
    </div>
  );
}
