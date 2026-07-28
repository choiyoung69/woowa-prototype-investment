import { EmailForm } from "./EmailForm";
import Link from "next/link";

export function FinalCta() {
  return (
    <section id="subscribe" className="scroll-mt-20 border-b border-border bg-surface">
      <div className="mx-auto max-w-3xl px-5 py-20 text-center sm:px-6">
        <p className="text-sm font-black text-accent">현재 프로토타입으로 검증 중</p>
        <h2 className="mt-3 text-3xl font-black leading-tight sm:text-5xl">
          하루만 해보고 끝나는지,
          <br />
          내일도 또 판단하고 싶은지
        </h2>
        <p className="mx-auto mt-4 max-w-2xl break-keep text-base font-bold leading-7 text-muted">
          콘시어지 테스트에서는 “내일 것도 받아보고 싶다”는 반응을 확인했습니다.
          이제 프로토타입으로 며칠 이상 지속 사용되는지 검증합니다.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/scenarios"
            className="rounded-[12px] bg-accent px-8 py-4 text-base font-black text-white shadow-lg shadow-blue-500/20 transition hover:bg-[#1b64da]"
          >
            프로토타입 바로 체험하기
          </Link>
          <Link
            href="/scenario/imf-crisis-worker"
            className="rounded-[12px] bg-[#e8f3ff] px-8 py-4 text-base font-black text-accent transition hover:bg-[#d6eaff]"
          >
            첫 시나리오 시작
          </Link>
        </div>

        <div className="mt-8 rounded-[16px] border border-border bg-background p-5">
          <p className="text-sm font-black text-muted">출시 알림 받기</p>
          <p className="mt-1 text-sm font-bold text-muted">
            경제 특화 뉴스, 퀴즈, 커뮤니티, 실시간 모의투자, 랭킹이 열리면 알려드릴게요.
          </p>
          <div className="mt-4">
            <EmailForm source="final_cta" align="center" />
          </div>
        </div>
      </div>
    </section>
  );
}
