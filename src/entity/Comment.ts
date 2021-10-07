import { IsNotEmpty, IsString, IsUUID, MaxLength } from "class-validator";
import { Entity, ManyToOne, Column, JoinColumn } from "typeorm";
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
    @IsUUID()
    user_id: string;

    @ManyToOne(() => User, user => user.comments, { onDelete: "CASCADE" })
    @JoinColumn({ name: 'user_id' })
    user: User;

    @Column({ nullable: true })
    @IsUUID()
    post_id: string;

    @ManyToOne(() => Post, post => post.comments, { onDelete: "CASCADE" })
    @JoinColumn({ name: 'post_id' })
    post: Post;

}