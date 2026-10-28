import { operatorTokenRequestSchema, operatorTokenResponseSchema } from "@sowa-chat/protocol";
import { createZodDto } from "nestjs-zod";

export class OperatorTokenRequestDto extends createZodDto(operatorTokenRequestSchema) {}

export class OperatorTokenResponseDto extends createZodDto(operatorTokenResponseSchema) {}
