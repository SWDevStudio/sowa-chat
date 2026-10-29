import { Logger } from "@nestjs/common";
import type { ConfigType } from "@nestjs/config";
import type { MockInstance } from "vitest";
import { portsConfig } from "../../infra/config/ports.config.js";
import { startupSummaryConfig } from "../../infra/config/startup-summary.config.js";
import { projectRow } from "../../../test/support/projects-service-probe.js";
import type { Project } from "../projects/project.entity.js";
import type { ProjectsService } from "../projects/projects.service.js";
import { StartupSummaryService } from "./startup-summary.service.js";

const ports: ConfigType<typeof portsConfig> = {
  public: 18080,
  operator: 18081,
  internal: 18082,
  management: 19090,
};

const secretLines = [
  "Secret SOWA_ENCRYPTION_KEYS: set",
  "Secret SOWA_TOKEN_SIGNING_KEYS: generatedForDevelopment",
  "Secret SOWA_INIT_SERVER_KEY: notSet",
];

const zoneLines = [
  "Zone public: port 18080",
  "Zone operator: port 18081",
  "Zone internal: port 18082",
  "Zone management: port 19090",
];

const shop = projectRow({
  name: "shop",
  allowedOrigins: ["https://shop.example.com", "https://www.shop.example.com"],
  operatorAllowedOrigins: ["https://admin.example.com"],
  publicKey: "pk_shop_public_value",
});

describe("StartupSummaryService.log", () => {
  let log: MockInstance;
  let list: ReturnType<typeof vi.fn>;

  function createService(
    env: ConfigType<typeof startupSummaryConfig>["env"] = "development",
  ): StartupSummaryService {
    const summary: ConfigType<typeof startupSummaryConfig> = {
      env,
      secrets: [
        { name: "SOWA_ENCRYPTION_KEYS", status: "set" },
        { name: "SOWA_TOKEN_SIGNING_KEYS", status: "generatedForDevelopment" },
        { name: "SOWA_INIT_SERVER_KEY", status: "notSet" },
      ],
    };
    const projects = { list } as unknown as ProjectsService;
    return new StartupSummaryService(summary, ports, projects);
  }

  function loggedLines(): string[] {
    return log.mock.calls.map((call) => String(call[0]));
  }

  function stubProjects(projects: Project[]): void {
    list.mockResolvedValue(projects);
  }

  beforeEach(() => {
    list = vi.fn().mockResolvedValue([]);
    log = vi.spyOn(Logger.prototype, "log").mockImplementation(() => undefined);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("api", () => {
    it("пишет строки по порядку: режим, зоны, проекты, проект, секреты", async () => {
      stubProjects([shop]);

      await createService().log("api");

      expect(loggedLines()).toEqual([
        "Startup summary: mode api, SOWA_ENV development",
        ...zoneLines,
        "Projects: 1",
        "Project shop: allowedOrigins https://shop.example.com, https://www.shop.example.com, operatorAllowedOrigins https://admin.example.com",
        ...secretLines,
      ]);
    });

    it("пишет SOWA_ENV production", async () => {
      await createService("production").log("api");

      expect(loggedLines()[0]).toBe("Startup summary: mode api, SOWA_ENV production");
    });

    it("пишет - вместо пустого списка доменов", async () => {
      stubProjects([projectRow({ name: "bare", allowedOrigins: [], operatorAllowedOrigins: [] })]);

      await createService().log("api");

      expect(loggedLines()).toContain("Project bare: allowedOrigins -, operatorAllowedOrigins -");
    });

    it("пишет - только для пустого из двух списков", async () => {
      stubProjects([
        projectRow({
          name: "site",
          allowedOrigins: ["https://site.example.com"],
          operatorAllowedOrigins: [],
        }),
      ]);

      await createService().log("api");

      expect(loggedLines()).toContain(
        "Project site: allowedOrigins https://site.example.com, operatorAllowedOrigins -",
      );
    });

    it("пишет строку на каждый проект и их число", async () => {
      stubProjects([shop, projectRow({ id: "project-2", name: "main" })]);

      await createService().log("api");

      const lines = loggedLines();
      expect(lines).toContain("Projects: 2");
      expect(lines.filter((line) => line.startsWith("Project "))).toHaveLength(2);
      expect(lines).toContain("Project main: allowedOrigins -, operatorAllowedOrigins -");
    });

    it("без проектов пишет Projects: 0 и ни одной строки Project", async () => {
      await createService().log("api");

      const lines = loggedLines();
      expect(lines).toContain("Projects: 0");
      expect(lines.some((line) => line.startsWith("Project "))).toBe(false);
    });

    it("читает проекты один раз", async () => {
      await createService().log("api");

      expect(list).toHaveBeenCalledTimes(1);
    });
  });

  describe("worker", () => {
    it("пишет те же строки без Zone", async () => {
      stubProjects([shop]);

      await createService().log("worker");

      expect(loggedLines()).toEqual([
        "Startup summary: mode worker, SOWA_ENV development",
        "Projects: 1",
        "Project shop: allowedOrigins https://shop.example.com, https://www.shop.example.com, operatorAllowedOrigins https://admin.example.com",
        ...secretLines,
      ]);
      expect(loggedLines().some((line) => line.includes("Zone"))).toBe(false);
    });
  });

  describe("секреты и ключи", () => {
    it("не пишет pk_ проекта", async () => {
      stubProjects([shop]);

      await createService().log("api");

      expect(loggedLines().join("\n")).not.toContain("pk_");
    });

    it("пишет только строки, без объектов в аргументах", async () => {
      stubProjects([shop]);

      await createService().log("api");

      expect(log.mock.calls.every((call) => call.length === 1)).toBe(true);
    });
  });

  describe("логгер", () => {
    it("пишет от имени контекста StartupSummary", async () => {
      const contexts: unknown[] = [];
      vi.restoreAllMocks();
      vi.spyOn(Logger.prototype, "log").mockImplementation(function (this: Logger) {
        contexts.push(Reflect.get(this, "context"));
      });

      await createService().log("worker");

      expect(new Set(contexts)).toEqual(new Set(["StartupSummary"]));
    });
  });
});
