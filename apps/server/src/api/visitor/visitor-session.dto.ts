import {
  visitorSessionRefreshRequestSchema,
  visitorSessionRequestSchema,
  visitorSessionResponseSchema,
} from "@sowa-chat/protocol";
import { createZodDto } from "nestjs-zod";

export class VisitorSessionRequestDto extends createZodDto(visitorSessionRequestSchema) {}

export class VisitorSessionRefreshRequestDto extends createZodDto(
  visitorSessionRefreshRequestSchema,
) {}

export class VisitorSessionResponseDto extends createZodDto(visitorSessionResponseSchema) {}
