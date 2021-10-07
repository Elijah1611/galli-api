import { IsFQDN, IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength, MinLength } from "class-validator";
import { Column } from "typeorm";

export class PostUpdateDto {

    @Column({ nullable: true })
    @IsString()
    @IsOptional()
    @MaxLength(50)
    title: string;

    @Column()
    @IsOptional()
    @MinLength(10)
    image_url: string;

    @Column()
    @IsOptional()
    @IsUUID()
    user_id: string;
}