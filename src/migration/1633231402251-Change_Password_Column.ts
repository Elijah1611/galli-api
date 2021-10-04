import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangePasswordColumn1633231402251 implements MigrationInterface {
    name = 'ChangePasswordColumn1633231402251'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."user" RENAME COLUMN "passwordHash" TO "password"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."user" RENAME COLUMN "password" TO "passwordHash"`);
    }

}
