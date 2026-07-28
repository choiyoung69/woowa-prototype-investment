import Link from "next/link";
import { EmailForm } from "./EmailForm";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 0%, rgba(245,185,66,0.14), transparent 70%)",
        }}
      />
      <div className="relative mx-auto flex max-w-3xl flex-col items-center px-6 pb-20 pt-28 text-center sm:pt-36">
        <span className="rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-muted">
          만약, 그날로 돌아간다면
        </span>

        <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-balance sm:text-5xl">
          <span className="text-down">IMF 외환위기</span>, 그날의
          <br />
          당신이라면 어떤 선택을 했을까요?
        </h1>

        <p className="mt-6 max-w-xl text-base leading-7 text-muted sm:text-lg">
          이미 결과를 알고 있는 과거의 사건 속으로 들어가, 모르는 척 다시
          판단해보세요. 그 순간 왜 사고팔았는지, 어떤 감정이었는지 기록하고
          복기하며 투자 실력을 쌓는 서비스를 준비하고 있습니다.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4">
          <Link
            href="/scenario/imf-crisis"
            className="rounded-lg bg-accent px-8 py-4 text-base font-semibold text-accent-foreground transition hover:brightness-110"
          >
            지금 체험하기 →
          </Link>
          <span className="text-xs text-muted">회원가입 없이 바로 시작해요</span>
        </div>

        <div className="mt-10 w-full max-w-md border-t border-border pt-8">
          <p className="text-xs text-muted">또는 정식 출시 소식만 받아보기</p>
          <div className="mt-3">
            <EmailForm source="hero" />
          </div>
        </div>
      </div>
    </section>
  );
}
