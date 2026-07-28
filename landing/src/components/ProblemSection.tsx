const problems = [
  {
    label: "모의투자 앱",
    points: [
      "현재 시장 매매와 수익률 경쟁에 집중",
      "정보를 어떻게 해석했는지 남기기 어려움",
      "손익은 보이지만 판단 과정은 흐려짐",
    ],
  },
  {
    label: "경제 뉴스·퀴즈 서비스",
    points: [
      "경제를 쉽게 접하게 해주지만 읽는 경험에 머무름",
      "정보를 실제 투자 판단으로 연결하는 연습이 부족함",
      "스스로 선택하고 결과를 복기하는 흐름이 약함",
    ],
  },
];

export function ProblemSection() {
  return (
    <section className="border-b border-border bg-background">
      <div className="mx-auto max-w-5xl px-5 py-12 sm:px-6 sm:py-10">
        <h2 className="text-center text-3xl font-bold sm:text-4xl">
          문제는 지식 부족보다 판단으로 연결되지 않는다는 것
        </h2>
        <p className="mt-4 text-center text-base text-muted">
          인터뷰에서는 “뉴스를 봐도 결국 투자로 연결을 못 한다”는 응답이 반복됐습니다.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {problems.map((problem) => (
            <div
              key={problem.label}
              className="rounded-[8px] border border-border bg-surface p-6 shadow-sm"
            >
              <h3 className="text-base font-bold">
                {problem.label}
              </h3>
              <ul className="mt-4 space-y-3">
                {problem.points.map((point) => (
                  <li key={point} className="flex gap-2 text-sm leading-6 text-muted">
                    <span className="mt-1 text-down">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-xl text-center text-base leading-7 text-muted">
          그래서 단순 요약보다{" "}
          <span className="text-foreground">정보를 보고 선택하고, 선택한 이유를 복기하는 경험</span>을
          먼저 검증합니다.
        </p>
      </div>
    </section>
  );
}
