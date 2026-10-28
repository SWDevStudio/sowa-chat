import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAuditLog1793200000000 implements MigrationInterface {
  name = "CreateAuditLog1793200000000";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "audit_log" (
                "id" uuid NOT NULL DEFAULT uuidv7(),
                "project_id" uuid,
                "actor_kind" text NOT NULL,
                "actor_id" text,
                "action" text NOT NULL,
                "target_kind" text NOT NULL,
                "target_id" text,
                "data" jsonb NOT NULL DEFAULT '{}',
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                CONSTRAINT "CHK_audit_log_actor_kind" CHECK ("actor_kind" IN ('system', 'cli', 'server', 'operator', 'bot', 'visitor')),
                CONSTRAINT "PK_audit_log" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_audit_log_project_id_created_at" ON "audit_log" ("project_id", "created_at")
        `);
    await queryRunner.query(`
            ALTER TABLE "audit_log" ADD CONSTRAINT "FK_audit_log_project_id" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE "audit_log"
        `);
  }
}
