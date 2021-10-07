import { IsNumber, IsOptional, IsUUID, Max } from "class-validator";
import { Column } from "typeorm";
import { Reaction } from "../../entity/Reaction";

export class FavoriteUpdateDto {
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
    @IsOptional()
    @IsUUID()
    user_id: string;

    @Column()
    @IsOptional()
    @IsUUID()
    post_id: string;
}