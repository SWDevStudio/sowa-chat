import { MigrationInterface, QueryRunner } from "typeorm";

export class AddConversationIndexes1793215983154 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE INDEX "IDX_conversations_context" ON "conversations" USING GIN ("context" jsonb_path_ops)`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_conversations_project_status_last_message_at" ON "conversations" ("project_id", "status", "last_message_at" DESC)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "IDX_conversations_project_status_last_message_at"`);
    await queryRunner.query(`DROP INDEX "IDX_conversations_context"`);
  }
}
