import type { Scenario } from "@/lib/scenario-engine";
import { imfCrisisScenarios } from "./imf-crisis";

export const scenarios: Scenario[] = imfCrisisScenarios;

export function getScenario(id: string): Scenario | undefined {
  return scenarios.find((scenario) => scenario.id === id);
}
