import { Project } from "./domain/projects/project.entity.js";
import type { DatabaseEntity } from "./infra/database/database-options.js";

export const databaseEntities: DatabaseEntity[] = [Project];
