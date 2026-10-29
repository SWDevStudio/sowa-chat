export const cacheKeys = {
  apiKey: (lookupPrefix: string) => `apiKey:${lookupPrefix}`,
  project: (projectId: string) => `project:${projectId}`,
  projectIdByPublicKey: (publicKey: string) => `projectIdByPublicKey:${publicKey}`,
};
