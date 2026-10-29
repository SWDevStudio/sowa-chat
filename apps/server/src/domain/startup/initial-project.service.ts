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
import { ApiKeysService } from "../keys/api-keys.service.js";
import { parseKey, toLookupPrefix } from "../keys/key-format.js";
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
    @Inject(ApiKeysService) private readonly apiKeys: ApiKeysService,
  ) {}

  async setUp(): Promise<void> {
    if (this.app.env === "development") {
      await this.setUpDevelopmentProject();
      return;
    }
    await this.setUpProductionProject();
  }

  private async setUpProductionProject(): Promise<void> {
    const { projectName, serverKey, allowedOrigins, operatorAllowedOrigins } = this.initialProject;
    if (projectName === undefined) {
      return;
    }
    if (serverKey === undefined) {
      throw new Error("SOWA_INIT_SERVER_KEY is required when SOWA_INIT_PROJECT is set");
    }
    if (parseKey(serverKey, "serverKey") === undefined) {
      throw new Error(
        "SOWA_INIT_SERVER_KEY must be a serverKey (sk_...) with a valid checksum: " +
          "generate one with sowa-chat key:generate",
      );
    }
    const created = await this.projects.createInitial({
      name: projectName,
      allowedOrigins,
      operatorAllowedOrigins,
      serverKey,
      actorKind: "system",
    });
    if (created) {
      this.logger.log(`Initial project ${projectName} created from SOWA_INIT_PROJECT`);
      return;
    }
    await this.warnIfServerKeyDiffers(projectName, serverKey);
  }

  private async warnIfServerKeyDiffers(projectName: string, serverKey: string): Promise<void> {
    const project = await this.projects.getByName(projectName);
    const keys = await this.apiKeys.list(project.id, "server");
    const prefix = toLookupPrefix(serverKey);
    if (keys.some((key) => key.prefix === prefix && key.revokedAt === null)) {
      return;
    }
    this.logger.warn(
      `SOWA_INIT_SERVER_KEY does not match any active serverKey of project ${projectName}`,
    );
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
