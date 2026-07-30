import type { Metadata } from "next";
import Link from "next/link";
import { decodeShareResult } from "@/lib/scenario-engine";
import { getEmotionTag } from "@/data/concepts";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ encoded: string }>;
}): Promise<Metadata> {
  const { encoded } = await params;
  const result = decodeShareResult(encoded);
  const title = result
    ? `${result.scenarioTitle} 결과: ${result.returnPct >= 0 ? "+" : ""}${result.returnPct.toFixed(1)}%`
    : "오늘의 경제";

  return {
    title: `${title} | 오늘의 경제`,
    description: "과거로 돌아가 다시 투자해보는 서비스, 오늘의 경제",
  };
}

export default async function SharePage({
  params,
}: {
  params: Promise<{ encoded: string }>;
}) {
  const { encoded } = await params;
  const result = decodeShareResult(encoded);

  if (!result) {
    return (
      <div className="mx-auto max-w-md px-6 py-24 text-center">
        <p className="text-sm text-muted">유효하지 않은 공유 링크예요.</p>
        <Link href="/scenarios" className="mt-4 inline-block text-sm text-accent">
          시나리오 보러가기 →
        </Link>
      </div>
    );
  }

  const isPositive = result.returnPct >= 0;
  const topTag = result.topTag ? getEmotionTag(result.topTag) : null;

  return (
    <div className="mx-auto max-w-md px-6 py-24 text-center">
      <p className="text-sm text-muted">{result.scenarioTitle}</p>
      <p
        className={`mt-2 text-6xl font-bold ${isPositive ? "text-up" : "text-down"}`}
      >
        {isPositive ? "+" : ""}
        {result.returnPct.toFixed(1)}%
      </p>
      {topTag && (
        <p className="mt-4 text-sm text-muted">
          이 사람의 가장 많은 감정: <span className="text-accent">{topTag.label}</span>
        </p>
      )}
      <p className="mt-2 text-xs text-muted">
        {result.days}일 동안 {result.tradeCount}번 매매했어요.
      </p>

      <div className="mt-10">
        <Link
          href={`/scenario/${result.scenarioId}`}
          className="inline-block rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground transition hover:brightness-110"
        >
          나도 체험해보기
        </Link>
      </div>
    </div>
  );
}
