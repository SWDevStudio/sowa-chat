import { Body, Controller, HttpCode, Inject, Post, UseFilters } from "@nestjs/common";
import type { VisitorSessionResponse } from "@sowa-chat/protocol";
import { ZodResponse } from "nestjs-zod";
import {
  type VisitorSessionTokens,
  VisitorSessionsService,
} from "../../domain/visitors/visitor-sessions.service.js";
import { Zone } from "../../infra/zones/zone.decorator.js";
import { InvalidPublicKeyFilter } from "./invalid-public-key.filter.js";
import { InvalidRefreshTokenFilter } from "./invalid-refresh-token.filter.js";
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
  @UseFilters(InvalidPublicKeyFilter)
  @ZodResponse({ status: 201, type: VisitorSessionResponseDto })
  async create(@Body() body: VisitorSessionRequestDto): Promise<VisitorSessionResponse> {
    const tokens = await this.sessions.create(body.publicKey);
    return toVisitorSessionResponse(tokens);
  }

  @Post("refresh")
  @UseFilters(InvalidRefreshTokenFilter)
  @HttpCode(200)
  @ZodResponse({ status: 200, type: VisitorSessionResponseDto })
  async refresh(@Body() body: VisitorSessionRefreshRequestDto): Promise<VisitorSessionResponse> {
    const tokens = await this.sessions.refresh(body.refreshToken);
    return toVisitorSessionResponse(tokens);
  }
}
