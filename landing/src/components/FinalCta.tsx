import { EmailForm } from "./EmailForm";

export function FinalCta() {
  return (
    <section id="subscribe" className="scroll-mt-20 border-b border-border bg-surface">
      <div className="mx-auto max-w-2xl px-5 py-24 text-center sm:px-6">
        <h2 className="text-3xl font-bold sm:text-4xl">
          &ldquo;패닉셀 안 하려고 했는데, 결국 했다&rdquo;
        </h2>
        <p className="mt-4 text-base leading-7 text-muted">
          지금 IMF 외환위기와 코로나 폭락을 체험할 수 있어요. 밈스톡 급등, 금리인상기도
          준비 중이에요. 다음 시나리오 소식을 가장 먼저 받고 싶다면 이메일을 남겨주세요.
        </p>

        <div className="mt-8">
          <EmailForm source="final_cta" align="center" />
        </div>
      </div>
    </section>
  );
}
