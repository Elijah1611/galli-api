import {MigrationInterface, QueryRunner} from "typeorm";

export class AddCascade1633063059979 implements MigrationInterface {
    name = 'AddCascade1633063059979'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."post" DROP CONSTRAINT "FK_5c1cf55c308037b5aca1038a131"`);
        await queryRunner.query(`ALTER TABLE "public"."favorite" DROP CONSTRAINT "FK_ac3531a06f959c2ff3808c03447"`);
        await queryRunner.query(`ALTER TABLE "public"."favorite" DROP CONSTRAINT "FK_f623167aedfa24247441281b166"`);
        await queryRunner.query(`ALTER TABLE "public"."post" ADD CONSTRAINT "FK_5c1cf55c308037b5aca1038a131" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."favorite" ADD CONSTRAINT "FK_ac3531a06f959c2ff3808c03447" FOREIGN KEY ("postsId") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."favorite" ADD CONSTRAINT "FK_f623167aedfa24247441281b166" FOREIGN KEY ("usersId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."favorite" DROP CONSTRAINT "FK_f623167aedfa24247441281b166"`);
        await queryRunner.query(`ALTER TABLE "public"."favorite" DROP CONSTRAINT "FK_ac3531a06f959c2ff3808c03447"`);
        await queryRunner.query(`ALTER TABLE "public"."post" DROP CONSTRAINT "FK_5c1cf55c308037b5aca1038a131"`);
        await queryRunner.query(`ALTER TABLE "public"."favorite" ADD CONSTRAINT "FK_f623167aedfa24247441281b166" FOREIGN KEY ("usersId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."favorite" ADD CONSTRAINT "FK_ac3531a06f959c2ff3808c03447" FOREIGN KEY ("postsId") REFERENCES "post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."post" ADD CONSTRAINT "FK_5c1cf55c308037b5aca1038a131" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
