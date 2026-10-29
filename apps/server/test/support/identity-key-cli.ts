import { generateKeyPairSync } from "node:crypto";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import type { CliRunResult } from "./cli-run.js";
import { runCliInProcess } from "./cli-run.js";
import { generateEd25519Pems, generateP256Pems } from "./identity-pems.js";
import { createMain, outputOf } from "./project-cli.js";

export type PemWriter = (name: string, pem: string) => string;

export const identityKeyListHeader = ["kid", "alg", "createdAt", "status"];

export function generateRsaPublicPem(): string {
  const { publicKey } = generateKeyPairSync("rsa", { modulusLength: 2048 });
  return publicKey.export({ type: "spki", format: "pem" }).toString();
}

export function usePemDirectory(): PemWriter {
  let directory = "";

  beforeAll(() => {
    directory = mkdtempSync(join(tmpdir(), "identity-key-cli-"));
  });

  afterAll(() => {
    rmSync(directory, { recursive: true, force: true });
  });

  return (name, pem) => {
    const path = join(directory, name);
    writeFileSync(path, pem);
    return path;
  };
}

export function addIdentityKey(project: string, kid: string, file: string): Promise<CliRunResult> {
  return runCliInProcess(["identity-key:add", "--project", project, "--kid", kid, "--file", file]);
}

export function listIdentityKeys(project: string): Promise<CliRunResult> {
  return runCliInProcess(["identity-key:list", "--project", project]);
}

export function revokeIdentityKey(project: string, kid: string): Promise<CliRunResult> {
  return runCliInProcess(["identity-key:revoke", "--project", project, "--kid", kid]);
}

export async function addEd25519Key(
  writePem: PemWriter,
  project: string,
  kid: string,
): Promise<CliRunResult> {
  const result = await addIdentityKey(
    project,
    kid,
    writePem(`${project}-${kid}.pem`, generateEd25519Pems().publicPem),
  );
  expect(result.exitCode, outputOf(result)).toBe(0);
  return result;
}

export async function addP256Key(
  writePem: PemWriter,
  project: string,
  kid: string,
): Promise<CliRunResult> {
  const result = await addIdentityKey(
    project,
    kid,
    writePem(`${project}-${kid}.pem`, generateP256Pems().publicPem),
  );
  expect(result.exitCode, outputOf(result)).toBe(0);
  return result;
}

export async function setupMainProject(): Promise<void> {
  const created = await createMain();
  expect(created.exitCode, outputOf(created)).toBe(0);
}
