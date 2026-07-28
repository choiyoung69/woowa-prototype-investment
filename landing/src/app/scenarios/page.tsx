import type { Metadata } from "next";
import { scenarios, upcomingScenarios } from "@/data/scenarios";
import { PathNode, WaveIcon, ChartIcon } from "@/components/PathNode";

export const metadata: Metadata = {
  title: "시나리오 선택 | 그날의 나에게",
};

export default function ScenariosPage() {
  return (
    <div className="mx-auto max-w-md px-6 py-16">
      <h1 className="text-center text-2xl font-bold sm:text-3xl">
        어떤 그날부터 시작할까요?
      </h1>
      <p className="mt-3 text-center text-sm text-muted">
        회원가입 없이 바로 체험할 수 있어요. 순서대로 하나씩 열려요.
      </p>

      <div className="relative mt-16 flex flex-col items-center gap-10">
        <div className="pointer-events-none absolute inset-y-2 left-1/2 w-px -translate-x-1/2 border-l-2 border-dashed border-border" />

        {scenarios.map((scenario, index) => (
          <PathNode
            key={scenario.id}
            icon={<WaveIcon />}
            label={scenario.title}
            sublabel={index === 0 ? "지금 체험하기" : undefined}
            href={`/scenario/${scenario.id}`}
            align={index % 2 === 0 ? "left" : "right"}
            featured={index === 0}
          />
        ))}

        {upcomingScenarios.map((scenario, index) => (
          <PathNode
            key={scenario.id}
            icon={<ChartIcon />}
            label={scenario.title}
            sublabel="준비 중"
            align={(scenarios.length + index) % 2 === 0 ? "left" : "right"}
          />
        ))}
      </div>
    </div>
  );
}
