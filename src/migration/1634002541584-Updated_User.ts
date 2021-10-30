import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdatedUser1634002541584 implements MigrationInterface {
    name = 'UpdatedUser1634002541584'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."user" ADD "total_hearts" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."user" DROP COLUMN "total_hearts"`);
    }

}
