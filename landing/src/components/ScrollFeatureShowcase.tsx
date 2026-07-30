"use client";

import { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { demoFrames as frames } from "./demoFrames";

function progressToIndex(progress: number) {
  return Math.min(frames.length - 1, Math.max(0, Math.floor(progress * frames.length)));
}

export function ScrollFeatureShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // useMotionValueEvent only fires on scroll, so if the page loads (or a
  // hash link jumps straight) into the middle of this section, the frame
  // shown would stay stuck at index 0 until the next scroll tick. Sync
  // once after mount against whatever the scroll position already is.
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setActive(progressToIndex(scrollYProgress.get()));
    });
    return () => cancelAnimationFrame(frame);
  }, [scrollYProgress]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setActive(progressToIndex(latest));
  });

  return (
    <section className="border-b border-border bg-background">
      <div ref={containerRef} style={{ height: `${frames.length * 100}vh` }} className="relative">
        <div className="sticky top-0 flex min-h-screen items-center overflow-hidden py-16">
          <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 sm:px-6 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="rounded-full bg-[#e8f3ff] px-4 py-2 text-sm font-black text-accent">
                이렇게 진행돼요
              </span>
              <h2 className="mt-5 break-keep text-3xl font-black leading-tight sm:text-4xl">
                스크롤하면서
                <br />
                하루의 흐름을 따라가보세요
              </h2>

              <div className="mt-8 space-y-3">
                {frames.map((frame, index) => (
                  <div
                    key={frame.label}
                    className={`rounded-[14px] border p-4 transition-all duration-300 ${
                      index === active
                        ? "border-accent bg-[#e8f3ff]"
                        : "border-border bg-surface opacity-50"
                    }`}
                  >
                    <p
                      className={`text-base font-black ${index === active ? "text-accent" : ""}`}
                    >
                      {frame.label}
                    </p>
                    <p className="mt-1 text-sm font-bold text-muted">{frame.step}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="overflow-hidden rounded-[14px] border border-border bg-surface shadow-[0_24px_80px_rgba(49,130,246,0.14)]">
              <div className="flex items-center justify-between gap-3 border-b border-border bg-background px-5 py-3">
                <p className="text-xs font-black text-muted">DAY 1 · IMF 외환위기</p>
                <span className="text-xs font-black text-accent">{active + 1} / {frames.length}</span>
              </div>
              <div className="relative min-h-[380px]">
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
