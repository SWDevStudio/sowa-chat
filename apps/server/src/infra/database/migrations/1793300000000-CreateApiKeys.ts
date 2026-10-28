import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateApiKeys1793300000000 implements MigrationInterface {
  name = "CreateApiKeys1793300000000";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "api_keys" (
                "id" uuid NOT NULL DEFAULT uuidv7(),
                "project_id" uuid NOT NULL,
                "kind" text NOT NULL,
                "prefix" text NOT NULL,
                "key_hash" bytea NOT NULL,
                "bot_id" uuid,
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "last_used_at" TIMESTAMP WITH TIME ZONE,
                "revoked_at" TIMESTAMP WITH TIME ZONE,
                CONSTRAINT "UQ_api_keys_prefix" UNIQUE ("prefix"),
                CONSTRAINT "CHK_api_keys_kind" CHECK ("kind" IN ('server', 'bot')),
                CONSTRAINT "CHK_api_keys_bot_id" CHECK (("kind" = 'bot') = ("bot_id" IS NOT NULL)),
                CONSTRAINT "PK_api_keys" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_api_keys_project_id" ON "api_keys" ("project_id")
        `);
    await queryRunner.query(`
            ALTER TABLE "api_keys" ADD CONSTRAINT "FK_api_keys_project_id" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE "api_keys"
        `);
  }
}
