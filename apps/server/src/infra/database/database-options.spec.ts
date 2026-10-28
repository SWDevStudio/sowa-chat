import { createDataSourceOptions } from "./database-options.js";
import type { DatabaseEntity } from "./database-options.js";

class FirstEntity {}
class SecondEntity {}

const url = "postgres://user:password@db.example.test:5432/sowa";

describe("createDataSourceOptions", () => {
  it("returns postgres options with the given url, pool size and entities", () => {
    const entities: DatabaseEntity[] = [FirstEntity, SecondEntity];

    const options = createDataSourceOptions({ url, poolSize: 7, entities });

    expect(options).toMatchObject({ type: "postgres", url, poolSize: 7, entities });
  });

  it("never enables synchronize", () => {
    const options = createDataSourceOptions({ url, poolSize: 10, entities: [] });

    expect(options.synchronize).toBe(false);
  });

  it("names the connection sowa-chat-server", () => {
    const options = createDataSourceOptions({ url, poolSize: 10, entities: [] });

    expect(options).toMatchObject({ applicationName: "sowa-chat-server" });
  });

  it("limits the connect timeout to 5 seconds", () => {
    const options = createDataSourceOptions({ url, poolSize: 10, entities: [] });

    expect(options).toMatchObject({ connectTimeoutMS: 5000 });
  });

  it("passes an empty entity list and the smallest pool through", () => {
    const options = createDataSourceOptions({ url, poolSize: 1, entities: [] });

    expect(options).toMatchObject({ entities: [], poolSize: 1 });
  });
});
