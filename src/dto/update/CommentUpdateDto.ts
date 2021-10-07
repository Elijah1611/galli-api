import { IsOptional, IsString, IsUUID, MaxLength } from "class-validator";
import { Column } from "typeorm";


export class CommentUpdateDto {

    @Column()
    @IsString()
    @IsOptional()
    @MaxLength(160)
    content: string;

    @Column()
    @IsOptional()
    @IsUUID()
    user_id: string;

    @Column()
    @IsOptional()
    @IsUUID()
    post_id: string;
}