const problems = [
  {
    label: "모의투자는 돈 게임이 되기 쉽습니다",
    points: [
      "현재 시장 매매와 수익률 경쟁에 집중합니다",
      "왜 샀는지, 무엇을 보고 팔았는지 남기기 어렵습니다",
      "손익은 보이지만 판단 습관은 잘 보이지 않습니다",
    ],
  },
  {
    label: "뉴스와 퀴즈는 읽고 맞히는 데서 멈춥니다",
    points: [
      "경제를 쉽게 접하게 해주지만 행동으로 이어지기 어렵습니다",
      "이 뉴스가 내 투자 판단에 어떤 의미인지 연습하기 어렵습니다",
      "스스로 선택하고 결과를 복기하는 경험이 부족합니다",
    ],
  },
];

export function ProblemSection() {
  return (
    <section id="validation" className="scroll-mt-20 border-b border-border bg-background">
      <div className="mx-auto max-w-5xl px-5 py-12 sm:px-6 sm:py-10">
        <p className="text-center text-sm font-black text-accent">타겟 인터뷰에서 반복된 말</p>
        <h2 className="mt-3 text-center text-3xl font-black leading-tight sm:text-4xl">
          “뉴스를 봐도
          <br className="sm:hidden" /> 결국 투자로 연결을 못 하겠어요”
        </h2>
        <p className="mx-auto mt-4 max-w-2xl break-keep text-center text-base font-bold leading-7 text-muted">
          주식에 관심은 있지만 꾸준히 공부하지 않는 2030에게 문제는 경제 지식 자체보다,
          정보를 보고 어떤 판단을 내려야 하는지 모른다는 점이었습니다.
        </p>

        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          {[
            ["10명", "주식 관심자 개별 인터뷰"],
            ["핵심 문제", "정보를 판단으로 연결하지 못함"],
            ["반응 전환", "직접 판단하는 학습으로 설명하자 긍정 반응"],
          ].map(([value, label]) => (
            <div key={value} className="rounded-[12px] bg-surface p-5 text-center shadow-sm">
              <p className="text-3xl font-black text-accent">{value}</p>
              <p className="mt-2 break-keep text-sm font-bold text-muted">{label}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {problems.map((problem) => (
            <div
              key={problem.label}
              className="rounded-[12px] border border-border bg-surface p-6 shadow-sm"
            >
              <h3 className="text-lg font-black">
                {problem.label}
              </h3>
              <ul className="mt-4 space-y-3">
                {problem.points.map((point) => (
                  <li key={point} className="flex gap-2 text-sm font-bold leading-6 text-muted">
                    <span className="mt-1 text-down">×</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-8 max-w-2xl rounded-[12px] bg-[#e8f3ff] p-5 text-center text-base font-black leading-7 text-accent">
          그래서 MVP는 요약 서비스가 아니라, 정보를 보고 선택하고 이유를 남긴 뒤 실제 결과로 복기하는 경험부터 검증합니다.
        </p>
      </div>
    </section>
  );
}
