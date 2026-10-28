import { createProject } from "./support/fixtures.js";
import { auditRowsByAction } from "./support/identity-key-rows.js";
import {
  addOrigins,
  originGroups,
  originsOf,
  otherGroupOf,
  runOriginCommand,
  setupMainProject,
} from "./support/origin-cli.js";
import { nonEmptyLines, outputOf } from "./support/project-cli.js";
import { useTestDatabase } from "./support/test-database.js";

const commandTimeout = 600_000;
const shop = "https://shop.example.com";
const badOrigins = ["https://a.com/path", "*"];

describe("команды origin:* и operator-origin:*", () => {
  const getDataSource = useTestDatabase();

  describe.each(originGroups)("$prefix", (group) => {
    const { list, other, prefix, eventName } = group;
    const otherGroup = otherGroupOf(group);

    describe(`${prefix}:add`, { timeout: commandTimeout }, () => {
      it("нормализует origin: код 0, added, значение только в своём списке", async () => {
        await setupMainProject();

        const result = await runOriginCommand(group, "add", {
          project: "main",
          origin: "https://Shop.Example.com/",
        });

        expect(result.exitCode, outputOf(result)).toBe(0);
        expect(nonEmptyLines(result.stdout)).toEqual([`added: ${shop}`]);
        const origins = await originsOf(getDataSource(), "main");
        expect(origins[list]).toEqual([shop]);
        expect(origins[other]).toEqual([]);
      });

      it("повтор: код 0, already allowed, список и журнал не меняются", async () => {
        await setupMainProject();
        await addOrigins(group, "main", [shop]);

        const result = await runOriginCommand(group, "add", {
          project: "main",
          origin: "https://SHOP.example.com",
        });

        expect(result.exitCode, outputOf(result)).toBe(0);
        expect(nonEmptyLines(result.stdout)).toEqual([`already allowed: ${shop}`]);
        expect((await originsOf(getDataSource(), "main"))[list]).toEqual([shop]);
        expect(await auditRowsByAction(getDataSource(), eventName)).toHaveLength(1);
      });

      it("второй origin дописывается в конец, порт сохраняется", async () => {
        await setupMainProject();
        await addOrigins(group, "main", [shop]);

        const result = await runOriginCommand(group, "add", {
          project: "main",
          origin: "http://localhost:5173",
        });

        expect(nonEmptyLines(result.stdout)).toEqual(["added: http://localhost:5173"]);
        expect((await originsOf(getDataSource(), "main"))[list]).toEqual([
          shop,
          "http://localhost:5173",
        ]);
      });

      it("пишет в журнал событие своего списка от cli с полным новым списком", async () => {
        await setupMainProject();

        await addOrigins(group, "main", [shop, "https://b.com"]);

        const rows = await auditRowsByAction(getDataSource(), eventName);
        expect(rows).toHaveLength(2);
        expect(rows[1]).toMatchObject({
          actorKind: "cli",
          targetKind: "project",
          data: { origins: [shop, "https://b.com"] },
        });
      });

      it.each(badOrigins)("origin %s: код 1, error в stderr, список не изменился", async (bad) => {
        await setupMainProject();

        const result = await runOriginCommand(group, "add", { project: "main", origin: bad });

        expect(result.exitCode, outputOf(result)).toBe(1);
        expect(result.stderr).toContain(`error: Invalid origin "${bad}"`);
        expect(result.stdout).not.toContain("added");
        expect(await originsOf(getDataSource(), "main")).toEqual({
          allowedOrigins: [],
          operatorAllowedOrigins: [],
        });
        expect(await auditRowsByAction(getDataSource(), eventName)).toEqual([]);
      });

      it("неизвестный проект: код 1, Project not found, другой проект не тронут", async () => {
        await createProject(getDataSource(), { name: "other" });

        const result = await runOriginCommand(group, "add", { project: "unknown", origin: shop });

        expect(result.exitCode, outputOf(result)).toBe(1);
        expect(result.stderr).toContain('error: Project "unknown" not found');
        expect((await originsOf(getDataSource(), "other"))[list]).toEqual([]);
      });
    });

    describe(`${prefix}:remove`, { timeout: commandTimeout }, () => {
      it("удаляет origin: код 0, removed, второй origin и чужой список остаются", async () => {
        await setupMainProject();
        await addOrigins(group, "main", [shop, "https://b.com"]);
        await addOrigins(otherGroup, "main", [shop]);

        const result = await runOriginCommand(group, "remove", { project: "main", origin: shop });

        expect(result.exitCode, outputOf(result)).toBe(0);
        expect(nonEmptyLines(result.stdout)).toEqual([`removed: ${shop}`]);
        const origins = await originsOf(getDataSource(), "main");
        expect(origins[list]).toEqual(["https://b.com"]);
        expect(origins[other]).toEqual([shop]);
      });

      it("нормализует origin при удалении", async () => {
        await setupMainProject();
        await addOrigins(group, "main", [shop]);

        const result = await runOriginCommand(group, "remove", {
          project: "main",
          origin: "https://Shop.Example.com/",
        });

        expect(nonEmptyLines(result.stdout)).toEqual([`removed: ${shop}`]);
        expect((await originsOf(getDataSource(), "main"))[list]).toEqual([]);
      });

      it("повтор: код 0, not in list, журнал без второй записи", async () => {
        await setupMainProject();
        await addOrigins(group, "main", [shop]);
        await runOriginCommand(group, "remove", { project: "main", origin: shop });

        const result = await runOriginCommand(group, "remove", { project: "main", origin: shop });

        expect(result.exitCode, outputOf(result)).toBe(0);
        expect(nonEmptyLines(result.stdout)).toEqual([`not in list: ${shop}`]);
        expect(await auditRowsByAction(getDataSource(), eventName)).toHaveLength(2);
      });

      it("origin из другого списка: not in list, чужой список не тронут", async () => {
        await setupMainProject();
        await addOrigins(otherGroup, "main", [shop]);

        const result = await runOriginCommand(group, "remove", { project: "main", origin: shop });

        expect(result.exitCode, outputOf(result)).toBe(0);
        expect(nonEmptyLines(result.stdout)).toEqual([`not in list: ${shop}`]);
        expect((await originsOf(getDataSource(), "main"))[other]).toEqual([shop]);
      });

      it.each(badOrigins)("origin %s: код 1, список не изменился", async (bad) => {
        await setupMainProject();
        await addOrigins(group, "main", [shop]);

        const result = await runOriginCommand(group, "remove", { project: "main", origin: bad });

        expect(result.exitCode, outputOf(result)).toBe(1);
        expect(result.stderr).toContain(`error: Invalid origin "${bad}"`);
        expect((await originsOf(getDataSource(), "main"))[list]).toEqual([shop]);
      });

      it("неизвестный проект: код 1, Project not found", async () => {
        const result = await runOriginCommand(group, "remove", {
          project: "unknown",
          origin: shop,
        });

        expect(result.exitCode, outputOf(result)).toBe(1);
        expect(result.stderr).toContain('error: Project "unknown" not found');
      });
    });

    describe(`${prefix}:list`, { timeout: commandTimeout }, () => {
      it("по строке на origin без заголовка, чужой список и другой проект не видны", async () => {
        await setupMainProject();
        await createProject(getDataSource(), { name: "other" });
        await addOrigins(group, "main", [shop, "http://localhost:5173"]);
        await addOrigins(otherGroup, "main", ["https://hidden.com"]);
        await addOrigins(group, "other", ["https://elsewhere.com"]);

        const result = await runOriginCommand(group, "list", { project: "main" });

        expect(result.exitCode, outputOf(result)).toBe(0);
        expect(result.stdout).toBe(`${shop}\nhttp://localhost:5173\n`);
      });

      it("пустой список: код 0, stdout пустой", async () => {
        await setupMainProject();

        const result = await runOriginCommand(group, "list", { project: "main" });

        expect(result.exitCode, outputOf(result)).toBe(0);
        expect(result.stdout).toBe("");
      });

      it("после remove origin из списка исчезает", async () => {
        await setupMainProject();
        await addOrigins(group, "main", [shop, "https://b.com"]);
        await runOriginCommand(group, "remove", { project: "main", origin: shop });

        const result = await runOriginCommand(group, "list", { project: "main" });

        expect(nonEmptyLines(result.stdout)).toEqual(["https://b.com"]);
      });

      it("неизвестный проект: код 1, Project not found", async () => {
        const result = await runOriginCommand(group, "list", { project: "unknown" });

        expect(result.exitCode, outputOf(result)).toBe(1);
        expect(result.stderr).toContain('error: Project "unknown" not found');
      });
    });
  });
});
