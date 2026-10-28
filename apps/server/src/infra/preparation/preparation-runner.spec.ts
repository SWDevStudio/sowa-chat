import { PreparationRunner } from "./preparation-runner.js";
import type { PreparationStep } from "./preparation-step.js";

function createStep(name: string, run: () => Promise<void>): PreparationStep {
  return { name, run: vi.fn(run) };
}

describe("PreparationRunner", () => {
  it("выполняет шаги по порядку списка", async () => {
    const calls: string[] = [];
    const steps = ["first", "second", "third"].map((name) =>
      createStep(name, async () => {
        calls.push(`${name}:start`);
        await Promise.resolve();
        calls.push(`${name}:end`);
      }),
    );

    await new PreparationRunner(steps).run();

    expect(calls).toEqual([
      "first:start",
      "first:end",
      "second:start",
      "second:end",
      "third:start",
      "third:end",
    ]);
  });

  it("отклоняется ошибкой первого шага и не вызывает второй", async () => {
    const failure = new Error("first step failed");
    const first = createStep("first", () => Promise.reject(failure));
    const second = createStep("second", () => Promise.resolve());

    await expect(new PreparationRunner([first, second]).run()).rejects.toBe(failure);

    expect(second.run).not.toHaveBeenCalled();
  });

  it("не вызывает следующие шаги после ошибки среднего шага", async () => {
    const first = createStep("first", () => Promise.resolve());
    const second = createStep("second", () => Promise.reject(new Error("boom")));
    const third = createStep("third", () => Promise.resolve());

    await expect(new PreparationRunner([first, second, third]).run()).rejects.toThrow("boom");

    expect(first.run).toHaveBeenCalledTimes(1);
    expect(third.run).not.toHaveBeenCalled();
  });

  it("завершается без ошибки при пустом списке шагов", async () => {
    await expect(new PreparationRunner([]).run()).resolves.toBeUndefined();
  });
});
