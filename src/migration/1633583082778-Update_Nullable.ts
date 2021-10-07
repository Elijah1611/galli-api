import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateNullable1633583082778 implements MigrationInterface {
    name = 'UpdateNullable1633583082778'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."favorite" DROP CONSTRAINT "FK_e666fc7cc4c80fba1944daa1a74"`);
        await queryRunner.query(`ALTER TABLE "public"."favorite" DROP CONSTRAINT "FK_2643df4f83c97f24e261cbee403"`);
        await queryRunner.query(`ALTER TABLE "public"."favorite" ALTER COLUMN "user_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."favorite" ALTER COLUMN "post_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."post" DROP CONSTRAINT "FK_52378a74ae3724bcab44036645b"`);
        await queryRunner.query(`ALTER TABLE "public"."post" ALTER COLUMN "user_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."comment" DROP CONSTRAINT "FK_bbfe153fa60aa06483ed35ff4a7"`);
        await queryRunner.query(`ALTER TABLE "public"."comment" DROP CONSTRAINT "FK_8aa21186314ce53c5b61a0e8c93"`);
        await queryRunner.query(`ALTER TABLE "public"."comment" ALTER COLUMN "user_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."comment" ALTER COLUMN "post_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."favorite" ADD CONSTRAINT "FK_e666fc7cc4c80fba1944daa1a74" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."favorite" ADD CONSTRAINT "FK_2643df4f83c97f24e261cbee403" FOREIGN KEY ("post_id") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."post" ADD CONSTRAINT "FK_52378a74ae3724bcab44036645b" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."comment" ADD CONSTRAINT "FK_bbfe153fa60aa06483ed35ff4a7" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."comment" ADD CONSTRAINT "FK_8aa21186314ce53c5b61a0e8c93" FOREIGN KEY ("post_id") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."comment" DROP CONSTRAINT "FK_8aa21186314ce53c5b61a0e8c93"`);
        await queryRunner.query(`ALTER TABLE "public"."comment" DROP CONSTRAINT "FK_bbfe153fa60aa06483ed35ff4a7"`);
        await queryRunner.query(`ALTER TABLE "public"."post" DROP CONSTRAINT "FK_52378a74ae3724bcab44036645b"`);
        await queryRunner.query(`ALTER TABLE "public"."favorite" DROP CONSTRAINT "FK_2643df4f83c97f24e261cbee403"`);
        await queryRunner.query(`ALTER TABLE "public"."favorite" DROP CONSTRAINT "FK_e666fc7cc4c80fba1944daa1a74"`);
        await queryRunner.query(`ALTER TABLE "public"."comment" ALTER COLUMN "post_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."comment" ALTER COLUMN "user_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."comment" ADD CONSTRAINT "FK_8aa21186314ce53c5b61a0e8c93" FOREIGN KEY ("post_id") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."comment" ADD CONSTRAINT "FK_bbfe153fa60aa06483ed35ff4a7" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."post" ALTER COLUMN "user_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."post" ADD CONSTRAINT "FK_52378a74ae3724bcab44036645b" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."favorite" ALTER COLUMN "post_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."favorite" ALTER COLUMN "user_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."favorite" ADD CONSTRAINT "FK_2643df4f83c97f24e261cbee403" FOREIGN KEY ("post_id") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."favorite" ADD CONSTRAINT "FK_e666fc7cc4c80fba1944daa1a74" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
