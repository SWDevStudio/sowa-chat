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
            DROP INDEX "public"."IDX_messages_conversation_id_seq"
        `);
    await queryRunner.query(`
            DROP INDEX "public"."IDX_messages_conversation_id_client_msg_id"
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
            DROP INDEX "public"."IDX_visitors_project_id_display_code"
        `);
    await queryRunner.query(`
            DROP INDEX "public"."IDX_visitors_project_id_external_id"
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
                CONSTRAINT "PK_channels" PRIMARY KEY ("id")
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
                CONSTRAINT "PK_visitors" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE UNIQUE INDEX "IDX_visitors_project_id_external_id" ON "visitors" ("project_id", "external_id")
        `);
    await queryRunner.query(`
            CREATE UNIQUE INDEX "IDX_visitors_project_id_display_code" ON "visitors" ("project_id", "display_code")
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
                CONSTRAINT "CHK_conversations_status" CHECK ("status" IN ('bot', 'queued', 'assigned', 'resolved')),
                CONSTRAINT "CHK_conversations_close_reason" CHECK ("close_reason" IN ('operator', 'inactivity', 'bot')),
                CONSTRAINT "PK_conversations" PRIMARY KEY ("id")
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
                CONSTRAINT "CHK_conversation_events_actor_kind" CHECK ("actor_kind" IN ('visitor', 'operator', 'bot', 'system')),
                CONSTRAINT "PK_conversation_events" PRIMARY KEY ("id")
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
                CONSTRAINT "CHK_messages_sender_kind" CHECK ("sender_kind" IN ('visitor', 'operator', 'bot', 'system')),
                CONSTRAINT "CHK_messages_type" CHECK ("type" IN ('text', 'media', 'system', 'custom')),
                CONSTRAINT "PK_messages" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE UNIQUE INDEX "IDX_messages_conversation_id_client_msg_id" ON "messages" ("conversation_id", "client_msg_id")
        `);
    await queryRunner.query(`
            CREATE UNIQUE INDEX "IDX_messages_conversation_id_seq" ON "messages" ("conversation_id", "seq")
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
                CONSTRAINT "CHK_participants_kind" CHECK ("kind" IN ('visitor', 'operator', 'bot')),
                CONSTRAINT "PK_participants" PRIMARY KEY ("conversation_id", "kind", "participant_id")
            )
        `);
  }

  private async addForeignKeys(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "channels"
            ADD CONSTRAINT "FK_channels_project_id" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "visitors"
            ADD CONSTRAINT "FK_visitors_project_id" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "visitors"
            ADD CONSTRAINT "FK_visitors_merged_into_id" FOREIGN KEY ("merged_into_id") REFERENCES "visitors"("id") ON DELETE
            SET NULL ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "conversations"
            ADD CONSTRAINT "FK_conversations_project_id" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "conversations"
            ADD CONSTRAINT "FK_conversations_visitor_id" FOREIGN KEY ("visitor_id") REFERENCES "visitors"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "conversations"
            ADD CONSTRAINT "FK_conversations_channel_id" FOREIGN KEY ("channel_id") REFERENCES "channels"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "conversation_events"
            ADD CONSTRAINT "FK_conversation_events_conversation_id" FOREIGN KEY ("conversation_id") REFERENCES "conversations"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "messages"
            ADD CONSTRAINT "FK_messages_conversation_id" FOREIGN KEY ("conversation_id") REFERENCES "conversations"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "participants"
            ADD CONSTRAINT "FK_participants_conversation_id" FOREIGN KEY ("conversation_id") REFERENCES "conversations"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
  }

  private async dropForeignKeys(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "participants" DROP CONSTRAINT "FK_participants_conversation_id"
        `);
    await queryRunner.query(`
            ALTER TABLE "messages" DROP CONSTRAINT "FK_messages_conversation_id"
        `);
    await queryRunner.query(`
            ALTER TABLE "conversation_events" DROP CONSTRAINT "FK_conversation_events_conversation_id"
        `);
    await queryRunner.query(`
            ALTER TABLE "conversations" DROP CONSTRAINT "FK_conversations_channel_id"
        `);
    await queryRunner.query(`
            ALTER TABLE "conversations" DROP CONSTRAINT "FK_conversations_visitor_id"
        `);
    await queryRunner.query(`
            ALTER TABLE "conversations" DROP CONSTRAINT "FK_conversations_project_id"
        `);
    await queryRunner.query(`
            ALTER TABLE "visitors" DROP CONSTRAINT "FK_visitors_merged_into_id"
        `);
    await queryRunner.query(`
            ALTER TABLE "visitors" DROP CONSTRAINT "FK_visitors_project_id"
        `);
    await queryRunner.query(`
            ALTER TABLE "channels" DROP CONSTRAINT "FK_channels_project_id"
        `);
  }
}
