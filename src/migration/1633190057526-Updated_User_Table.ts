import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdatedUserTable1633190057526 implements MigrationInterface {
    name = 'UpdatedUserTable1633190057526'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."user" ADD "deleted_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "public"."user" ADD "username" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."user" ADD "passwordHash" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."user" ADD "email" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."user" ADD "bio" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."user" ADD "avatarUrl" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."post" ADD "deleted_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "public"."comment" ADD "deleted_at" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."comment" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "public"."post" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "public"."user" DROP COLUMN "avatarUrl"`);
        await queryRunner.query(`ALTER TABLE "public"."user" DROP COLUMN "bio"`);
        await queryRunner.query(`ALTER TABLE "public"."user" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "public"."user" DROP COLUMN "passwordHash"`);
        await queryRunner.query(`ALTER TABLE "public"."user" DROP COLUMN "username"`);
        await queryRunner.query(`ALTER TABLE "public"."user" DROP COLUMN "deleted_at"`);
    }

}
