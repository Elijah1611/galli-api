import { IsAlpha, IsNotEmpty, IsNumber, IsUUID, Max } from "class-validator";
import {Entity, CreateDateColumn, PrimaryColumn, ManyToOne, PrimaryGeneratedColumn, Column, JoinColumn} from "typeorm";
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

    @Column({ nullable: true })
    user_id: number;

    @ManyToOne(() => User, user => user.favorites, { onDelete: "CASCADE"})
    @JoinColumn({ name: 'user_id'})
    user: User;

    @Column({ nullable: true })
    post_id: number;
    
    @ManyToOne(() => Post, post => post.favorites, { onDelete: "CASCADE"})
    @JoinColumn({ name: 'post_id'})
    post: Post;
    
    @CreateDateColumn()
    created_at: Date;

}