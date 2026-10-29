import {
  createCheck,
  createCheckContext,
  createFailingCheck,
} from "../../../test/support/environment-checks.js";
import { runEnvironmentChecks } from "./run-environment-checks.js";

describe("runEnvironmentChecks", () => {
  it("собирает находки всех проверок с их именами в порядке списка", async () => {
    const checks = [
      createCheck("firstCheck", [{ level: "stop", message: "first problem" }]),
      createCheck("secondCheck", [{ level: "stop", message: "second problem" }]),
    ];

    const results = await runEnvironmentChecks(checks, createCheckContext("production"), "startup");

    expect(results).toEqual([
      { check: "firstCheck", level: "stop", message: "first problem" },
      { check: "secondCheck", level: "stop", message: "second problem" },
    ]);
  });

  it("не останавливается на первой проблеме и собирает несколько находок одной проверки", async () => {
    const checks = [
      createCheck("firstCheck", [
        { level: "stop", message: "one" },
        { level: "warn", message: "two" },
      ]),
      createCheck("secondCheck", [{ level: "warn", message: "three" }]),
    ];

    const results = await runEnvironmentChecks(checks, createCheckContext("production"), "startup");

    expect(results.map((result) => result.message)).toEqual(["one", "two", "three"]);
  });

  it("возвращает пустой список, если проверок нет или проблем нет", async () => {
    const context = createCheckContext("production");

    expect(await runEnvironmentChecks([], context, "startup")).toEqual([]);
    expect(await runEnvironmentChecks([createCheck("cleanCheck", [])], context, "doctor")).toEqual(
      [],
    );
  });

  it("передаёт контекст в проверку", async () => {
    const check = createCheck("contextCheck", []);
    const context = createCheckContext("production");

    await runEnvironmentChecks([check], context, "startup");

    expect(check.run).toHaveBeenCalledWith(context);
  });

  it("в development превращает stop в warn, а warn оставляет", async () => {
    const checks = [
      createCheck("firstCheck", [{ level: "stop", message: "first problem" }]),
      createCheck("secondCheck", [
        { level: "stop", message: "second problem" },
        { level: "warn", message: "second warning" },
      ]),
    ];

    const results = await runEnvironmentChecks(
      checks,
      createCheckContext("development"),
      "startup",
    );

    expect(results).toEqual([
      { check: "firstCheck", level: "warn", message: "first problem" },
      { check: "secondCheck", level: "warn", message: "second problem" },
      { check: "secondCheck", level: "warn", message: "second warning" },
    ]);
  });

  it("в production оставляет stop как есть", async () => {
    const checks = [createCheck("firstCheck", [{ level: "stop", message: "problem" }])];

    const results = await runEnvironmentChecks(checks, createCheckContext("production"), "doctor");

    expect(results[0]?.level).toBe("stop");
  });

  describe("место запуска", () => {
    const onlyInDoctor = createCheck("doctorCheck", [{ level: "warn", message: "doctor" }], true);
    const everywhere = createCheck("everywhereCheck", [{ level: "warn", message: "everywhere" }]);

    it("при startup пропускает проверку onlyInDoctor и не вызывает её run", async () => {
      const results = await runEnvironmentChecks(
        [onlyInDoctor, everywhere],
        createCheckContext("production"),
        "startup",
      );

      expect(results.map((result) => result.check)).toEqual(["everywhereCheck"]);
      expect(onlyInDoctor.run).not.toHaveBeenCalled();
    });

    it("при doctor выполняет все проверки", async () => {
      const results = await runEnvironmentChecks(
        [onlyInDoctor, everywhere],
        createCheckContext("production"),
        "doctor",
      );

      expect(results.map((result) => result.check)).toEqual(["doctorCheck", "everywhereCheck"]);
    });
  });

  describe("ошибка проверки", () => {
    it("даёт находку warn с текстом ошибки и выполняет следующие проверки", async () => {
      const next = createCheck("nextCheck", [{ level: "stop", message: "next problem" }]);
      const checks = [createFailingCheck("brokenCheck", new Error("connection refused")), next];

      const results = await runEnvironmentChecks(
        checks,
        createCheckContext("production"),
        "startup",
      );

      expect(results).toEqual([
        { check: "brokenCheck", level: "warn", message: "check could not run: connection refused" },
        { check: "nextCheck", level: "stop", message: "next problem" },
      ]);
      expect(next.run).toHaveBeenCalledTimes(1);
    });

    it("ошибка проверки остаётся warn и в development", async () => {
      const checks = [createFailingCheck("brokenCheck", new Error("boom"))];

      const results = await runEnvironmentChecks(
        checks,
        createCheckContext("development"),
        "startup",
      );

      expect(results).toEqual([
        { check: "brokenCheck", level: "warn", message: "check could not run: boom" },
      ]);
    });
  });
});
