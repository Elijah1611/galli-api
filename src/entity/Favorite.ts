import { IsAlpha, IsNotEmpty, IsNumber, IsUUID, Max } from "class-validator";
import {Entity, CreateDateColumn, PrimaryColumn, ManyToOne, PrimaryGeneratedColumn, Column} from "typeorm";
import { Post } from "./Post";
import { Reaction } from "./Reaction";
import { User } from "./User";

@Entity()
export class Favorite {

    @PrimaryGeneratedColumn("uuid")
    @IsUUID()
    id: string;

    @Column({
        type: "enum",
        enum: Reaction,
        default: Reaction.LOVE
    })
    @IsNotEmpty()
    @IsNumber() 
    @Max(10)
    reaction: Reaction

    @ManyToOne(() => User, user => user.favorites, { onDelete: "CASCADE"})
    user: User;
    
    @ManyToOne(() => Post, post => post.favorites, { onDelete: "CASCADE"})
    post: Post;
    
    @CreateDateColumn()
    created_at: Date;

}