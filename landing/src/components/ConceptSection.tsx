const laterFeatures = ["경제 뉴스", "퀴즈", "커뮤니티", "실시간 투자", "랭킹"];

export function ConceptSection() {
  return (
    <section className="border-b border-border bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-6">
        <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[18px] border border-accent bg-[#e8f3ff] p-6 sm:p-8">
            <p className="text-sm font-black text-accent">지금 검증하는 핵심</p>
            <h2 className="mt-3 break-keep text-3xl font-black leading-tight sm:text-5xl">
              과거 위기 속에서
              <br />
              직접 판단한다
            </h2>
            <p className="mt-4 max-w-xl break-keep text-base font-black leading-7 text-[#1b64da]">
              IMF 외환위기 당시 정보만 보고 매수·매도·관망을 선택합니다.
            </p>
          </div>

          <div className="rounded-[18px] border border-border bg-background p-6 sm:p-8">
            <p className="text-sm font-black text-muted">나중에 붙일 기능</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {laterFeatures.map((feature) => (
                <span
                  key={feature}
                  className="rounded-full bg-surface px-4 py-2 text-sm font-black"
                >
                  {feature}
                </span>
              ))}
            </div>
            <p className="mt-5 break-keep text-sm font-bold leading-6 text-muted">
              먼저 판단 학습이 재방문으로 이어지는지 확인한 뒤 확장합니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
