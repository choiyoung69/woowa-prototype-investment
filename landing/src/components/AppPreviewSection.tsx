import Link from "next/link";

export function AppPreviewSection() {
  return (
    <section className="border-b border-border bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-6">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <span className="rounded-full bg-[#e8f3ff] px-4 py-2 text-sm font-black text-accent">
              웹뿐만 아니라
            </span>
            <h2 className="mt-5 break-keep text-3xl font-black leading-tight sm:text-4xl">
              PC에서 만든 판단을
              <br />
              폰에서도 똑같이 이어가요
            </h2>
            <p className="mt-4 break-keep text-base font-bold leading-7 text-muted">
              지금은 웹 MVP로 검증하고 있지만, 화면은 처음부터 모바일 기준으로
              설계했습니다. 별도 앱 설치 없이 모바일 브라우저에서 바로
              체험할 수 있고, 반응이 검증되면 네이티브 앱으로 확장할 계획입니다.
            </p>

            <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              <Link
                href="/scenarios"
                className="rounded-[12px] bg-accent px-6 py-3.5 text-sm font-black text-accent-foreground shadow-lg shadow-blue-500/20 transition hover:bg-[#1b64da]"
              >
                앱으로 확인하기
              </Link>
              <span className="text-xs font-bold text-muted">
                설치 없이 모바일 웹으로 바로 열려요
              </span>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-3">
              {["반응형 UI", "모바일 최적화", "앱 확장 예정"].map((label) => (
                <span
                  key={label}
                  className="rounded-[10px] border border-border bg-background px-3 py-3 text-center text-xs font-black"
                >
                  {label}
                </span>
              ))}
            </div>
          </div>

          <div className="flex justify-center">
            <div className="relative w-[260px] rounded-[40px] border-[6px] border-[#191f28] bg-[#191f28] p-2 shadow-[0_30px_60px_rgba(25,31,40,0.25)]">
              <div className="absolute left-1/2 top-2 h-5 w-24 -translate-x-1/2 rounded-full bg-[#191f28]" />
              <div className="overflow-hidden rounded-[30px] bg-background">
                <div className="border-b border-border bg-surface px-4 py-3">
                  <p className="text-xs font-black">IMF 외환위기</p>
                  <p className="mt-0.5 text-[11px] font-bold text-muted">1 / 5일차</p>
                </div>
                <div className="p-4">
                  <p className="text-xs font-bold leading-5">
                    정부가 결국 IMF에 구제금융을 공식 요청했습니다.
                  </p>
                  <p className="mt-3 text-2xl font-black">9,000원</p>
                  <div className="mt-3 h-16 rounded-[8px] bg-surface p-2">
                    <svg viewBox="0 0 200 60" className="h-full w-full" preserveAspectRatio="none">
                      <path
                        d="M0 10 L40 18 L80 32 L120 26 L160 44 L200 40"
                        fill="none"
                        stroke="var(--down)"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="mt-3 grid grid-cols-3 gap-1.5">
                    <span className="rounded-[6px] bg-[#e8f3ff] py-2 text-center text-[11px] font-black text-accent">
                      매수
                    </span>
                    <span className="rounded-[6px] bg-surface py-2 text-center text-[11px] font-black text-muted">
                      매도
                    </span>
                    <span className="rounded-[6px] bg-surface py-2 text-center text-[11px] font-black text-muted">
                      관망
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
