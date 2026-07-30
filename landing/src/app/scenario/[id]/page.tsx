import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getScenario, scenarios } from "@/data/scenarios";
import { ScenarioPlayer } from "@/components/scenario/ScenarioPlayer";

export async function generateStaticParams() {
  return scenarios.map((scenario) => ({ id: scenario.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const scenario = getScenario(id);
  return {
    title: scenario
      ? `${scenario.title} 시나리오 | 오늘의 경제`
      : "시나리오를 찾을 수 없음 | 오늘의 경제",
  };
}

export default async function ScenarioPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const scenario = getScenario(id);
  if (!scenario) notFound();

  return (
    <div>
      <div className="border-b border-border bg-surface/40 px-6 py-3 text-center text-xs text-muted">
        {scenario.disclaimer}
      </div>
      <ScenarioPlayer scenario={scenario} />
    </div>
  );
}
