import { IsNotEmpty, IsString, Length } from "class-validator";
import { Column } from "typeorm";

export class LoginDto {

    @Column({ unique: true })
    @IsString()
    @IsNotEmpty()
    @Length(1, 12)
    username: string;

    @Column()
    @IsString()
    @IsNotEmpty()
    password: string;
}