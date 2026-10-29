import { Inject, Injectable, Logger } from "@nestjs/common";
import type { ConfigType } from "@nestjs/config";
import { portsConfig } from "../../infra/config/ports.config.js";
import { startupSummaryConfig } from "../../infra/config/startup-summary.config.js";
import { apiZones } from "../../infra/zones/zone.js";
import type { Project } from "../projects/project.entity.js";
import { ProjectsService } from "../projects/projects.service.js";

function formatOrigins(origins: string[]): string {
  return origins.length ? origins.join(", ") : "-";
}

@Injectable()
export class StartupSummaryService {
  private readonly logger = new Logger("StartupSummary");

  constructor(
    @Inject(startupSummaryConfig.KEY)
    private readonly summary: ConfigType<typeof startupSummaryConfig>,
    @Inject(portsConfig.KEY) private readonly ports: ConfigType<typeof portsConfig>,
    @Inject(ProjectsService) private readonly projects: ProjectsService,
  ) {}

  async log(mode: "api" | "worker"): Promise<void> {
    this.logger.log(`Startup summary: mode ${mode}, SOWA_ENV ${this.summary.env}`);
    if (mode === "api") {
      this.logZones();
    }
    await this.logProjects();
    this.logSecrets();
  }

  private logZones(): void {
    for (const zone of apiZones) {
      this.logger.log(`Zone ${zone}: port ${this.ports[zone]}`);
    }
  }

  private async logProjects(): Promise<void> {
    const projects = await this.projects.list();
    this.logger.log(`Projects: ${projects.length}`);
    for (const project of projects) {
      this.logger.log(this.describeProject(project));
    }
  }

  private describeProject(project: Project): string {
    const allowedOrigins = formatOrigins(project.allowedOrigins);
    const operatorAllowedOrigins = formatOrigins(project.operatorAllowedOrigins);
    return `Project ${project.name}: allowedOrigins ${allowedOrigins}, operatorAllowedOrigins ${operatorAllowedOrigins}`;
  }

  private logSecrets(): void {
    for (const secret of this.summary.secrets) {
      this.logger.log(`Secret ${secret.name}: ${secret.status}`);
    }
  }
}
