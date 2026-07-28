import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getScenario } from "@/data/scenarios";
import { ScenarioPlayer } from "@/components/scenario/ScenarioPlayer";

export const metadata: Metadata = {
  title: "코로나 폭락 시나리오 | 그날의 나에게",
};

export default function CovidCrashPage() {
  const scenario = getScenario("covid-crash");
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
