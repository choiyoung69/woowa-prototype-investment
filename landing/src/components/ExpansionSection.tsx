const roadmap = [
  {
    step: "1차 확장",
    title: "경제 특화 뉴스 메인",
    summary: "매일 아침 투자자가 봐야 할 경제 뉴스만 골라 보여줍니다.",
    items: ["오늘의 핵심 뉴스 5개", "뉴스별 쉬운 요약", "관련 경제 키워드", "비슷한 과거 사건 연결"],
  },
  {
    step: "2차 확장",
    title: "퀴즈와 학습 루틴",
    summary: "뉴스를 읽고 끝내지 않고, 짧은 문제로 이해 여부를 확인합니다.",
    items: ["오늘의 투자 퀴즈", "환율·금리·실업률 개념 카드", "오답 복습", "연속 학습 보상"],
  },
  {
    step: "3차 확장",
    title: "커뮤니티와 판단 공유",
    summary: "같은 뉴스를 보고 다른 사람은 어떻게 판단했는지 비교합니다.",
    items: ["매수·매도·관망 투표", "판단 이유 공유", "초보자 질문", "전문가 코멘트"],
  },
  {
    step: "4차 확장",
    title: "실시간 모의투자와 랭킹",
    summary: "학습한 내용을 현재 시장에서 시험하고, 수익률보다 판단력을 경쟁합니다.",
    items: ["실시간 시세 기반 투자", "뉴스 반응 포트폴리오", "판단 정확도 랭킹", "복기 점수 리그"],
  },
];

const loops = [
  ["뉴스", "경제 특화 뉴스로 오늘 볼 이슈를 좁혀줍니다."],
  ["학습", "요약, 키워드, 퀴즈로 판단에 필요한 개념을 잡습니다."],
  ["판단", "과거 위기나 현재 시장에서 직접 선택합니다."],
  ["공유", "커뮤니티와 랭킹으로 다른 판단과 비교합니다."],
  ["복기", "실제 결과와 해설로 놓친 신호를 확인합니다."],
];

export function ExpansionSection() {
  return (
    <section className="border-b border-border bg-background">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-6">
        <p className="text-center text-sm font-black text-accent">확장 방향</p>
        <h2 className="mt-3 text-center text-3xl font-black leading-tight sm:text-4xl">
          IMF 체험에서 끝나는 게 아니라,
          <br />
          매일 들어오는 경제 앱으로 확장합니다
        </h2>
        <p className="mx-auto mt-4 max-w-2xl break-keep text-center text-base font-bold leading-7 text-muted">
          MVP로 판단 학습의 재미를 검증한 뒤, 경제 특화 뉴스 피드를 메인으로 두고 퀴즈, 커뮤니티,
          실시간 모의투자, 랭킹을 순차적으로 붙입니다.
        </p>

        <div className="mt-10 rounded-[16px] border border-border bg-surface p-5 shadow-sm">
          <p className="text-sm font-black text-muted">매일 반복되는 사용 흐름</p>
          <div className="mt-5 grid gap-3 md:grid-cols-5">
            {loops.map(([title, body], index) => (
              <div key={title} className="relative rounded-[12px] bg-background p-4">
                <p className="text-xs font-black text-accent">STEP {index + 1}</p>
                <h3 className="mt-2 text-lg font-black">{title}</h3>
                <p className="mt-2 break-keep text-sm font-bold leading-6 text-muted">{body}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {roadmap.map((item) => (
            <div key={item.step} className="rounded-[16px] border border-border bg-surface p-6 shadow-sm">
              <span className="rounded-full bg-[#e8f3ff] px-3 py-1.5 text-xs font-black text-accent">
                {item.step}
              </span>
              <h3 className="mt-4 text-2xl font-black">{item.title}</h3>
              <p className="mt-2 break-keep text-sm font-bold leading-6 text-muted">
                {item.summary}
              </p>
              <div className="mt-5 grid gap-2 sm:grid-cols-2">
                {item.items.map((feature) => (
                  <div key={feature} className="rounded-[10px] bg-background px-3 py-3 text-sm font-black">
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-[16px] bg-[#191f28] p-6 text-white">
          <p className="text-sm font-black text-white/60">랭킹은 수익률 경쟁이 아니라 판단력 경쟁</p>
          <h3 className="mt-3 text-2xl font-black">
            누가 돈을 제일 많이 벌었나보다, 누가 신호를 더 잘 읽었는지를 보여줍니다
          </h3>
          <p className="mt-3 break-keep text-sm font-bold leading-6 text-white/60">
            뉴스 확인률, 판단 이유 기록, 위험 신호 포착, 결과 복기까지 반영해 초보 투자자가
            꾸준히 배우고 다시 들어올 이유를 만듭니다.
          </p>
        </div>
      </div>
    </section>
  );
}
