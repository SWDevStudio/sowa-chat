import { Global, Module } from "@nestjs/common";
import { RequestContext } from "./request-context.js";

@Global()
@Module({
  providers: [RequestContext],
  exports: [RequestContext],
})
export class RequestContextModule {}
