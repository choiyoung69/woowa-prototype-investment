type Cell = boolean | "partial";

const rows: { label: string; app: Cell; newsletter: Cell; us: Cell }[] = [
  { label: "뉴스를 투자 판단으로 연결", app: "partial", newsletter: "partial", us: true },
  { label: "과거 실제 위기 속으로 회귀", app: false, newsletter: false, us: true },
  { label: "매수·매도·관망 선택", app: true, newsletter: false, us: true },
  { label: "판단 이유 기록", app: false, newsletter: false, us: true },
  { label: "실제 결과 기반 복기", app: false, newsletter: "partial", us: true },
  { label: "현재 뉴스와 과거 신호 연결", app: false, newsletter: "partial", us: true },
];

function CellIcon({ value }: { value: Cell }) {
  if (value === true) {
    return <span className="text-up">✓</span>;
  }
  if (value === "partial") {
    return <span className="text-accent">△</span>;
  }
  return <span className="text-muted">–</span>;
}

export function ComparisonSection() {
  return (
    <section className="border-b border-border bg-background">
      <div className="mx-auto max-w-4xl px-5 py-16 sm:px-6">
        <p className="text-center text-sm font-black text-accent">차별점</p>
        <h2 className="mt-3 text-center text-3xl font-black leading-tight sm:text-4xl">
          읽는 서비스가 아니라
          <br />
          판단하게 만드는 서비스
        </h2>
        <p className="mx-auto mt-4 max-w-2xl break-keep text-center text-base font-bold leading-7 text-muted">
          기존 서비스가 뉴스, 퀴즈, 모의투자를 따로 제공했다면 이 서비스는 하나의 시나리오 안에서 학습과 선택, 복기를 연결합니다.
        </p>

        <div className="mt-10 overflow-x-auto rounded-[12px] border border-border bg-surface shadow-sm">
          <table className="w-full min-w-[480px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-border bg-surface-2 text-left">
                <th className="px-4 py-3 font-black text-muted">항목</th>
                <th className="px-4 py-3 text-center font-black text-muted">
                  모의투자 앱
                </th>
                <th className="px-4 py-3 text-center font-black text-muted">
                  뉴스·퀴즈 서비스
                </th>
                <th className="px-4 py-3 text-center font-black text-accent">
                  그날의 나에게
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.label} className="border-b border-border last:border-0">
                  <td className="px-4 py-3 font-bold">{row.label}</td>
                  <td className="px-4 py-3 text-center">
                    <CellIcon value={row.app} />
                  </td>
                  <td className="px-4 py-3 text-center">
                    <CellIcon value={row.newsletter} />
                  </td>
                  <td className="px-4 py-3 text-center">
                    <CellIcon value={row.us} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
