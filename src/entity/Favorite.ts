import {Entity, CreateDateColumn, PrimaryColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import { Post } from "./Post";
import { User } from "./User";

@Entity()
export class Favorite {

@PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Post, post => post.favorites, { onDelete: "CASCADE" })
    posts: Post[];

    @ManyToOne(type => User, user => user.favorites, { onDelete: "CASCADE" })
    users: User[];

    @CreateDateColumn()
    created_at: Date;

}