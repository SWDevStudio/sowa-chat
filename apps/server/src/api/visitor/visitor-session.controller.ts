import { Body, Controller, HttpCode, Inject, Post } from "@nestjs/common";
import type { VisitorSessionResponse } from "@sowa-chat/protocol";
import { ZodResponse } from "nestjs-zod";
import {
  type VisitorSessionTokens,
  VisitorSessionsService,
} from "../../domain/visitors/visitor-sessions.service.js";
import { ApiException } from "../../infra/http/api-exception.js";
import { Zone } from "../../infra/zones/zone.decorator.js";
import {
  VisitorSessionRefreshRequestDto,
  VisitorSessionRequestDto,
  VisitorSessionResponseDto,
} from "./visitor-session.dto.js";

function toVisitorSessionResponse(tokens: VisitorSessionTokens): VisitorSessionResponse {
  return {
    accessToken: tokens.accessToken,
    accessTokenExpiresAt: tokens.accessTokenExpiresAt.toISOString(),
    refreshToken: tokens.refreshToken,
  };
}

@Controller("visitor/session")
@Zone("public")
export class VisitorSessionController {
  constructor(@Inject(VisitorSessionsService) private readonly sessions: VisitorSessionsService) {}

  @Post()
  @ZodResponse({ status: 201, type: VisitorSessionResponseDto })
  async create(@Body() body: VisitorSessionRequestDto): Promise<VisitorSessionResponse> {
    const tokens = await this.sessions.create(body.publicKey);
    if (tokens === undefined) {
      throw new ApiException({ code: "unauthorized", message: "Public key is invalid" });
    }
    return toVisitorSessionResponse(tokens);
  }

  @Post("refresh")
  @HttpCode(200)
  @ZodResponse({ status: 200, type: VisitorSessionResponseDto })
  async refresh(@Body() body: VisitorSessionRefreshRequestDto): Promise<VisitorSessionResponse> {
    const tokens = await this.sessions.refresh(body.refreshToken);
    if (tokens === undefined) {
      throw new ApiException({ code: "unauthorized", message: "Refresh token is invalid" });
    }
    return toVisitorSessionResponse(tokens);
  }
}
