export function PriceSparkline({ prices }: { prices: number[] }) {
  if (prices.length < 2) {
    return <div className="h-24 w-full rounded-lg border border-border bg-surface" />;
  }

  const width = 600;
  const height = 96;
  const padY = 10;

  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const range = max - min || 1;
  const stepX = width / (prices.length - 1);

  const toY = (price: number) =>
    padY + (height - padY * 2) - ((price - min) / range) * (height - padY * 2);

  const points = prices.map((price, index) => `${index * stepX},${toY(price)}`);
  const trendUp = prices[prices.length - 1] >= prices[0];
  const strokeColor = trendUp ? "var(--up)" : "var(--down)";

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      className="h-24 w-full rounded-lg border border-border bg-surface"
    >
      <polyline
        points={points.join(" ")}
        fill="none"
        stroke={strokeColor}
        strokeWidth={2}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <circle
        cx={(prices.length - 1) * stepX}
        cy={toY(prices[prices.length - 1])}
        r={4}
        fill={strokeColor}
      />
    </svg>
  );
}
