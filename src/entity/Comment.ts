import { IsNotEmpty, IsString, MaxLength } from "class-validator";
import {Entity, CreateDateColumn, PrimaryColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, Column} from "typeorm";
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

    @ManyToOne(() => User, user => user.comments, { onDelete: "CASCADE" })
    user: User;

    @ManyToOne(() => Post, post => post.comments, { onDelete: "CASCADE" })
    post: Post;

}