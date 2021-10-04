import { IsAlpha, IsEmail, IsFQDN, IsLowercase, IsNotEmpty, IsOptional, IsString, Length, MaxLength, maxLength, MinLength } from "class-validator";
import {Column} from "typeorm";

export class UserCreateDto {

    @Column()
    @IsAlpha()
    @IsNotEmpty()
    @Length(1, 50)
    firstName: string;

    @Column()
    @IsAlpha()
    @IsNotEmpty()
    @Length(1, 50)
    lastName: string;

    @Column({ unique: true })
    @IsString()
    @IsNotEmpty()
    @Length(1, 12)
    username: string;

    @Column()
    @IsString()
    @IsNotEmpty()
    password: string;

    @Column({ unique: true })
    @IsEmail()
    @IsNotEmpty()
    @IsLowercase()
    @Length(1, 60)
    email: string;

    @Column({ nullable: true })
    @IsString()
    @IsOptional()
    @MaxLength(160)
    bio?: string;

    @Column({ nullable: true })
    @IsFQDN()
    @IsOptional()
    @MinLength(10)
    avatarUrl?: string;

}