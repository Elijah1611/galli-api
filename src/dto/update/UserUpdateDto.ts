import { IsAlpha, IsEmail, IsFQDN, IsLowercase, IsNotEmpty, IsOptional, IsString, Length, MaxLength, maxLength, MinLength } from "class-validator";
import { Column } from "typeorm";

export class UserUpdateDto {

    @Column()
    @IsAlpha()
    @IsOptional()
    @Length(1, 50)
    first_name: string;

    @Column()
    @IsAlpha()
    @IsOptional()
    @Length(1, 50)
    last_name: string;

    @Column({ unique: true })
    @IsString()
    @IsOptional()
    @Length(1, 12)
    username: string;

    @Column({ unique: true })
    @IsEmail()
    @IsOptional()
    @IsLowercase()
    @Length(1, 60)
    email: string;

    @Column({ nullable: true })
    @IsString()
    @IsOptional()
    @MaxLength(160)
    bio?: string;

    @Column({ nullable: true })
    @IsOptional()
    @MinLength(10)
    avatar_url?: string;

    @Column({ nullable: false })
    @IsOptional()
    likes?: number;

}