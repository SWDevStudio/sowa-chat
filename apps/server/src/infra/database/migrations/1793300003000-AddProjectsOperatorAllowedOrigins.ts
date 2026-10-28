import { MigrationInterface, QueryRunner } from "typeorm";

export class AddProjectsOperatorAllowedOrigins1793300003000 implements MigrationInterface {
  name = "AddProjectsOperatorAllowedOrigins1793300003000";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "projects" ADD "operator_allowed_origins" text array NOT NULL DEFAULT '{}'
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "projects" DROP COLUMN "operator_allowed_origins"
        `);
  }
}
