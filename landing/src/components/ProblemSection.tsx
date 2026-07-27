const problems = [
  {
    label: "모의투자 앱",
    points: [
      "실시간 시세 + 가상 매매에만 집중",
      "가상 자금이라 손실이 아프지 않음",
      "“왜 그런 판단을 했는지” 기록하는 장치가 없음",
    ],
  },
  {
    label: "경제 뉴스레터",
    points: [
      "읽는 콘텐츠로만 머무름",
      "직접 체험하며 체득하는 행동 레이어 없음",
      "필요한 지식만 원해도 정보가 산만함",
    ],
  },
];

export function ProblemSection() {
  return (
    <section className="border-b border-border bg-surface/40">
      <div className="mx-auto max-w-4xl px-6 py-20">
        <h2 className="text-center text-2xl font-bold sm:text-3xl">
          매매를 반복해도 실력이 느는 느낌이 없었다면
        </h2>
        <p className="mt-3 text-center text-sm text-muted sm:text-base">
          기존 모의투자 앱과 경제 뉴스레터, 둘 다 아쉬운 지점이 있었습니다.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {problems.map((problem) => (
            <div
              key={problem.label}
              className="rounded-2xl border border-border bg-surface p-6"
            >
              <h3 className="text-sm font-semibold text-muted">
                {problem.label}
              </h3>
              <ul className="mt-4 space-y-3">
                {problem.points.map((point) => (
                  <li key={point} className="flex gap-2 text-sm leading-6">
                    <span className="mt-1 text-down">·</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-xl text-center text-sm leading-7 text-muted">
          결과를 아는 과거를, 모르는 척 다시 겪어보며{" "}
          <span className="text-foreground">기록하고 복기한다</span> — 그
          사이의 빈틈을 채우려 합니다.
        </p>
      </div>
    </section>
  );
}
