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

        <div className="mt-8 grid w-full max-w-5xl gap-4 text-left md:grid-cols-[1.2fr_0.8fr]">
          <HeroLiveDemo />

          <div className="rounded-[14px] border border-border bg-surface p-5 shadow-[0_24px_80px_rgba(49,130,246,0.08)]">
            <p className="text-sm font-black text-muted">오늘 해야 할 일</p>
            <div className="mt-5 space-y-3">
              {[
                ["1", "뉴스 읽기", "결과를 모른 채 그날 정보만 확인"],
                ["2", "판단하기", "매수·매도·관망 중 하나 선택"],
                ["3", "이유 남기기", "왜 그렇게 봤는지 짧게 기록"],
                ["4", "결과로 복기", "내가 놓친 신호 확인"],
              ].map(([step, title, body]) => (
                <div key={step} className="flex gap-3 rounded-[12px] bg-background p-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-black text-accent-foreground">
                    {step}
                  </span>
                  <div>
                    <p className="font-black">{title}</p>
                    <p className="mt-1 text-sm font-bold text-muted">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-5 grid w-full max-w-5xl gap-3 text-left sm:grid-cols-3">
          {[
            ["인터뷰 10명", "정보는 보는데 판단으로 연결하지 못한다는 문제 확인"],
            ["콘시어지 MVP", "카카오톡으로 하루치 시나리오를 보내 직접 판단 유도"],
            ["현재 검증 중", "프로토타입으로 며칠 이상 지속 사용되는지 실험"],
          ].map(([title, body]) => (
            <div key={title} className="rounded-[12px] bg-background p-4">
              <p className="text-base font-black">{title}</p>
              <p className="mt-2 break-keep text-sm font-bold leading-6 text-muted">{body}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
