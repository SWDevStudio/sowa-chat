import { Module } from "@nestjs/common";
import { KeysModule } from "../keys/keys.module.js";
import { ProjectsModule } from "../projects/projects.module.js";
import { InitialProjectService } from "./initial-project.service.js";

@Module({
  imports: [ProjectsModule, KeysModule],
  providers: [InitialProjectService],
  exports: [InitialProjectService],
})
export class StartupModule {}
