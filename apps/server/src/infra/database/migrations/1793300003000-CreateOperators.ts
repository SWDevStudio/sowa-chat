import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateOperators1793300003000 implements MigrationInterface {
  name = "CreateOperators1793300003000";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "operators" (
                "id" uuid NOT NULL DEFAULT uuidv7(),
                "project_id" uuid NOT NULL,
                "external_id" text NOT NULL,
                "name" text NOT NULL,
                "avatar_url" text,
                "role" text NOT NULL,
                "max_chats" integer,
                "disabled_at" TIMESTAMP WITH TIME ZONE,
                CONSTRAINT "UQ_operators_project_id_external_id" UNIQUE ("project_id", "external_id"),
                CONSTRAINT "CHK_operators_role" CHECK ("role" IN ('operator', 'supervisor')),
                CONSTRAINT "PK_operators" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            ALTER TABLE "operators" ADD CONSTRAINT "FK_operators_project_id" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE "operators"
        `);
  }
}
