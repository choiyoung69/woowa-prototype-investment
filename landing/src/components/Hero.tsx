import Link from "next/link";

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
        <span className="mt-3 text-xs font-bold text-muted">회원가입 없이 MVP 바로 체험</span>

        <div className="mt-8 grid w-full max-w-5xl gap-4 text-left md:grid-cols-[1.2fr_0.8fr]">
          <div className="overflow-hidden rounded-[14px] border border-border bg-background shadow-[0_24px_80px_rgba(49,130,246,0.14)]">
            <div className="border-b border-border bg-surface px-5 py-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-black">DAY 1 · 1997년 11월 19일</p>
                  <p className="mt-1 text-xs font-bold text-muted">IMF 구제금융 요청 2일 전</p>
                </div>
                <span className="rounded-full bg-down/10 px-2.5 py-1 text-xs font-black text-down">
                  KOSPI -4.34%
                </span>
              </div>
            </div>
            <div className="p-4 sm:p-6">
              <p className="text-sm font-black text-muted">당시 공개된 정보</p>
              <div className="mt-3 grid gap-2 sm:grid-cols-3">
                {["한보그룹 부도", "환율 급등", "외국인 순매도"].map((item) => (
                  <span
                    key={item}
                    className="rounded-[10px] bg-surface px-3 py-3 text-center text-sm font-black"
                  >
                    {item}
                  </span>
                ))}
              </div>
              <div className="mt-5 rounded-[12px] bg-surface p-4">
                <div className="flex flex-wrap items-end gap-3">
                  <div>
                    <p className="text-sm font-black text-muted">코스피 KOSPI</p>
                    <p className="mt-1 text-4xl font-black tracking-tight">689.12</p>
                  </div>
                  <p className="pb-1 text-lg font-black text-down">-31.29 (-4.34%)</p>
                </div>
                <div className="mt-4 h-32 rounded-[10px] bg-background p-3">
                  <svg viewBox="0 0 640 180" className="h-full w-full" preserveAspectRatio="none">
                    <path
                      d="M0 44 L30 22 L60 55 L90 82 L120 50 L150 93 L180 118 L210 72 L240 102 L270 150 L300 118 L330 86 L360 126 L390 154 L420 106 L450 138 L480 160 L510 126 L540 146 L570 170 L600 138 L640 112"
                      fill="none"
                      stroke="var(--down)"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M0 44 L30 22 L60 55 L90 82 L120 50 L150 93 L180 118 L210 72 L240 102 L270 150 L300 118 L330 86 L360 126 L390 154 L420 106 L450 138 L480 160 L510 126 L540 146 L570 170 L600 138 L640 112 L640 180 L0 180 Z"
                      fill="rgba(240,68,82,0.10)"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[14px] border border-border bg-[#191f28] p-5 text-white shadow-[0_24px_80px_rgba(25,31,40,0.18)]">
            <p className="text-sm font-black text-white/60">오늘 해야 할 일</p>
            <div className="mt-5 space-y-3">
              {[
                ["1", "뉴스 읽기", "결과를 모른 채 그날 정보만 확인"],
                ["2", "판단하기", "매수·매도·관망 중 하나 선택"],
                ["3", "이유 남기기", "왜 그렇게 봤는지 짧게 기록"],
                ["4", "결과로 복기", "내가 놓친 신호 확인"],
              ].map(([step, title, body]) => (
                <div key={step} className="flex gap-3 rounded-[12px] bg-white/10 p-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-sm font-black text-[#191f28]">
                    {step}
                  </span>
                  <div>
                    <p className="font-black">{title}</p>
                    <p className="mt-1 text-sm font-bold text-white/60">{body}</p>
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
