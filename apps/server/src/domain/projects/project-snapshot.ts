import type { JsonObject } from "@sowa-chat/protocol";
import type { Project } from "./project.entity.js";

export interface ProjectSnapshot {
  id: string;
  name: string;
  publicKey: string | null;
  allowedOrigins: string[];
  operatorAllowedOrigins: string[];
  settings: JsonObject;
}

export function toProjectSnapshot(project: Project): ProjectSnapshot {
  return {
    id: project.id,
    name: project.name,
    publicKey: project.publicKey,
    allowedOrigins: project.allowedOrigins,
    operatorAllowedOrigins: project.operatorAllowedOrigins,
    settings: project.settings,
  };
}
