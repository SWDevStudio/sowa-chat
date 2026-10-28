import fs from "node:fs";
import { run } from "./shell.mjs";

export function runStep(name, command, cwd) {
  const result = run(command, cwd);
  return { name, ok: result.ok, log: `$ ${command}\n${result.output}` };
}

export function passedStep(name, log) {
  return { name, ok: true, log };
}

export function failedStep(name, log) {
  return { name, ok: false, log };
}

export function reportSteps(steps, logPath) {
  fs.writeFileSync(logPath, steps.map((step) => `## ${step.name}\n${step.log}`).join("\n\n"));
  const failed = steps.filter((step) => !step.ok).map((step) => step.name);
  if (failed.length === 0) {
    console.log("PASS");
    return 0;
  }
  console.log(`FAIL: ${failed.join(", ")}`);
  console.log(`log: ${logPath}`);
  return 1;
}
