import { IsNotEmpty, IsString, MaxLength } from "class-validator";
import {Entity, CreateDateColumn, PrimaryColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, Column, JoinColumn} from "typeorm";
import { EntityBase } from "./EntityBase";
import { Post } from "./Post";
import { User } from "./User";

@Entity()
export class Comment extends EntityBase {

    @Column()
    @IsString()
    @IsNotEmpty()
    @MaxLength(160)
    content: string;

    @Column({ nullable: true })
    user_id: number;
    
    @ManyToOne(() => User, user => user.comments, { onDelete: "CASCADE" })
    @JoinColumn({ name: 'user_id'})
    user: User;

    @Column({ nullable: true })
    post_id: number;
    
    @ManyToOne(() => Post, post => post.comments, { onDelete: "CASCADE" })
    @JoinColumn({ name: 'post_id'})
    post: Post;

}