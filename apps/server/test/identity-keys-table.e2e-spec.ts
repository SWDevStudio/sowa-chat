import { randomUUID } from "node:crypto";
import type { JWK } from "jose";
import { IdentityKey, identityKeyAlgorithms } from "../src/domain/keys/identity-key.entity.js";
import { createProject } from "./support/fixtures.js";
import { useTestDatabase } from "./support/test-database.js";

interface ColumnRow {
  column_name: string;
  data_type: string;
  is_nullable: string;
}

const expectedColumns: Record<string, { type: string; nullable: string }> = {
  id: { type: "uuid", nullable: "NO" },
  project_id: { type: "uuid", nullable: "NO" },
  kid: { type: "text", nullable: "NO" },
  alg: { type: "text", nullable: "NO" },
  public_key: { type: "jsonb", nullable: "NO" },
  created_at: { type: "timestamp with time zone", nullable: "NO" },
  revoked_at: { type: "timestamp with time zone", nullable: "YES" },
};

const insertSql = `INSERT INTO "identity_keys" ("project_id", "kid", "alg", "public_key") VALUES ($1, $2, $3, $4)`;

const jwk: JWK = { kty: "OKP", crv: "Ed25519", x: "11qYAYKxCrfVS_7TyWQHOg7hcvPapiMlrwIaaPcHURo" };

describe("таблица identity_keys", () => {
  const getDataSource = useTestDatabase();

  it("содержит ровно колонки из задачи с типами и is_nullable", async () => {
    const rows: ColumnRow[] = await getDataSource().query(
      "SELECT column_name, data_type, is_nullable FROM information_schema.columns WHERE table_name = 'identity_keys'",
    );

    const actual = Object.fromEntries(
      rows.map((row) => [row.column_name, { type: row.data_type, nullable: row.is_nullable }]),
    );
    expect(actual).toEqual(expectedColumns);
  });

  it("identityKeyAlgorithms содержит EdDSA и ES256", () => {
    expect([...identityKeyAlgorithms]).toEqual(["EdDSA", "ES256"]);
  });

  it("сущность IdentityKey сохраняет ключ с uuid v7, createdAt и JWK без изменений", async () => {
    const project = await createProject(getDataSource());
    const repository = getDataSource().getRepository(IdentityKey);

    const saved = await repository.save(
      repository.create({ projectId: project.id, kid: "k1", alg: "EdDSA", publicKey: jwk }),
    );

    const stored = await repository.findOneByOrFail({ id: saved.id });
    expect(stored.id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[0-9a-f]{4}-[0-9a-f]{12}$/);
    expect(stored.createdAt).toBeInstanceOf(Date);
    expect(stored.revokedAt).toBeNull();
    expect(stored.publicKey).toEqual(jwk);
  });

  it("принимает оба алгоритма", async () => {
    const project = await createProject(getDataSource());

    await expect(
      getDataSource().query(insertSql, [project.id, "a", "EdDSA", jwk]),
    ).resolves.toBeDefined();
    await expect(
      getDataSource().query(insertSql, [project.id, "b", "ES256", jwk]),
    ).resolves.toBeDefined();
  });

  it("отклоняет второй ключ с тем же kid в проекте кодом 23505", async () => {
    const project = await createProject(getDataSource());
    await getDataSource().query(insertSql, [project.id, "same", "EdDSA", jwk]);

    await expect(
      getDataSource().query(insertSql, [project.id, "same", "ES256", jwk]),
    ).rejects.toMatchObject({ code: "23505" });
  });

  it("принимает тот же kid в разных проектах", async () => {
    const first = await createProject(getDataSource());
    const second = await createProject(getDataSource());
    await getDataSource().query(insertSql, [first.id, "same", "EdDSA", jwk]);

    await expect(
      getDataSource().query(insertSql, [second.id, "same", "EdDSA", jwk]),
    ).resolves.toBeDefined();
  });

  it("отклоняет alg вне EdDSA и ES256 кодом 23514", async () => {
    const project = await createProject(getDataSource());

    await expect(
      getDataSource().query(insertSql, [project.id, "k", "RS256", jwk]),
    ).rejects.toMatchObject({ code: "23514" });
  });

  it("отклоняет projectId несуществующего проекта кодом 23503", async () => {
    await expect(
      getDataSource().query(insertSql, [randomUUID(), "k", "EdDSA", jwk]),
    ).rejects.toMatchObject({ code: "23503" });
  });

  it("удаление проекта удаляет его ключи и не трогает чужие", async () => {
    const project = await createProject(getDataSource());
    const other = await createProject(getDataSource());
    const ownKid = `own_${randomUUID()}`;
    const otherKid = `other_${randomUUID()}`;
    await getDataSource().query(insertSql, [project.id, ownKid, "EdDSA", jwk]);
    await getDataSource().query(insertSql, [other.id, otherKid, "EdDSA", jwk]);

    await getDataSource().query(`DELETE FROM "projects" WHERE "id" = $1`, [project.id]);

    const rows: { kid: string }[] = await getDataSource().query(
      `SELECT "kid" FROM "identity_keys" WHERE "kid" IN ($1, $2)`,
      [ownKid, otherKid],
    );
    expect(rows.map((row) => row.kid)).toEqual([otherKid]);
  });
});
