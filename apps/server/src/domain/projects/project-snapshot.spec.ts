import { projectRow } from "../../../test/support/projects-service-probe.js";
import { toProjectSnapshot } from "./project-snapshot.js";

describe("toProjectSnapshot", () => {
  it("копирует поля проекта без createdAt", () => {
    const project = projectRow({
      id: "project-7",
      name: "shop",
      publicKey: "pk_abc",
      allowedOrigins: ["https://shop.example.com"],
      operatorAllowedOrigins: ["https://ops.example.com"],
      settings: { theme: "dark", nested: { limit: 3 } },
    });

    expect(toProjectSnapshot(project)).toStrictEqual({
      id: "project-7",
      name: "shop",
      publicKey: "pk_abc",
      allowedOrigins: ["https://shop.example.com"],
      operatorAllowedOrigins: ["https://ops.example.com"],
      settings: { theme: "dark", nested: { limit: 3 } },
    });
  });

  it("сохраняет publicKey null и пустые списки", () => {
    const snapshot = toProjectSnapshot(projectRow({ publicKey: null }));

    expect(snapshot.publicKey).toBeNull();
    expect(snapshot.allowedOrigins).toEqual([]);
    expect(snapshot.operatorAllowedOrigins).toEqual([]);
    expect(snapshot.settings).toEqual({});
  });

  it("значение проходит JSON без потерь", () => {
    const project = projectRow({ publicKey: "pk_abc", settings: { a: [1, "b"] } });
    const snapshot = toProjectSnapshot(project);

    expect(JSON.parse(JSON.stringify(snapshot))).toStrictEqual(snapshot);
  });
});
