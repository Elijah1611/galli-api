import { IsNotEmpty, IsString, IsUUID, MaxLength } from "class-validator";
import { Column } from "typeorm";


export class CommentCreateDto {

    @Column()
    @IsString()
    @IsNotEmpty()
    @MaxLength(160)
    content: string;

    @Column()
    @IsUUID()
    user_id: string;

    @Column()
    @IsUUID()
    post_id: string;
}