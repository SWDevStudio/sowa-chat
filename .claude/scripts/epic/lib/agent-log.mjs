import { logEvent } from "./metrics.mjs";

export function logAgentSpec({ root, epic, task }, spec) {
  const [role, model] = spec.trim().split(/\s+/);
  if (!role || !model) {
    throw new Error(`Log spec must be "<role> <model>", got "${spec}"`);
  }
  logEvent(root, { event: "agentDone", epic, task, role, model });
}
