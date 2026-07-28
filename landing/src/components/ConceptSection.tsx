const concepts = [
  {
    tag: "MVP",
    title: "과거 경제 위기 회귀 학습",
    description:
      "먼저 IMF 외환위기 속으로 들어갑니다. 그날 공개된 뉴스와 지표만 보고 매수·매도·관망을 선택하고, 판단 이유를 남긴 뒤 실제 흐름으로 복기합니다.",
  },
  {
    tag: "확장 1",
    title: "매일 투자 학습",
    description:
      "오늘의 경제 뉴스, 투자 퀴즈, 경제 개념, 주요 시장 이슈를 짧게 학습합니다. 단순 요약이 아니라 오늘의 현상이 과거 어떤 위기 신호와 닮았는지 연결합니다.",
  },
  {
    tag: "확장 2",
    title: "실시간 모의투자",
    description:
      "실제 시장 시세 기반으로 부담 없이 투자해봅니다. 학습한 개념을 현재 시장에서 적용하며 매일 다시 들어올 이유를 만듭니다.",
  },
];

export function ConceptSection() {
  return (
    <section className="border-b border-border bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-6">
        <p className="text-center text-sm font-black text-accent">서비스의 핵심 흐름</p>
        <h2 className="mt-3 text-center text-3xl font-black leading-tight sm:text-4xl">
          매일 학습 → 실제 판단 → 결과 복기
        </h2>
        <p className="mx-auto mt-4 max-w-2xl break-keep text-center text-base font-bold leading-7 text-muted">
          세 기능을 한 번에 완성하기보다, 차별점이 가장 뚜렷한 과거 위기 체험으로 먼저 사용 의사를 검증합니다.
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {concepts.map((concept) => (
            <div
              key={concept.tag}
              className={`rounded-[14px] border p-6 ${
                concept.tag === "MVP"
                  ? "border-accent bg-[#e8f3ff]"
                  : "border-border bg-background"
              }`}
            >
              <span className="text-xs font-black text-accent">
                {concept.tag}
              </span>
              <h3 className="mt-3 text-xl font-black">{concept.title}</h3>
              <p className="mt-3 break-keep text-sm font-bold leading-6 text-muted">
                {concept.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-[14px] border border-border bg-background p-5">
          <p className="text-sm font-black text-muted">MVP에서 바로 체험하는 것</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-4">
            {["당시 뉴스 확인", "시장 상황 분석", "매수·매도·관망", "실제 결과 복기"].map((step, index) => (
              <div key={step} className="rounded-[12px] bg-surface p-4">
                <p className="text-sm font-black text-accent">{index + 1}</p>
                <p className="mt-2 text-sm font-black">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
