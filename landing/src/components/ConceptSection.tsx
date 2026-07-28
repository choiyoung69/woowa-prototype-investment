const concepts = [
  {
    tag: "축 1",
    title: "과거로 돌아가는 체험",
    description:
      "IMF 외환위기, 코로나 폭락 같은 시점으로 이동해 하루 단위로 매매를 체험해요. 살 때마다, 팔 때마다 이유와 감정(패닉셀, 물타기, FOMO 등)을 기록합니다.",
  },
  {
    tag: "축 2",
    title: "매일 다시 찾아올 이유",
    description:
      "오늘 코스피가 왜 이렇게 움직였는지 3~5줄로 요약해드려요. “이번 주 금리 동결 → 2022년 금리인상기 시나리오 체험하기”처럼 오늘의 뉴스가 과거 시나리오로 이어집니다.",
  },
  {
    tag: "축 3",
    title: "체험과 지식의 순환",
    description:
      "방금 한 행동에 이름을 붙여드려요. 교과서식 설명이 아니라 “당신이 방금 한 행동”을 알려주는 경제 개념 카드로, 체험과 지식이 서로를 순환시킵니다.",
  },
];

export function ConceptSection() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-5xl px-6 py-20">
        <h2 className="text-center text-2xl font-bold sm:text-3xl">
          체험하고, 기록하고, 다시 이해한다
        </h2>
        <p className="mt-3 text-center text-sm text-muted sm:text-base">
          &ldquo;그날의 나에게&rdquo;를 지탱하는 세 가지 축이에요.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {concepts.map((concept) => (
            <div
              key={concept.tag}
              className="rounded-2xl border border-border bg-surface p-6"
            >
              <span className="text-xs font-semibold text-accent">
                {concept.tag}
              </span>
              <h3 className="mt-3 text-lg font-semibold">{concept.title}</h3>
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
