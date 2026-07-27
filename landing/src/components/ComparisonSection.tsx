type Cell = boolean | "partial";

const rows: { label: string; app: Cell; newsletter: Cell; us: Cell }[] = [
  { label: "실시간 매매", app: true, newsletter: false, us: false },
  { label: "과거 사건 체험", app: "partial", newsletter: false, us: true },
  { label: "판단 이유·감정 기록", app: false, newsletter: false, us: true },
  { label: "경제 지식 제공", app: false, newsletter: true, us: true },
  { label: "회원가입 없는 체험", app: false, newsletter: false, us: true },
  { label: "공유 유도 설계", app: false, newsletter: "partial", us: true },
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
    <section className="border-b border-border bg-surface/40">
      <div className="mx-auto max-w-3xl px-6 py-20">
        <h2 className="text-center text-2xl font-bold sm:text-3xl">
          기존 서비스와는 다른 조합
        </h2>
        <p className="mt-3 text-center text-sm text-muted sm:text-base">
          모의투자 앱은 체험만, 뉴스레터는 지식만 있었어요.
        </p>

        <div className="mt-10 overflow-x-auto rounded-2xl border border-border">
          <table className="w-full min-w-[480px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-border bg-surface text-left">
                <th className="px-4 py-3 font-medium text-muted">항목</th>
                <th className="px-4 py-3 text-center font-medium text-muted">
                  모의투자 앱
                </th>
                <th className="px-4 py-3 text-center font-medium text-muted">
                  경제 뉴스레터
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
