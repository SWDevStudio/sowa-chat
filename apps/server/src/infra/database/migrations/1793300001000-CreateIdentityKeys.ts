import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateIdentityKeys1793300001000 implements MigrationInterface {
  name = "CreateIdentityKeys1793300001000";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "identity_keys" (
                "id" uuid NOT NULL DEFAULT uuidv7(),
                "project_id" uuid NOT NULL,
                "kid" text NOT NULL,
                "alg" text NOT NULL,
                "public_key" jsonb NOT NULL,
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "revoked_at" TIMESTAMP WITH TIME ZONE,
                CONSTRAINT "UQ_identity_keys_project_id_kid" UNIQUE ("project_id", "kid"),
                CONSTRAINT "CHK_identity_keys_alg" CHECK ("alg" IN ('EdDSA', 'ES256')),
                CONSTRAINT "PK_identity_keys" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            ALTER TABLE "identity_keys" ADD CONSTRAINT "FK_identity_keys_project_id" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE "identity_keys"
        `);
  }
}
