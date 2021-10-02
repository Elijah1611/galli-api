import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateUserTable1633211176166 implements MigrationInterface {
    name = 'UpdateUserTable1633211176166'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."user" ADD "deleted_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "public"."user" ADD "username" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."user" ADD CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username")`);
        await queryRunner.query(`ALTER TABLE "public"."user" ADD "passwordHash" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."user" ADD "email" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."user" ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "public"."user" ADD "bio" character varying`);
        await queryRunner.query(`ALTER TABLE "public"."user" ADD "avatarUrl" character varying`);
        await queryRunner.query(`ALTER TABLE "public"."post" ADD "deleted_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "public"."comment" ADD "deleted_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "public"."post" ALTER COLUMN "title" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."post" ALTER COLUMN "title" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."comment" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "public"."post" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "public"."user" DROP COLUMN "avatarUrl"`);
        await queryRunner.query(`ALTER TABLE "public"."user" DROP COLUMN "bio"`);
        await queryRunner.query(`ALTER TABLE "public"."user" DROP CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22"`);
        await queryRunner.query(`ALTER TABLE "public"."user" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "public"."user" DROP COLUMN "passwordHash"`);
        await queryRunner.query(`ALTER TABLE "public"."user" DROP CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb"`);
        await queryRunner.query(`ALTER TABLE "public"."user" DROP COLUMN "username"`);
        await queryRunner.query(`ALTER TABLE "public"."user" DROP COLUMN "deleted_at"`);
    }

}
