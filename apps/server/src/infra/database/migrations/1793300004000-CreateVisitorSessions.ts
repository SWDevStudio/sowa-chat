import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateVisitorSessions1793300004000 implements MigrationInterface {
  name = "CreateVisitorSessions1793300004000";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "visitor_sessions" (
                "id" uuid NOT NULL DEFAULT uuidv7(),
                "visitor_id" uuid NOT NULL,
                "family_id" uuid NOT NULL,
                "refresh_hash" bytea NOT NULL,
                "expires_at" TIMESTAMP WITH TIME ZONE NOT NULL,
                "used_at" TIMESTAMP WITH TIME ZONE,
                "revoked_at" TIMESTAMP WITH TIME ZONE,
                CONSTRAINT "UQ_visitor_sessions_refresh_hash" UNIQUE ("refresh_hash"),
                CONSTRAINT "PK_visitor_sessions" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_visitor_sessions_family_id" ON "visitor_sessions" ("family_id")
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_visitor_sessions_visitor_id" ON "visitor_sessions" ("visitor_id")
        `);
    await queryRunner.query(`
            ALTER TABLE "visitor_sessions" ADD CONSTRAINT "FK_visitor_sessions_visitor_id" FOREIGN KEY ("visitor_id") REFERENCES "visitors"("id") ON DELETE CASCADE
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE "visitor_sessions"
        `);
  }
}
