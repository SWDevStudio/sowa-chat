import { Body, HttpCode, Inject, Post } from "@nestjs/common";
import type { OperatorTokenResponse } from "@sowa-chat/protocol";
import { ZodResponse } from "nestjs-zod";
import {
  type IssuedOperatorToken,
  OperatorDisabledError,
  OperatorsService,
} from "../../domain/operators/operators.service.js";
import { ApiException } from "../../infra/http/api-exception.js";
import { RequestContext } from "../../infra/request-context/request-context.js";
import { OperatorTokenRequestDto, OperatorTokenResponseDto } from "./operator-token.dto.js";
import { ServerController } from "./server-controller.decorator.js";

@ServerController("operator-token")
export class OperatorTokenController {
  constructor(
    @Inject(OperatorsService) private readonly operators: OperatorsService,
    @Inject(RequestContext) private readonly requestContext: RequestContext,
  ) {}

  @Post()
  @HttpCode(200)
  @ZodResponse({ status: 200, type: OperatorTokenResponseDto })
  async issue(@Body() body: OperatorTokenRequestDto): Promise<OperatorTokenResponse> {
    const issued = await this.issueToken(body);
    return { token: issued.token, expiresAt: issued.expiresAt.toISOString() };
  }

  private async issueToken(body: OperatorTokenRequestDto): Promise<IssuedOperatorToken> {
    try {
      return await this.operators.issueToken({
        ...body,
        projectId: this.requestContext.projectId(),
      });
    } catch (error) {
      if (error instanceof OperatorDisabledError) {
        throw new ApiException({ code: "forbidden", message: "Operator is disabled" });
      }
      throw error;
    }
  }
}
