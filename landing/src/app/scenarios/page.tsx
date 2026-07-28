import type { Metadata } from "next";
import { scenarios, upcomingScenarios } from "@/data/scenarios";
import { ScenarioCard, UpcomingScenarioCard } from "@/components/ScenarioCard";

export const metadata: Metadata = {
  title: "시나리오 선택 | 그날의 나에게",
};

export default function ScenariosPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-center text-2xl font-bold sm:text-3xl">
        어떤 그날로 돌아가볼까요?
      </h1>
      <p className="mt-3 text-center text-sm text-muted">
        회원가입 없이 바로 체험할 수 있어요.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {scenarios.map((scenario) => (
          <ScenarioCard
            key={scenario.id}
            title={scenario.title}
            subtitle={scenario.subtitle}
            href={`/scenario/${scenario.id}`}
          />
        ))}
        {upcomingScenarios.map((scenario) => (
          <UpcomingScenarioCard key={scenario.id} title={scenario.title} />
        ))}
      </div>
    </div>
  );
}
