type Cell = boolean | "partial";

const rows: { label: string; app: Cell; newsletter: Cell; us: Cell }[] = [
  { label: "실시간 시장 경험", app: true, newsletter: false, us: "partial" },
  { label: "매일 경제 학습", app: false, newsletter: true, us: "partial" },
  { label: "과거 실제 사건 체험", app: "partial", newsletter: false, us: true },
  { label: "매수·매도·관망 판단", app: true, newsletter: false, us: true },
  { label: "판단 이유 기록", app: false, newsletter: false, us: true },
  { label: "실제 결과 기반 복기", app: false, newsletter: "partial", us: true },
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
      <div className="mx-auto max-w-4xl px-5 py-20 sm:px-6">
        <h2 className="text-center text-3xl font-bold sm:text-4xl">
          매일 학습, 실제 판단, 복기를 하나의 흐름으로
        </h2>
        <p className="mt-4 text-center text-base text-muted">
          기존 서비스가 나눠서 제공하던 경험을 투자 판단 학습으로 연결합니다.
        </p>

        <div className="mt-10 overflow-x-auto rounded-[8px] border border-border bg-surface shadow-sm">
          <table className="w-full min-w-[480px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-border bg-surface-2 text-left">
                <th className="px-4 py-3 font-medium text-muted">항목</th>
                <th className="px-4 py-3 text-center font-medium text-muted">
                  모의투자 앱
                </th>
                <th className="px-4 py-3 text-center font-medium text-muted">
                  뉴스·퀴즈 서비스
                </th>
                <th className="px-4 py-3 text-center font-semibold text-accent">
                  그날의 나에게
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.label} className="border-b border-border last:border-0">
                  <td className="px-4 py-3">{row.label}</td>
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
