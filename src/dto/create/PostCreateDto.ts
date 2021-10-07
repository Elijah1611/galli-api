import { IsFQDN, IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength, MinLength } from "class-validator";
import { Column } from "typeorm";

export class PostCreateDto {

    @Column({ nullable: true })
    @IsString()
    @IsOptional()
    @MaxLength(50)
    title: string;

    @Column()
    @IsNotEmpty()
    @MinLength(10)
    image_url: string;

    @Column()
    @IsNotEmpty()
    @IsUUID()
    user_id: string;
}