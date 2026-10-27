const sensitiveHeaders = [
  "req.headers.authorization",
  "req.headers.cookie",
  'req.headers["x-api-key"]',
  'res.headers["set-cookie"]',
];

const sensitiveFields = [
  "token",
  "accessToken",
  "refreshToken",
  "publicKey",
  "serverKey",
  "botKey",
  "secret",
  "password",
  "key",
  "text",
  "body",
  "email",
  "phone",
  "name",
  "context",
  "visitorData",
  "payload",
];

export const redactPaths = [
  ...sensitiveHeaders,
  ...sensitiveFields,
  ...sensitiveFields.map((field) => `*.${field}`),
];
