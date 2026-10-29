import { Module } from "@nestjs/common";
import { TokensModule } from "../../infra/tokens/tokens.module.js";
import { ProjectsModule } from "../projects/projects.module.js";
import { VisitorSessionsRepository } from "./visitor-sessions.repository.js";
import { VisitorSessionsService } from "./visitor-sessions.service.js";
import { VisitorsRepository } from "./visitors.repository.js";

@Module({
  imports: [ProjectsModule, TokensModule],
  providers: [VisitorsRepository, VisitorSessionsRepository, VisitorSessionsService],
  exports: [VisitorSessionsService],
})
export class VisitorsModule {}
