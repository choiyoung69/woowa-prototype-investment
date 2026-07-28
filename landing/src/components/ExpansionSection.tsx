const phases = [
  {
    no: "01",
    title: "경제 뉴스 메인",
    copy: "매일 투자자가 봐야 할 경제 뉴스만 선별",
    chips: ["핵심 뉴스", "쉬운 요약", "키워드", "과거 사례"],
  },
  {
    no: "02",
    title: "퀴즈·학습",
    copy: "읽은 뉴스를 바로 이해했는지 짧게 확인",
    chips: ["오늘의 퀴즈", "개념 카드", "오답 복습", "연속 학습"],
  },
  {
    no: "03",
    title: "커뮤니티",
    copy: "같은 뉴스를 보고 다른 사람의 판단과 비교",
    chips: ["투표", "판단 이유", "질문", "코멘트"],
  },
  {
    no: "04",
    title: "실시간 투자·랭킹",
    copy: "현재 시장에서 시험하고 판단력으로 경쟁",
    chips: ["실시간 시세", "포트폴리오", "판단 랭킹", "복기 점수"],
  },
];

const loop = ["뉴스", "학습", "판단", "공유", "복기"];

export function ExpansionSection() {
  return (
    <section className="border-b border-border bg-background">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[18px] bg-[#191f28] p-6 text-white sm:p-8">
            <p className="text-sm font-black text-white/60">확장 방향</p>
            <h2 className="mt-4 break-keep text-3xl font-black leading-tight sm:text-4xl">
              IMF 체험 다음은
              <br />
              매일 보는 경제 앱
            </h2>
            <p className="mt-4 break-keep text-base font-bold leading-7 text-white/60">
              메인은 경제 특화 뉴스입니다. 뉴스에서 퀴즈와 판단으로 넘어가고,
              커뮤니티와 랭킹으로 다시 들어올 이유를 만듭니다.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-2">
              {loop.map((item, index) => (
                <div key={item} className="flex items-center gap-2">
                  <span className="rounded-full bg-white px-4 py-2 text-sm font-black text-[#191f28]">
                    {item}
                  </span>
                  {index < loop.length - 1 && <span className="text-white/35">→</span>}
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {phases.map((phase) => (
              <div key={phase.no} className="rounded-[16px] border border-border bg-surface p-5 shadow-sm">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-black text-accent">{phase.no}</span>
                  <span className="rounded-full bg-[#e8f3ff] px-3 py-1 text-xs font-black text-accent">
                    확장
                  </span>
                </div>
                <h3 className="mt-4 text-2xl font-black">{phase.title}</h3>
                <p className="mt-2 break-keep text-sm font-bold leading-6 text-muted">{phase.copy}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {phase.chips.map((chip) => (
                    <span key={chip} className="rounded-[8px] bg-background px-3 py-2 text-xs font-black">
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 rounded-[14px] border border-[#d6eaff] bg-[#e8f3ff] p-5">
          <p className="break-keep text-center text-base font-black leading-7 text-accent">
            랭킹은 수익률 경쟁이 아니라 판단력 경쟁입니다. 뉴스 확인, 이유 기록, 위험 신호 포착,
            결과 복기까지 점수화합니다.
          </p>
        </div>
      </div>
    </section>
  );
}
