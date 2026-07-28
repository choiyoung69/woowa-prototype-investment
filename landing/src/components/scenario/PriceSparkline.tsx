import { useId } from "react";

export function PriceSparkline({ prices }: { prices: number[] }) {
  const gradientId = useId();

  if (prices.length === 0) {
    return <div className="h-40 w-full rounded-2xl border border-border bg-surface" />;
  }

  const width = 600;
  const height = 160;
  const padY = 16;
  const hasMultiplePoints = prices.length > 1;

  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const range = max - min || 1;
  const stepX = hasMultiplePoints ? width / (prices.length - 1) : width;

  const toY = (price: number) =>
    hasMultiplePoints
      ? padY + (height - padY * 2) - ((price - min) / range) * (height - padY * 2)
      : height / 2;

  const linePoints = hasMultiplePoints
    ? prices.map((price, index) => `${index * stepX},${toY(price)}`)
    : [`0,${height / 2}`, `${width},${height / 2}`];

  const areaPoints = [`0,${height}`, ...linePoints, `${width},${height}`];

  const trendUp = prices[prices.length - 1] >= prices[0];
  const color = trendUp ? "var(--up)" : "var(--down)";
  const startY = toY(prices[0]);
  const lastX = width;
  const lastY = toY(prices[prices.length - 1]);

  return (
    <div className="rounded-2xl border border-border bg-surface p-4">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
        className="h-40 w-full"
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.35} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>

        <line
          x1={0}
          y1={startY}
          x2={width}
          y2={startY}
          stroke="var(--border)"
          strokeDasharray="4 4"
          strokeWidth={1}
        />

        <polygon points={areaPoints.join(" ")} fill={`url(#${gradientId})`} />

        <polyline
          points={linePoints.join(" ")}
          fill="none"
          stroke={color}
          strokeWidth={2.5}
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        <circle cx={lastX} cy={lastY} r={9} fill={color} opacity={0.25} />
        <circle cx={lastX} cy={lastY} r={4.5} fill={color} />
      </svg>
      <div className="mt-2 flex justify-between text-[11px] text-muted">
        <span>{prices[0].toLocaleString()}원 · 시작</span>
        <span>{prices[prices.length - 1].toLocaleString()}원 · 오늘</span>
      </div>
    </div>
  );
}
