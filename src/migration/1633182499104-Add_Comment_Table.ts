import {MigrationInterface, QueryRunner} from "typeorm";

export class AddCommentTable1633182499104 implements MigrationInterface {
    name = 'AddCommentTable1633182499104'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."favorite" DROP CONSTRAINT "FK_f623167aedfa24247441281b166"`);
        await queryRunner.query(`ALTER TABLE "public"."favorite" DROP CONSTRAINT "FK_ac3531a06f959c2ff3808c03447"`);
        await queryRunner.query(`CREATE TABLE "comment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "content" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, "postId" uuid, CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "public"."favorite" DROP COLUMN "usersId"`);
        await queryRunner.query(`ALTER TABLE "public"."favorite" DROP COLUMN "postsId"`);
        await queryRunner.query(`CREATE TYPE "public"."favorite_reaction_enum" AS ENUM('0', '1', '2', '3', '4', '5')`);
        await queryRunner.query(`ALTER TABLE "public"."favorite" ADD "reaction" "public"."favorite_reaction_enum" NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "public"."favorite" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "public"."favorite" ADD "postId" uuid`);
        await queryRunner.query(`ALTER TABLE "public"."post" DROP CONSTRAINT "FK_5c1cf55c308037b5aca1038a131"`);
        await queryRunner.query(`ALTER TABLE "public"."user" DROP CONSTRAINT "PK_cace4a159ff9f2512dd42373760"`);
        await queryRunner.query(`ALTER TABLE "public"."user" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "public"."user" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "public"."user" ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "public"."favorite" DROP CONSTRAINT "PK_495675cec4fb09666704e4f610f"`);
        await queryRunner.query(`ALTER TABLE "public"."favorite" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "public"."favorite" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "public"."favorite" ADD CONSTRAINT "PK_495675cec4fb09666704e4f610f" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "public"."post" DROP CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee"`);
        await queryRunner.query(`ALTER TABLE "public"."post" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "public"."post" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "public"."post" ADD CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "public"."post" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "public"."post" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "public"."favorite" ADD CONSTRAINT "FK_83b775fdebbe24c29b2b5831f2d" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."favorite" ADD CONSTRAINT "FK_61d6124af6c5306a062410af38b" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."post" ADD CONSTRAINT "FK_5c1cf55c308037b5aca1038a131" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_c0354a9a009d3bb45a08655ce3b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_94a85bb16d24033a2afdd5df060" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_94a85bb16d24033a2afdd5df060"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_c0354a9a009d3bb45a08655ce3b"`);
        await queryRunner.query(`ALTER TABLE "public"."post" DROP CONSTRAINT "FK_5c1cf55c308037b5aca1038a131"`);
        await queryRunner.query(`ALTER TABLE "public"."favorite" DROP CONSTRAINT "FK_61d6124af6c5306a062410af38b"`);
        await queryRunner.query(`ALTER TABLE "public"."favorite" DROP CONSTRAINT "FK_83b775fdebbe24c29b2b5831f2d"`);
        await queryRunner.query(`ALTER TABLE "public"."post" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "public"."post" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "public"."post" DROP CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee"`);
        await queryRunner.query(`ALTER TABLE "public"."post" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "public"."post" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."post" ADD CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "public"."favorite" DROP CONSTRAINT "PK_495675cec4fb09666704e4f610f"`);
        await queryRunner.query(`ALTER TABLE "public"."favorite" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "public"."favorite" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."favorite" ADD CONSTRAINT "PK_495675cec4fb09666704e4f610f" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "public"."user" DROP CONSTRAINT "PK_cace4a159ff9f2512dd42373760"`);
        await queryRunner.query(`ALTER TABLE "public"."user" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "public"."user" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."user" ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "public"."post" ADD CONSTRAINT "FK_5c1cf55c308037b5aca1038a131" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."favorite" DROP COLUMN "postId"`);
        await queryRunner.query(`ALTER TABLE "public"."favorite" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "public"."favorite" DROP COLUMN "reaction"`);
        await queryRunner.query(`DROP TYPE "public"."favorite_reaction_enum"`);
        await queryRunner.query(`ALTER TABLE "public"."favorite" ADD "postsId" integer`);
        await queryRunner.query(`ALTER TABLE "public"."favorite" ADD "usersId" integer`);
        await queryRunner.query(`DROP TABLE "comment"`);
        await queryRunner.query(`ALTER TABLE "public"."favorite" ADD CONSTRAINT "FK_ac3531a06f959c2ff3808c03447" FOREIGN KEY ("postsId") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."favorite" ADD CONSTRAINT "FK_f623167aedfa24247441281b166" FOREIGN KEY ("usersId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
