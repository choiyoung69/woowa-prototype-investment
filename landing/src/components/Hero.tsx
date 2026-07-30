import Link from "next/link";
import { HeroLiveDemo } from "./HeroLiveDemo";

export function Hero() {
  return (
    <section className="overflow-hidden border-b border-border bg-surface">
      <div className="mx-auto flex max-w-6xl flex-col items-center px-5 pb-8 pt-10 text-center sm:px-6 sm:pt-12">
        <span className="rounded-full bg-[#e8f3ff] px-4 py-2 text-sm font-black text-accent">
          뉴스만 읽고 끝났던 투자 공부를 판단 연습으로
        </span>

        <h1 className="mt-5 max-w-5xl text-4xl font-black leading-tight tracking-tight text-balance sm:mt-6 sm:text-6xl">
          “IMF 때 샀으면?”
          <br />
          이제 직접 판단해보세요
        </h1>

        <p className="mt-4 max-w-3xl break-keep text-base font-bold leading-7 text-muted sm:mt-5 sm:text-xl sm:leading-9">
          1997년으로 돌아가 당시 공개된 뉴스와 지표만 보고 매수·매도·관망을 선택합니다.
          중요한 건 수익률 자랑이 아니라, 내가 무엇을 보고 판단했고 무엇을 놓쳤는지 복기하는 것입니다.
        </p>

        <div className="mt-6 flex flex-col items-center gap-3 sm:mt-8 sm:flex-row">
          <Link
            href="/scenarios"
            className="rounded-[12px] bg-accent px-8 py-4 text-base font-black text-accent-foreground shadow-lg shadow-blue-500/20 transition hover:bg-[#1b64da]"
          >
            IMF 직전으로 돌아가기
          </Link>
          <Link
            href="#validation"
            className="rounded-[12px] bg-[#e8f3ff] px-8 py-4 text-base font-black text-accent transition hover:bg-[#d6eaff]"
          >
            왜 만들었는지 보기
          </Link>
        </div>
        <span className="mt-3 text-xs font-bold text-muted">
          회원가입 없이 MVP 바로 체험 · PC와 모바일 모두에서 확인할 수 있어요
        </span>

        <div className="mt-10 w-full max-w-3xl">
          <HeroLiveDemo />
        </div>
      </div>
    </section>
  );
}
