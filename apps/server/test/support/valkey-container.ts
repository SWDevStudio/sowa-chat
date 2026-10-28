import { GenericContainer, Wait } from "testcontainers";
import type { StartedTestContainer } from "testcontainers";

const valkeyPort = 6379;

export function startValkeyContainer(): Promise<StartedTestContainer> {
  return new GenericContainer("valkey/valkey:9.2")
    .withExposedPorts(valkeyPort)
    .withWaitStrategy(Wait.forLogMessage("Ready to accept connections"))
    .start();
}

export function valkeyUrl(container: StartedTestContainer): string {
  return `redis://${container.getHost()}:${container.getMappedPort(valkeyPort)}`;
}
