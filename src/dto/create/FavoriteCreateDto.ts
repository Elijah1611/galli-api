import { IsNotEmpty, IsNumber, IsOptional, IsUUID, Max } from "class-validator";
import { Column } from "typeorm";
import { Reaction } from "../../entity/Reaction";

export class FavoriteCreateDto {
    @Column({
        type: "enum",
        enum: Reaction,
        default: Reaction.LOVE
    })
    @IsOptional()
    @IsNumber()
    @Max(10)
    reaction: Reaction

    @Column()
    @IsNotEmpty()
    @IsUUID()
    user_id: string;;

    @Column()
    @IsNotEmpty()
    @IsUUID()
    post_id: string;
}