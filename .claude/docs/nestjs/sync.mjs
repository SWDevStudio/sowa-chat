import { writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const BASE_URL = "https://docs.nestjs.com";
const LICENSE_URL = "https://raw.githubusercontent.com/nestjs/docs.nestjs.com/master/LICENSE";
const CHAPTERS = [
  "controllers",
  "providers",
  "modules",
  "middleware",
  "exception-filters",
  "pipes",
  "guards",
  "interceptors",
  "fundamentals/custom-providers",
  "fundamentals/dynamic-modules",
  "fundamentals/injection-scopes",
  "fundamentals/circular-dependency",
  "fundamentals/lifecycle-events",
  "fundamentals/testing",
  "websockets/gateways",
  "websockets/adapter",
  "application/queues",
];

const dir = path.dirname(fileURLToPath(import.meta.url));

async function download(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${url}: HTTP ${response.status}`);
  return (await response.text()).replaceAll("\r\n", "\n");
}

for (const chapter of CHAPTERS) {
  const file = path.join(dir, `${chapter.replaceAll("/", "-")}.md`);
  await writeFile(file, await download(`${BASE_URL}/${chapter}.md`));
  console.log(`ok ${chapter}`);
}

await writeFile(path.join(dir, "LICENSE"), await download(LICENSE_URL));
console.log("ok LICENSE");
