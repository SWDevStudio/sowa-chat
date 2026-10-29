import { Inject, Injectable, Logger } from "@nestjs/common";
import type { ConfigType } from "@nestjs/config";
import { appConfig } from "../../infra/config/app.config.js";
import { developmentSecretsConfig } from "../../infra/config/development-secrets.config.js";
import {
  developmentSecretsPath,
  readDevelopmentSecrets,
  writeDevelopmentSecrets,
} from "../../infra/config/development-secrets-file.js";
import type { DevelopmentMainProject } from "../../infra/config/development-secrets-file.js";
import { initialProjectConfig } from "../../infra/config/initial-project.config.js";
import { ProjectsService } from "../projects/projects.service.js";

export const developmentProjectName = "main";
export const developmentAllowedOrigins = ["http://localhost:5173"];
export const developmentOperatorAllowedOrigins = ["http://localhost:5174"];

@Injectable()
export class InitialProjectService {
  private readonly logger = new Logger("InitialProject");

  constructor(
    @Inject(appConfig.KEY) private readonly app: ConfigType<typeof appConfig>,
    @Inject(initialProjectConfig.KEY)
    private readonly initialProject: ConfigType<typeof initialProjectConfig>,
    @Inject(developmentSecretsConfig.KEY)
    private readonly developmentSecrets: ConfigType<typeof developmentSecretsConfig>,
    @Inject(ProjectsService) private readonly projects: ProjectsService,
  ) {}

  async setUp(): Promise<void> {
    if (this.app.env === "development") {
      await this.setUpDevelopmentProject();
    }
  }

  private async setUpDevelopmentProject(): Promise<void> {
    const created = await this.projects.createInitial({
      name: developmentProjectName,
      allowedOrigins: this.initialProject.allowedOrigins.length
        ? this.initialProject.allowedOrigins
        : developmentAllowedOrigins,
      operatorAllowedOrigins: this.initialProject.operatorAllowedOrigins.length
        ? this.initialProject.operatorAllowedOrigins
        : developmentOperatorAllowedOrigins,
      actorKind: "system",
    });
    if (created) {
      this.saveKeys({ publicKey: created.publicKey, serverKey: created.serverKey });
      this.logKeys(created);
      return;
    }
    await this.reportExistingProject();
  }

  private saveKeys(mainProject: DevelopmentMainProject): void {
    const { directory } = this.developmentSecrets;
    const secrets = readDevelopmentSecrets(directory) ?? { env: {} };
    writeDevelopmentSecrets(directory, { ...secrets, mainProject });
  }

  private async reportExistingProject(): Promise<void> {
    const { directory } = this.developmentSecrets;
    const project = await this.projects.getByName(developmentProjectName);
    const saved = readDevelopmentSecrets(directory)?.mainProject;
    if (saved && saved.publicKey === project.publicKey) {
      this.logKeys(saved);
      return;
    }
    this.logger.warn(
      `Development project ${developmentProjectName}: publicKey ${project.publicKey ?? "-"}, ` +
        `serverKey is not in ${developmentSecretsPath(directory)}: ` +
        `create a new one with sowa-chat key:create --project ${developmentProjectName}`,
    );
  }

  private logKeys({ publicKey, serverKey }: DevelopmentMainProject): void {
    this.logger.log(
      `Development project ${developmentProjectName}: publicKey ${publicKey}, serverKey ${serverKey}`,
    );
  }
}
