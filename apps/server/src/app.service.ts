import { Injectable } from "@nestjs/common";
import { jsonObjectSchema } from "@sowa-chat/protocol";

export const helloContextSchema = jsonObjectSchema;

@Injectable()
export class AppService {
  getHello(): string {
    return "Hello World!";
  }
}
