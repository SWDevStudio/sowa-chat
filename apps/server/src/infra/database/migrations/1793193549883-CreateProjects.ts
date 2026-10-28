import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProjects1793193549883 implements MigrationInterface {
  name = "CreateProjects1793193549883";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "projects" (
                "id" uuid NOT NULL DEFAULT uuidv7(),
                "name" text NOT NULL,
                "allowed_origins" text array NOT NULL DEFAULT '{}',
                "settings" jsonb NOT NULL DEFAULT '{}',
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_2187088ab5ef2a918473cb99007" UNIQUE ("name"),
                CONSTRAINT "PK_6271df0a7aed1d6c0691ce6ac50" PRIMARY KEY ("id")
            )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE "projects"
        `);
  }
}
