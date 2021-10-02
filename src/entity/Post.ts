import { IsFQDN, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, ManyToMany, JoinTable, OneToMany} from "typeorm";
import { Comment } from "./Comment";
import { EntityBase } from "./EntityBase";
import { Favorite } from "./Favorite";
import { User } from "./User";

@Entity()
export class Post extends EntityBase{

    @Column({ nullable: true })
    @IsString()
    @IsOptional()
    @MaxLength(50)
    title: string;

    @Column()
    @IsFQDN()
    @IsNotEmpty()
    @MinLength(10)
    image_url: string;

    @ManyToOne(() => User, user => user.posts, { onDelete: "CASCADE" })
    user: User;
    
    @OneToMany(() => Comment, comment => comment.post)
    comments: Comment[]

    @OneToMany(() => Favorite, favorite => favorite.post)
    favorites: Favorite[]

}