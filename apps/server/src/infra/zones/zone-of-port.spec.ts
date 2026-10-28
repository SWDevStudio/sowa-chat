import { apiZones } from "./zone.js";
import type { ZonePorts } from "./zone.js";
import { zoneOfPort } from "./zone-of-port.js";

const ports: ZonePorts = { public: 8080, operator: 8081, internal: 8082, management: 9090 };

describe("apiZones", () => {
  it("lists the four zones", () => {
    expect([...apiZones]).toEqual(["public", "operator", "internal", "management"]);
  });
});

describe("zoneOfPort", () => {
  it.each([
    [8080, "public"],
    [8081, "operator"],
    [8082, "internal"],
    [9090, "management"],
  ])("returns the zone of port %i", (port, zone) => {
    expect(zoneOfPort(ports, port)).toBe(zone);
  });

  it("returns undefined for a port that belongs to no zone", () => {
    expect(zoneOfPort(ports, 3000)).toBeUndefined();
  });

  it("returns undefined for an undefined port", () => {
    expect(zoneOfPort(ports, undefined)).toBeUndefined();
  });

  it("returns undefined for port 0", () => {
    expect(zoneOfPort(ports, 0)).toBeUndefined();
  });

  it("follows custom ports", () => {
    const custom: ZonePorts = { public: 1, operator: 2, internal: 3, management: 4 };
    expect(zoneOfPort(custom, 3)).toBe("internal");
    expect(zoneOfPort(custom, 8080)).toBeUndefined();
  });
});
