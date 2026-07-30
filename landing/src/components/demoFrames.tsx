export const demoFrames = [
  {
    label: "1. 뉴스 확인",
    step: "결과를 모른 채 그날 정보만 확인",
    content: (
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
    ),
  },
  {
    label: "2. 판단하기",
    step: "매수·매도·관망 중 하나 선택",
    content: (
      <div className="p-4 sm:p-6">
        <p className="text-sm font-black text-muted">매수·매도·관망 중 하나를 선택해요</p>
        <div className="mt-4 grid grid-cols-3 gap-2">
          <span className="rounded-[10px] border-2 border-accent bg-[#e8f3ff] py-4 text-center text-sm font-black text-accent">
            매수
          </span>
          <span className="rounded-[10px] bg-surface py-4 text-center text-sm font-black text-muted">
            매도
          </span>
          <span className="rounded-[10px] bg-surface py-4 text-center text-sm font-black text-muted">
            관망
          </span>
        </div>
        <div className="mt-5 rounded-[12px] bg-surface p-4">
          <p className="text-xs font-black text-muted">투자 금액</p>
          <p className="mt-2 text-2xl font-black">1,000,000원</p>
          <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-background">
            <div className="h-full w-2/5 rounded-full bg-accent" />
          </div>
        </div>
      </div>
    ),
  },
  {
    label: "3. 이유 남기기",
    step: "왜 그렇게 봤는지 짧게 기록",
    content: (
      <div className="p-4 sm:p-6">
        <p className="text-sm font-black text-muted">왜 그렇게 판단했나요?</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {["저점매수(확신)", "물타기", "불안한 매수"].map((tag, i) => (
            <span
              key={tag}
              className={`rounded-full px-3 py-1.5 text-xs font-black ${
                i === 0 ? "bg-accent text-accent-foreground" : "bg-surface text-muted"
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-4 rounded-[12px] bg-surface p-4">
          <p className="text-sm font-bold leading-6">
            &ldquo;환율은 불안하지만, 지금 낙폭이면 저가 매수 기회라고 판단했어요.&rdquo;
          </p>
        </div>
        <div className="mt-4 rounded-[10px] bg-[#e8f3ff] p-3">
          <p className="text-xs font-black text-accent">저점매수(확신)</p>
          <p className="mt-1 text-xs font-bold leading-5 text-muted">
            지금이 바닥이라 판단하고 계획적으로 사는 것.
          </p>
        </div>
      </div>
    ),
  },
  {
    label: "4. 결과로 복기",
    step: "내가 놓친 신호 확인",
    content: (
      <div className="p-4 sm:p-6 text-center">
        <p className="text-sm font-black text-muted">IMF 외환위기 결과</p>
        <p className="mt-2 text-5xl font-black text-down">-12.7%</p>
        <p className="mt-3 text-sm font-bold leading-6">
          당신은 이 시나리오에서{" "}
          <span className="font-black text-accent">FOMO 매수 1회</span>를 했어요.
        </p>
        <div className="mt-5 grid grid-cols-3 gap-2 text-xs font-black text-muted">
          <span className="rounded-[10px] bg-surface py-3">매수 2회</span>
          <span className="rounded-[10px] bg-surface py-3">매도 1회</span>
          <span className="rounded-[10px] bg-surface py-3">관망 1회</span>
        </div>
      </div>
    ),
  },
];
