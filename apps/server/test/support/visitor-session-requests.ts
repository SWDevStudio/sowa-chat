import type { VisitorSessionResponse } from "@sowa-chat/protocol";
import request from "supertest";
import type { DataSource } from "typeorm";
import type { Project } from "../../src/domain/projects/project.entity.js";
import { generateKey } from "../../src/domain/keys/key-format.js";
import { VisitorSession } from "../../src/domain/visitors/visitor-session.entity.js";
import { createProject } from "./fixtures.js";
import { sha256 } from "./visitor-session-values.js";

const sessionPath = "/v1/visitor/session";
const refreshPath = "/v1/visitor/session/refresh";

function api(port: number) {
  return request(`http://127.0.0.1:${port}`);
}

export function postVisitorSession(port: number, body: object) {
  return api(port).post(sessionPath).send(body);
}

export function postVisitorSessionRefresh(port: number, body: object) {
  return api(port).post(refreshPath).send(body);
}

export async function createProjectWithPublicKey(
  dataSource: DataSource,
): Promise<{ project: Project; publicKey: string }> {
  const publicKey = generateKey("publicKey");
  const project = await createProject(dataSource, { publicKey });
  return { project, publicKey };
}

export async function startVisitorSession(
  port: number,
  publicKey: string,
): Promise<VisitorSessionResponse> {
  const response = await postVisitorSession(port, { publicKey });
  if (response.status !== 201) {
    throw new Error(`Visitor session was not created: ${response.status}`);
  }
  return response.body;
}

export function findSessionByRefreshToken(
  dataSource: DataSource,
  refreshToken: string,
): Promise<VisitorSession> {
  return dataSource
    .getRepository(VisitorSession)
    .findOneByOrFail({ refreshHash: sha256(refreshToken) });
}

export function findFamilySessions(
  dataSource: DataSource,
  familyId: string,
): Promise<VisitorSession[]> {
  return dataSource
    .getRepository(VisitorSession)
    .find({ where: { familyId }, order: { id: "ASC" } });
}

export function findAllSessions(dataSource: DataSource): Promise<VisitorSession[]> {
  return dataSource.getRepository(VisitorSession).find({ order: { id: "ASC" } });
}
