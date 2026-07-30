"use client";

import { useEffect, useState } from "react";
import { demoFrames as frames } from "./demoFrames";

const STEP_MS = 3200;

export function HeroLiveDemo() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % frames.length);
    }, STEP_MS);
    return () => clearInterval(timer);
  }, [paused]);

  return (
    <div className="overflow-hidden rounded-[14px] border border-border bg-background shadow-[0_24px_80px_rgba(49,130,246,0.14)]">
      <div className="flex items-center justify-between gap-3 border-b border-border bg-surface px-5 py-4">
        <div>
          <p className="text-sm font-black">DAY 1 · 1997년 11월 19일</p>
          <p className="mt-1 text-xs font-bold text-muted">IMF 구제금융 요청 2일 전</p>
        </div>
        <span className="rounded-full bg-[#e8f3ff] px-2.5 py-1 text-xs font-black text-accent">
          {frames[active].label}
        </span>
      </div>

      <div className="relative min-h-[360px] sm:min-h-[380px]">
        {frames.map((frame, index) => (
          <div
            key={frame.label}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === active ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
            aria-hidden={index !== active}
          >
            {frame.content}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-3 border-t border-border bg-surface px-5 py-3">
        <button
          type="button"
          onClick={() => setPaused((prev) => !prev)}
          className="text-xs font-black text-muted transition hover:text-accent"
          aria-label={paused ? "자동 재생 시작" : "자동 재생 멈춤"}
        >
          {paused ? "▶" : "❚❚"}
        </button>
        <div className="flex items-center gap-1.5">
          {frames.map((frame, index) => (
            <button
              key={frame.label}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`${frame.label} 보기`}
              className={`h-1.5 rounded-full transition-all ${
                index === active ? "w-5 bg-accent" : "w-1.5 bg-border"
              }`}
            />
          ))}
        </div>
        <span className="text-xs font-bold text-muted">자동 시연 중</span>
      </div>
    </div>
  );
}
