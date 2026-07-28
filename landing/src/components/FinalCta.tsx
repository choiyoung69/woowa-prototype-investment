import { EmailForm } from "./EmailForm";

export function FinalCta() {
  return (
    <section id="subscribe" className="scroll-mt-20 border-b border-border bg-surface">
      <div className="mx-auto max-w-2xl px-5 py-24 text-center sm:px-6">
        <h2 className="text-3xl font-bold sm:text-4xl">
          먼저 검증할 핵심은 과거 위기 회귀 학습입니다
        </h2>
        <p className="mt-4 text-base leading-7 text-muted">
          지금은 IMF 외환위기 하나를 직장인, 취준생, 자영업자 입장으로 나눠
          체험합니다. 이후 반응을 보며 다른 경제 위기와 실시간 모의투자를 확장합니다.
        </p>

        <div className="mt-8">
          <EmailForm source="final_cta" align="center" />
        </div>
      </div>
    </section>
  );
}
