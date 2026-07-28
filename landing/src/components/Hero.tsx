import Link from "next/link";

export function Hero() {
  return (
    <section className="overflow-hidden border-b border-border bg-surface">
      <div className="mx-auto flex max-w-6xl flex-col items-center px-5 pb-4 pt-10 text-center sm:px-6 sm:pt-8">
        <span className="rounded-[8px] bg-[#e8f3ff] px-3 py-1.5 text-sm font-bold text-accent">
          매일 학습하고, 직접 판단하고, 다시 복기하는 투자 학습
        </span>

        <h1 className="mt-5 max-w-4xl text-3xl font-bold leading-tight tracking-tight text-balance sm:mt-6 sm:text-5xl">
          경제 뉴스를 읽고도
          <br />
          어떻게 판단할지 모르겠다면
        </h1>

        <p className="mt-4 max-w-2xl text-base leading-7 text-muted sm:mt-5 sm:text-lg sm:leading-8">
          먼저 IMF 외환위기 속 세 가지 입장을 체험해요. 같은 사건이라도
          직장인, 취준생, 자영업자가 봐야 할 위험은 다릅니다. 결과보다 중요한 건
          왜 그렇게 판단했는지 기록하고 복기하는 과정입니다.
        </p>

        <div className="mt-6 flex flex-col items-center gap-3 sm:mt-9">
          <Link
            href="/scenarios"
            className="rounded-[12px] bg-accent px-8 py-4 text-base font-bold text-accent-foreground shadow-lg shadow-blue-500/20 transition hover:bg-[#1b64da]"
          >
            과거 위기 시나리오 체험하기
          </Link>
          <span className="text-xs text-muted">회원가입 없이 바로 시작해요</span>
        </div>

        <div className="mt-6 w-full max-w-4xl overflow-hidden rounded-[8px] border border-border bg-background text-left shadow-[0_24px_80px_rgba(49,130,246,0.14)]">
          <div className="border-b border-border bg-surface px-5 py-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold">1997.12.03 IMF 직전 뉴스</p>
                <p className="mt-1 text-xs text-muted">당시 공개된 정보만 보고 판단</p>
              </div>
              <span className="rounded-full bg-down/10 px-2.5 py-1 text-xs font-bold text-down">
                -7.8%
              </span>
            </div>
          </div>
          <div className="grid gap-0 md:grid-cols-[1.2fr_0.8fr]">
            <div className="p-4 sm:p-6">
              <p className="text-sm text-muted">KOSPI 가상 1좌 가격</p>
              <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">381,200원</p>
              <div className="mt-4 h-20 rounded-[8px] bg-surface p-3 sm:h-24 sm:p-4">
                <svg viewBox="0 0 520 140" className="h-full w-full" preserveAspectRatio="none">
                  <path d="M0 38 C70 28 110 54 170 50 C230 46 260 75 320 82 C385 90 420 108 520 116" fill="none" stroke="var(--down)" strokeWidth="4" strokeLinecap="round" />
                  <path d="M0 38 C70 28 110 54 170 50 C230 46 260 75 320 82 C385 90 420 108 520 116 L520 140 L0 140 Z" fill="rgba(240,68,82,0.08)" />
                </svg>
              </div>
            </div>
            <div className="hidden border-t border-border bg-surface p-5 md:block md:border-l md:border-t-0 sm:p-6">
              <p className="text-sm font-bold">오늘의 판단</p>
              <div className="mt-4 grid grid-cols-3 gap-2">
                <span className="rounded-[8px] bg-up/10 py-3 text-center text-sm font-bold text-up">매수</span>
                <span className="rounded-[8px] bg-down/10 py-3 text-center text-sm font-bold text-down">매도</span>
                <span className="rounded-[8px] bg-surface-2 py-3 text-center text-sm font-bold">관망</span>
              </div>
              <div className="mt-5 rounded-[8px] bg-background p-4">
                <p className="text-xs font-bold text-accent">판단 복기 포인트</p>
                <p className="mt-1 text-sm leading-6 text-muted">
                  무엇을 보고 샀는지, 무엇을 놓쳤는지 남겨두면 다음 뉴스와
                  경제 개념을 판단으로 연결할 수 있어요.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
