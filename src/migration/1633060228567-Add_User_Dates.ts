import {MigrationInterface, QueryRunner} from "typeorm";

export class AddUserDates1633060228567 implements MigrationInterface {
    name = 'AddUserDates1633060228567'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."user" DROP COLUMN "age"`);
        await queryRunner.query(`ALTER TABLE "public"."user" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "public"."user" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."user" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "public"."user" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "public"."user" ADD "age" integer NOT NULL`);
    }

}
