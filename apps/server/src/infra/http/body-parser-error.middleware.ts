import { HttpException } from "@nestjs/common";
import type { NextFunction, Request, Response } from "express";

export function bodyParserErrorToHttpException(
  error: unknown,
  _request: Request,
  _response: Response,
  next: NextFunction,
): void {
  if (!isBodyParserError(error)) {
    next(error);
    return;
  }
  next(new HttpException(error.message, error.status));
}

interface BodyParserError extends Error {
  status: number;
  type: string;
}

function isBodyParserError(error: unknown): error is BodyParserError {
  return (
    error instanceof Error &&
    "status" in error &&
    typeof error.status === "number" &&
    "type" in error
  );
}
