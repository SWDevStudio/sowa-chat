import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateChatTables1793215389271 implements MigrationInterface {
  name = "CreateChatTables1793215389271";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await this.createChannels(queryRunner);
    await this.createVisitors(queryRunner);
    await this.createConversations(queryRunner);
    await this.createMessages(queryRunner);
    await this.createParticipants(queryRunner);
    await this.addForeignKeys(queryRunner);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await this.dropForeignKeys(queryRunner);
    await queryRunner.query(`
            DROP TABLE "participants"
        `);
    await queryRunner.query(`
            DROP INDEX "public"."IDX_6c6ea2ab4c0804750cd95eefa8"
        `);
    await queryRunner.query(`
            DROP INDEX "public"."IDX_7c58b9e0cdd899c23f776c42d9"
        `);
    await queryRunner.query(`
            DROP TABLE "messages"
        `);
    await queryRunner.query(`
            DROP TABLE "conversation_events"
        `);
    await queryRunner.query(`
            DROP TABLE "conversations"
        `);
    await queryRunner.query(`
            DROP INDEX "public"."IDX_9fdc42cd02e9078ee924b4ec44"
        `);
    await queryRunner.query(`
            DROP INDEX "public"."IDX_7cdfa1b4a76d8c7154c62e4cc9"
        `);
    await queryRunner.query(`
            DROP TABLE "visitors"
        `);
    await queryRunner.query(`
            DROP TABLE "channels"
        `);
  }

  private async createChannels(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "channels" (
                "id" uuid NOT NULL DEFAULT uuidv7(),
                "project_id" uuid NOT NULL,
                "kind" text NOT NULL,
                "is_active" boolean NOT NULL DEFAULT true,
                CONSTRAINT "PK_bc603823f3f741359c2339389f9" PRIMARY KEY ("id")
            )
        `);
  }

  private async createVisitors(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "visitors" (
                "id" uuid NOT NULL DEFAULT uuidv7(),
                "project_id" uuid NOT NULL,
                "display_code" integer,
                "external_id" text,
                "name" text,
                "email" text,
                "phone" text,
                "data" jsonb NOT NULL DEFAULT '{}',
                "tech" jsonb NOT NULL DEFAULT '{}',
                "merged_into_id" uuid,
                "first_seen_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "last_seen_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                CONSTRAINT "PK_d0fd6e34a516c2bb3bbec71abde" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE UNIQUE INDEX "IDX_7cdfa1b4a76d8c7154c62e4cc9" ON "visitors" ("project_id", "external_id")
        `);
    await queryRunner.query(`
            CREATE UNIQUE INDEX "IDX_9fdc42cd02e9078ee924b4ec44" ON "visitors" ("project_id", "display_code")
        `);
  }

  private async createConversations(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "conversations" (
                "id" uuid NOT NULL DEFAULT uuidv7(),
                "project_id" uuid NOT NULL,
                "visitor_id" uuid NOT NULL,
                "channel_id" uuid NOT NULL,
                "status" text NOT NULL,
                "assignee_id" uuid,
                "active_bot_id" uuid,
                "context" jsonb NOT NULL DEFAULT '{}',
                "handoff" jsonb,
                "last_seq" integer NOT NULL DEFAULT '0',
                "last_message_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "routing_cycle" jsonb,
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "closed_at" TIMESTAMP WITH TIME ZONE,
                "close_reason" text,
                CONSTRAINT "PK_ee34f4f7ced4ec8681f26bf04ef" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "conversation_events" (
                "id" uuid NOT NULL DEFAULT uuidv7(),
                "conversation_id" uuid NOT NULL,
                "type" text NOT NULL,
                "actor_kind" text NOT NULL,
                "actor_id" uuid,
                "data" jsonb NOT NULL DEFAULT '{}',
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                CONSTRAINT "PK_d69d1aeac5bf8d33983a582653d" PRIMARY KEY ("id")
            )
        `);
  }

  private async createMessages(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "messages" (
                "id" uuid NOT NULL DEFAULT uuidv7(),
                "conversation_id" uuid NOT NULL,
                "seq" integer NOT NULL,
                "sender_kind" text NOT NULL,
                "sender_id" uuid,
                "type" text NOT NULL,
                "custom_type" text,
                "body" text,
                "payload" jsonb,
                "is_internal" boolean NOT NULL DEFAULT false,
                "client_msg_id" uuid,
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                CONSTRAINT "PK_18325f38ae6de43878487eff986" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE UNIQUE INDEX "IDX_7c58b9e0cdd899c23f776c42d9" ON "messages" ("conversation_id", "client_msg_id")
        `);
    await queryRunner.query(`
            CREATE UNIQUE INDEX "IDX_6c6ea2ab4c0804750cd95eefa8" ON "messages" ("conversation_id", "seq")
        `);
  }

  private async createParticipants(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "participants" (
                "conversation_id" uuid NOT NULL,
                "kind" text NOT NULL,
                "participant_id" uuid NOT NULL,
                "last_delivered_seq" integer NOT NULL DEFAULT '0',
                "last_read_seq" integer NOT NULL DEFAULT '0',
                "joined_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "left_at" TIMESTAMP WITH TIME ZONE,
                CONSTRAINT "PK_563ea6ef555dded56ad204127b5" PRIMARY KEY ("conversation_id", "kind", "participant_id")
            )
        `);
  }

  private async addForeignKeys(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "channels"
            ADD CONSTRAINT "FK_63c4e21cafd9504a7c139144d1c" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "visitors"
            ADD CONSTRAINT "FK_7fde2a51625e05754083d2b98f1" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "visitors"
            ADD CONSTRAINT "FK_20fbe74764538f8d65c11562b50" FOREIGN KEY ("merged_into_id") REFERENCES "visitors"("id") ON DELETE
            SET NULL ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "conversations"
            ADD CONSTRAINT "FK_9f16876c6b675f1f683e604b511" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "conversations"
            ADD CONSTRAINT "FK_5e69b83b44d285e714d9349a8fe" FOREIGN KEY ("visitor_id") REFERENCES "visitors"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "conversations"
            ADD CONSTRAINT "FK_1a99838ee2e2e940ad98ed2e9d8" FOREIGN KEY ("channel_id") REFERENCES "channels"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "conversation_events"
            ADD CONSTRAINT "FK_ba970f7c2f1f3d96bcfbda1a998" FOREIGN KEY ("conversation_id") REFERENCES "conversations"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "messages"
            ADD CONSTRAINT "FK_3bc55a7c3f9ed54b520bb5cfe23" FOREIGN KEY ("conversation_id") REFERENCES "conversations"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "participants"
            ADD CONSTRAINT "FK_de8978490834e2e9cb3c3fc8066" FOREIGN KEY ("conversation_id") REFERENCES "conversations"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
  }

  private async dropForeignKeys(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "participants" DROP CONSTRAINT "FK_de8978490834e2e9cb3c3fc8066"
        `);
    await queryRunner.query(`
            ALTER TABLE "messages" DROP CONSTRAINT "FK_3bc55a7c3f9ed54b520bb5cfe23"
        `);
    await queryRunner.query(`
            ALTER TABLE "conversation_events" DROP CONSTRAINT "FK_ba970f7c2f1f3d96bcfbda1a998"
        `);
    await queryRunner.query(`
            ALTER TABLE "conversations" DROP CONSTRAINT "FK_1a99838ee2e2e940ad98ed2e9d8"
        `);
    await queryRunner.query(`
            ALTER TABLE "conversations" DROP CONSTRAINT "FK_5e69b83b44d285e714d9349a8fe"
        `);
    await queryRunner.query(`
            ALTER TABLE "conversations" DROP CONSTRAINT "FK_9f16876c6b675f1f683e604b511"
        `);
    await queryRunner.query(`
            ALTER TABLE "visitors" DROP CONSTRAINT "FK_20fbe74764538f8d65c11562b50"
        `);
    await queryRunner.query(`
            ALTER TABLE "visitors" DROP CONSTRAINT "FK_7fde2a51625e05754083d2b98f1"
        `);
    await queryRunner.query(`
            ALTER TABLE "channels" DROP CONSTRAINT "FK_63c4e21cafd9504a7c139144d1c"
        `);
  }
}
