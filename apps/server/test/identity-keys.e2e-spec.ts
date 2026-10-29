import { Test } from "@nestjs/testing";
import type { TestingModule } from "@nestjs/testing";
import { randomUUID } from "node:crypto";
import { InvalidIdentityKeyError } from "../src/domain/keys/identity-key-pem.js";
import {
  IdentityKeyKidTakenError,
  IdentityKeysService,
  InvalidIdentityKeyIdError,
} from "../src/domain/keys/identity-keys.service.js";
import { KeysModule } from "../src/domain/keys/keys.module.js";
import { DomainEventBus } from "../src/telemetry/events/domain-event-bus.js";
import { WorkerModule } from "../src/worker.module.js";
import { createProject } from "./support/fixtures.js";
import { auditRows, auditRowsByAction, identityKeyRows } from "./support/identity-key-rows.js";
import { generateEd25519Pems, generateP256Pems } from "./support/identity-pems.js";
import { useTestDatabase } from "./support/test-database.js";

describe("сервис identity-ключей: add", () => {
  const getDataSource = useTestDatabase();
  let moduleRef: TestingModule;
  let service: IdentityKeysService;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [WorkerModule, KeysModule],
    }).compile();
    await moduleRef.init();
    service = moduleRef.get(IdentityKeysService);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  afterAll(async () => {
    await moduleRef?.close();
  });

  async function expectNoRows(): Promise<void> {
    expect(await identityKeyRows(getDataSource())).toEqual([]);
    expect(await auditRows(getDataSource())).toEqual([]);
  }

  it("Ed25519: строка с alg EdDSA и JWK без d, ответ с identityKeyId, kid и alg", async () => {
    const project = await createProject(getDataSource());

    const added = await service.add({
      projectId: project.id,
      kid: "main-1",
      pem: generateEd25519Pems().publicPem,
      actorKind: "cli",
    });

    expect(added).toEqual({ identityKeyId: expect.any(String), kid: "main-1", alg: "EdDSA" });
    const [row, ...others] = await identityKeyRows(getDataSource());
    expect(others).toEqual([]);
    expect(row).toMatchObject({
      id: added.identityKeyId,
      projectId: project.id,
      kid: "main-1",
      alg: "EdDSA",
      revokedAt: null,
    });
    expect(row?.publicKey).toMatchObject({ kty: "OKP", crv: "Ed25519" });
    expect(row?.publicKey).not.toHaveProperty("d");
  });

  it("P-256: строка с alg ES256 и JWK без d", async () => {
    const project = await createProject(getDataSource());

    const added = await service.add({
      projectId: project.id,
      kid: "main-2",
      pem: generateP256Pems().publicPem,
      actorKind: "cli",
    });

    expect(added.alg).toBe("ES256");
    const [row] = await identityKeyRows(getDataSource());
    expect(row?.alg).toBe("ES256");
    expect(row?.publicKey).toMatchObject({ kty: "EC", crv: "P-256" });
    expect(row?.publicKey).not.toHaveProperty("d");
  });

  it("kid из 128 символов и все допустимые символы проходят", async () => {
    const project = await createProject(getDataSource());
    const kids = ["a".repeat(128), "A.b_c-9", "x"];

    for (const kid of kids) {
      await service.add({
        projectId: project.id,
        kid,
        pem: generateEd25519Pems().publicPem,
        actorKind: "cli",
      });
    }

    const stored = (await identityKeyRows(getDataSource())).map((row) => row.kid);
    expect(stored).toEqual(kids);
  });

  it.each([[""], ["a".repeat(129)], ["a b"], ["a/b"], ["a:b"], ["ключ"], ["a\n"]])(
    "неверный kid %j — InvalidIdentityKeyIdError, строк и журнала нет",
    async (kid) => {
      const project = await createProject(getDataSource());

      await expect(
        service.add({
          projectId: project.id,
          kid,
          pem: generateEd25519Pems().publicPem,
          actorKind: "cli",
        }),
      ).rejects.toThrow(InvalidIdentityKeyIdError);

      await expectNoRows();
    },
  );

  it("текст ошибки неверного kid назван в задаче", async () => {
    const project = await createProject(getDataSource());

    await expect(
      service.add({
        projectId: project.id,
        kid: "bad kid",
        pem: generateEd25519Pems().publicPem,
        actorKind: "cli",
      }),
    ).rejects.toThrow('Invalid kid "bad kid": use 1-128 characters A-Z, a-z, 0-9, ".", "_", "-"');
  });

  it.each([
    ["Ed25519", generateEd25519Pems],
    ["P-256", generateP256Pems],
  ])("приватный PEM %s — ошибка, строк и журнала нет", async (_name, generate) => {
    const project = await createProject(getDataSource());

    await expect(
      service.add({
        projectId: project.id,
        kid: "leaked",
        pem: generate().privatePem,
        actorKind: "cli",
      }),
    ).rejects.toThrow(InvalidIdentityKeyError);

    await expectNoRows();
  });

  it("не PEM — ошибка, строк и журнала нет", async () => {
    const project = await createProject(getDataSource());

    await expect(
      service.add({ projectId: project.id, kid: "junk", pem: "not a pem", actorKind: "cli" }),
    ).rejects.toThrow(InvalidIdentityKeyError);

    await expectNoRows();
  });

  it("повторный kid в проекте — IdentityKeyKidTakenError с текстом из задачи, новой строки нет", async () => {
    const project = await createProject(getDataSource());
    const first = await service.add({
      projectId: project.id,
      kid: "dup",
      pem: generateEd25519Pems().publicPem,
      actorKind: "cli",
    });

    const second = service.add({
      projectId: project.id,
      kid: "dup",
      pem: generateP256Pems().publicPem,
      actorKind: "cli",
    });

    await expect(second).rejects.toThrow(IdentityKeyKidTakenError);
    await expect(second).rejects.toThrow('Identity key "dup" already exists in this project');
    const rows = await identityKeyRows(getDataSource());
    expect(rows.map((row) => row.id)).toEqual([first.identityKeyId]);
    expect(await auditRowsByAction(getDataSource(), "identityKey.added")).toHaveLength(1);
  });

  it("kid отозванного ключа занят", async () => {
    const project = await createProject(getDataSource());
    await service.add({
      projectId: project.id,
      kid: "old",
      pem: generateEd25519Pems().publicPem,
      actorKind: "cli",
    });
    await service.revoke({ projectId: project.id, kid: "old", actorKind: "cli" });

    await expect(
      service.add({
        projectId: project.id,
        kid: "old",
        pem: generateEd25519Pems().publicPem,
        actorKind: "cli",
      }),
    ).rejects.toThrow(IdentityKeyKidTakenError);

    expect(await identityKeyRows(getDataSource())).toHaveLength(1);
  });

  it("тот же kid в другом проекте сохраняется", async () => {
    const first = await createProject(getDataSource());
    const second = await createProject(getDataSource());

    for (const project of [first, second]) {
      await service.add({
        projectId: project.id,
        kid: "shared",
        pem: generateEd25519Pems().publicPem,
        actorKind: "cli",
      });
    }

    const rows = await identityKeyRows(getDataSource());
    expect(rows.map((row) => row.projectId).sort()).toEqual([first.id, second.id].sort());
  });

  it("несуществующий проект — ошибка, строк и журнала нет", async () => {
    await expect(
      service.add({
        projectId: randomUUID(),
        kid: "orphan",
        pem: generateEd25519Pems().publicPem,
        actorKind: "cli",
      }),
    ).rejects.toThrow();

    await expectNoRows();
  });

  it("сбой публикации события откатывает строку ключа", async () => {
    const project = await createProject(getDataSource());
    vi.spyOn(moduleRef.get(DomainEventBus), "publish").mockRejectedValue(new Error("bus down"));

    await expect(
      service.add({
        projectId: project.id,
        kid: "rolled-back",
        pem: generateEd25519Pems().publicPem,
        actorKind: "cli",
      }),
    ).rejects.toThrow("bus down");

    expect(await identityKeyRows(getDataSource())).toEqual([]);
  });

  it("журнал: identityKey.added с data { kid, alg }, без самого ключа", async () => {
    const project = await createProject(getDataSource());
    const { publicPem } = generateP256Pems();

    const added = await service.add({
      projectId: project.id,
      kid: "audited",
      pem: publicPem,
      actorKind: "system",
    });

    const rows = await auditRows(getDataSource());
    expect(rows).toHaveLength(1);
    expect(rows[0]).toMatchObject({
      action: "identityKey.added",
      projectId: project.id,
      actorKind: "system",
      actorId: null,
      targetKind: "identityKey",
      targetId: added.identityKeyId,
      data: { kid: "audited", alg: "ES256" },
    });
    const [stored] = await identityKeyRows(getDataSource());
    const serialized = JSON.stringify(rows);
    expect(serialized).not.toContain(JSON.stringify(stored?.publicKey));
    expect(serialized).not.toContain(stored?.publicKey.x ?? "missing");
    expect(serialized).not.toContain("BEGIN");
  });
});
