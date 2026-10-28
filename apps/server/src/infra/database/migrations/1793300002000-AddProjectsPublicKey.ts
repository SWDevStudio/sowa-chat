import { MigrationInterface, QueryRunner } from "typeorm";

export class AddProjectsPublicKey1793300002000 implements MigrationInterface {
  name = "AddProjectsPublicKey1793300002000";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "projects" ADD "public_key" text
        `);
    await queryRunner.query(`
            ALTER TABLE "projects" ADD CONSTRAINT "UQ_projects_public_key" UNIQUE ("public_key")
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "projects" DROP CONSTRAINT "UQ_projects_public_key"
        `);
    await queryRunner.query(`
            ALTER TABLE "projects" DROP COLUMN "public_key"
        `);
  }
}
