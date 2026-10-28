import { Body, HttpCode, Inject, Post, UseFilters } from "@nestjs/common";
import type { OperatorTokenResponse } from "@sowa-chat/protocol";
import { ZodResponse } from "nestjs-zod";
import { OperatorsService } from "../../domain/operators/operators.service.js";
import { RequestContext } from "../../infra/request-context/request-context.js";
import { OperatorDisabledFilter } from "./operator-disabled.filter.js";
import { OperatorTokenRequestDto, OperatorTokenResponseDto } from "./operator-token.dto.js";
import { ServerController } from "./server-controller.decorator.js";

@ServerController("operator-token")
@UseFilters(OperatorDisabledFilter)
export class OperatorTokenController {
  constructor(
    @Inject(OperatorsService) private readonly operators: OperatorsService,
    @Inject(RequestContext) private readonly requestContext: RequestContext,
  ) {}

  @Post()
  @HttpCode(200)
  @ZodResponse({ status: 200, type: OperatorTokenResponseDto })
  async issue(@Body() body: OperatorTokenRequestDto): Promise<OperatorTokenResponse> {
    const { token, expiresAt } = await this.operators.issueToken({
      projectId: this.requestContext.projectId(),
      externalId: body.externalId,
      name: body.name,
      avatarUrl: body.avatarUrl,
      role: body.role,
    });
    return { token, expiresAt: expiresAt.toISOString() };
  }
}
