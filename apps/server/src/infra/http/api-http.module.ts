import { Module } from "@nestjs/common";
import { APP_FILTER, APP_PIPE } from "@nestjs/core";
import { ZodValidationPipe } from "nestjs-zod";
import { HttpErrorFilter } from "./http-error.filter.js";

@Module({
  providers: [
    { provide: APP_PIPE, useClass: ZodValidationPipe },
    { provide: APP_FILTER, useClass: HttpErrorFilter },
  ],
})
export class ApiHttpModule {}
