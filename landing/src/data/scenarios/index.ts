import type { Scenario } from "@/lib/scenario-engine";
import { imfCrisisScenarios } from "./imf-crisis";
import { covidCrashScenario } from "./covid-crash";

export const scenarios: Scenario[] = [...imfCrisisScenarios, covidCrashScenario];

export function getScenario(id: string): Scenario | undefined {
  return scenarios.find((scenario) => scenario.id === id);
}

export const upcomingScenarios = [
  { id: "meme-stock-rally", title: "밈스톡 급등" },
  { id: "rate-hike", title: "금리인상기" },
];
