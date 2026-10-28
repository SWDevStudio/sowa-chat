import { Controller, Get } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Zone, zoneMetadataKey } from "./zone.decorator.js";

@Zone("operator")
@Controller("probe")
class ZonedController {
  @Zone("management")
  @Get("zoned")
  zonedMethod(): void {}

  @Get("plain")
  plainMethod(): void {}
}

@Controller("bare")
class BareController {
  @Get()
  bareMethod(): void {}
}

class MethodOnlyController {
  @Zone("internal")
  method(): void {}
}

describe("Zone decorator", () => {
  const reflector = new Reflector();

  it("uses the constant metadata key zone", () => {
    expect(zoneMetadataKey).toBe("zone");
  });

  it("marks a class", () => {
    expect(reflector.get(zoneMetadataKey, ZonedController)).toBe("operator");
  });

  it("marks a method over the class zone", () => {
    const zone = reflector.getAllAndOverride(zoneMetadataKey, [
      ZonedController.prototype.zonedMethod,
      ZonedController,
    ]);
    expect(zone).toBe("management");
  });

  it("falls back to the class zone for a method without decorator", () => {
    const zone = reflector.getAllAndOverride(zoneMetadataKey, [
      ZonedController.prototype.plainMethod,
      ZonedController,
    ]);
    expect(zone).toBe("operator");
  });

  it("marks a method of an undecorated class", () => {
    const zone = reflector.getAllAndOverride(zoneMetadataKey, [
      MethodOnlyController.prototype.method,
      MethodOnlyController,
    ]);
    expect(zone).toBe("internal");
  });

  it("returns undefined when nothing is marked", () => {
    const zone = reflector.getAllAndOverride(zoneMetadataKey, [
      BareController.prototype.bareMethod,
      BareController,
    ]);
    expect(zone).toBeUndefined();
  });

  it("is visible through reflect-metadata with the plain key", () => {
    expect(Reflect.getMetadata("zone", ZonedController)).toBe("operator");
  });
});
