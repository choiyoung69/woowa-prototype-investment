const concepts = [
  {
    tag: "축 1",
    title: "실시간 모의투자",
    description:
      "실제 시장 시세를 기반으로 부담 없이 투자 경험을 쌓아요. 시장이 열리는 매일 다시 방문할 이유를 만들고, 학습한 내용을 현재 시장에서 시험해볼 수 있게 확장합니다.",
  },
  {
    tag: "축 2",
    title: "매일 투자 학습",
    description:
      "오늘의 경제 뉴스 요약, 투자 퀴즈, 경제 개념, 주요 시장 이슈를 짧게 제공합니다. 왜 이런 일이 생겼는지, 과거 어떤 사례와 비슷한지 함께 보여줍니다.",
  },
  {
    tag: "축 3",
    title: "과거 위기 회귀 학습",
    description:
      "먼저 IMF 외환위기를 직장인, 취준생, 자영업자 입장으로 나눠 체험합니다. 같은 뉴스도 각자의 현금흐름과 위험에 따라 다르게 해석해봅니다.",
  },
];

export function ConceptSection() {
  return (
    <section className="border-b border-border bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-6">
        <h2 className="text-center text-3xl font-bold sm:text-4xl">
          매일 학습에서 실제 판단까지 이어지도록
        </h2>
        <p className="mt-4 text-center text-base text-muted">
          전체 서비스는 세 가지 축으로 확장되고, 초기 MVP는 과거 위기 회귀 학습으로 검증합니다.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {concepts.map((concept) => (
            <div
              key={concept.tag}
              className="rounded-[8px] bg-background p-6"
            >
              <span className="text-xs font-bold text-accent">
                {concept.tag}
              </span>
              <h3 className="mt-3 text-xl font-bold">{concept.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted">
                {concept.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
