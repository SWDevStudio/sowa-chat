const FORBIDDEN_CHARACTERS = /[*?#]/;
const ALLOWED_PROTOCOLS = new Set(["http:", "https:"]);

export class InvalidOriginError extends Error {
  constructor(text: string) {
    super(
      `Invalid origin "${text}": expected scheme://host[:port] without path, query or wildcard`,
    );
  }
}

function parseUrl(text: string): URL | undefined {
  try {
    return new URL(text);
  } catch {
    return undefined;
  }
}

function isOriginOnly(url: URL): boolean {
  return (
    ALLOWED_PROTOCOLS.has(url.protocol) &&
    url.username === "" &&
    url.password === "" &&
    url.pathname === "/"
  );
}

export function normalizeOrigin(text: string): string {
  const trimmed = text.trim();
  if (FORBIDDEN_CHARACTERS.test(trimmed)) {
    throw new InvalidOriginError(text);
  }
  const url = parseUrl(trimmed);
  if (url === undefined || !isOriginOnly(url)) {
    throw new InvalidOriginError(text);
  }
  return url.origin;
}

export function normalizeOrigins(texts: string[]): string[] {
  const origins = texts.map((text) => normalizeOrigin(text));
  return [...new Set(origins)];
}
