import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const directory = mkdtempSync(join(tmpdir(), "sowa-dev-e2e-"));
process.env.SOWA_DEV_SECRETS_DIR = directory;

afterAll(() => {
  rmSync(directory, { recursive: true, force: true });
});
