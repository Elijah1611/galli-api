import {MigrationInterface, QueryRunner} from "typeorm";

export class AddFavoriteTable1633062540274 implements MigrationInterface {
    name = 'AddFavoriteTable1633062540274'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "favorite" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "postsId" integer, "usersId" integer, CONSTRAINT "PK_495675cec4fb09666704e4f610f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "favorite" ADD CONSTRAINT "FK_ac3531a06f959c2ff3808c03447" FOREIGN KEY ("postsId") REFERENCES "post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "favorite" ADD CONSTRAINT "FK_f623167aedfa24247441281b166" FOREIGN KEY ("usersId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "favorite" DROP CONSTRAINT "FK_f623167aedfa24247441281b166"`);
        await queryRunner.query(`ALTER TABLE "favorite" DROP CONSTRAINT "FK_ac3531a06f959c2ff3808c03447"`);
        await queryRunner.query(`DROP TABLE "favorite"`);
    }

}
