import { Module } from "@nestjs/common";
import { VisitorsModule } from "../../domain/visitors/visitors.module.js";
import { VisitorSessionController } from "./visitor-session.controller.js";

@Module({
  imports: [VisitorsModule],
  controllers: [VisitorSessionController],
})
export class VisitorApiModule {}
