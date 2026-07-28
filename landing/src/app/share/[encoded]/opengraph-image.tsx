import { ImageResponse } from "next/og";
import { decodeShareResult } from "@/lib/scenario-engine";
import { getEmotionTag } from "@/data/concepts";
import { loadKoreanFont } from "@/lib/og-font";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ encoded: string }>;
}) {
  const { encoded } = await params;
  const result = decodeShareResult(encoded);

  const scenarioTitle = result?.scenarioTitle ?? "그날의 나에게";
  const returnPct = result?.returnPct ?? 0;
  const isPositive = returnPct >= 0;
  const topTag = result?.topTag ? getEmotionTag(result.topTag) : null;
  const days = result?.days ?? 0;
  const tradeCount = result?.tradeCount ?? 0;

  const returnText = `${isPositive ? "+" : ""}${returnPct.toFixed(1)}%`;
  const insightText = topTag
    ? `가장 많이 느낀 감정: ${topTag.label}`
    : `${days}일 동안 ${tradeCount}번 매매했어요`;

  const charset =
    "그날의나에게IMF외환위기직장인취준생자영업자수익률결과가장많이느낀감정동안번매매했어요 0123456789%+-." +
    scenarioTitle +
    (topTag?.label ?? "") +
    returnText +
    insightText;

  const fontData = await loadKoreanFont(charset);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#05060a",
          color: "#f4f4f5",
          fontFamily: fontData ? "Noto Sans KR" : undefined,
        }}
      >
        <div style={{ display: "flex", fontSize: 28, color: "#9498a3" }}>
          그날의 나에게 · {scenarioTitle}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 24,
            fontSize: 140,
            fontWeight: 700,
            color: isPositive ? "#34d399" : "#fb7185",
          }}
        >
          {returnText}
        </div>
        <div
          style={{ display: "flex", marginTop: 24, fontSize: 32, color: "#f4f4f5" }}
        >
          {insightText}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: fontData
        ? [{ name: "Noto Sans KR", data: fontData, style: "normal", weight: 700 }]
        : [],
    }
  );
}
