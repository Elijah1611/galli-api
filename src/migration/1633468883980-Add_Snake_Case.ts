import {MigrationInterface, QueryRunner} from "typeorm";

export class AddSnakeCase1633468883980 implements MigrationInterface {
    name = 'AddSnakeCase1633468883980'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."favorite" DROP CONSTRAINT "FK_83b775fdebbe24c29b2b5831f2d"`);
        await queryRunner.query(`ALTER TABLE "public"."favorite" DROP CONSTRAINT "FK_61d6124af6c5306a062410af38b"`);
        await queryRunner.query(`ALTER TABLE "public"."post" DROP CONSTRAINT "FK_5c1cf55c308037b5aca1038a131"`);
        await queryRunner.query(`ALTER TABLE "public"."comment" DROP CONSTRAINT "FK_c0354a9a009d3bb45a08655ce3b"`);
        await queryRunner.query(`ALTER TABLE "public"."comment" DROP CONSTRAINT "FK_94a85bb16d24033a2afdd5df060"`);
        await queryRunner.query(`ALTER TABLE "public"."post" RENAME COLUMN "userId" TO "user_id"`);
        await queryRunner.query(`ALTER TABLE "public"."favorite" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "public"."favorite" DROP COLUMN "postId"`);
        await queryRunner.query(`ALTER TABLE "public"."comment" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "public"."comment" DROP COLUMN "postId"`);
        await queryRunner.query(`ALTER TABLE "public"."user" DROP COLUMN "avatarUrl"`);
        await queryRunner.query(`ALTER TABLE "public"."user" DROP COLUMN "lastName"`);
        await queryRunner.query(`ALTER TABLE "public"."user" DROP COLUMN "firstName"`);
        await queryRunner.query(`ALTER TABLE "public"."favorite" ADD "user_id" uuid`);
        await queryRunner.query(`ALTER TABLE "public"."favorite" ADD "post_id" uuid`);
        await queryRunner.query(`ALTER TABLE "public"."comment" ADD "user_id" uuid`);
        await queryRunner.query(`ALTER TABLE "public"."comment" ADD "post_id" uuid`);
        await queryRunner.query(`ALTER TABLE "public"."user" ADD "first_name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."user" ADD "last_name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."user" ADD "avatar_url" character varying`);
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
        await queryRunner.query(`ALTER TABLE "public"."user" DROP COLUMN "avatar_url"`);
        await queryRunner.query(`ALTER TABLE "public"."user" DROP COLUMN "last_name"`);
        await queryRunner.query(`ALTER TABLE "public"."user" DROP COLUMN "first_name"`);
        await queryRunner.query(`ALTER TABLE "public"."comment" DROP COLUMN "post_id"`);
        await queryRunner.query(`ALTER TABLE "public"."comment" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "public"."favorite" DROP COLUMN "post_id"`);
        await queryRunner.query(`ALTER TABLE "public"."favorite" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "public"."user" ADD "firstName" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."user" ADD "lastName" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."user" ADD "avatarUrl" character varying`);
        await queryRunner.query(`ALTER TABLE "public"."comment" ADD "postId" uuid`);
        await queryRunner.query(`ALTER TABLE "public"."comment" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "public"."favorite" ADD "postId" uuid`);
        await queryRunner.query(`ALTER TABLE "public"."favorite" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "public"."post" RENAME COLUMN "user_id" TO "userId"`);
        await queryRunner.query(`ALTER TABLE "public"."comment" ADD CONSTRAINT "FK_94a85bb16d24033a2afdd5df060" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."comment" ADD CONSTRAINT "FK_c0354a9a009d3bb45a08655ce3b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."post" ADD CONSTRAINT "FK_5c1cf55c308037b5aca1038a131" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."favorite" ADD CONSTRAINT "FK_61d6124af6c5306a062410af38b" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."favorite" ADD CONSTRAINT "FK_83b775fdebbe24c29b2b5831f2d" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
