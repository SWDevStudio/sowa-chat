import { Module } from "@nestjs/common";
import { KeysModule } from "../keys/keys.module.js";
import { ProjectsRepository } from "./projects.repository.js";
import { ProjectsService } from "./projects.service.js";

@Module({
  imports: [KeysModule],
  providers: [ProjectsRepository, ProjectsService],
  exports: [ProjectsRepository, ProjectsService],
})
export class ProjectsModule {}
