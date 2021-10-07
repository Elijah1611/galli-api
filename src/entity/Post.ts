import { IsFQDN, IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength, MinLength } from "class-validator";
import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { Comment } from "./Comment";
import { EntityBase } from "./EntityBase";
import { Favorite } from "./Favorite";
import { User } from "./User";

@Entity()
export class Post extends EntityBase {

    @Column({ nullable: true })
    @IsString()
    @IsOptional()
    @MaxLength(50)
    title: string;

    @Column()
    @IsNotEmpty()
    @MinLength(10)
    image_url: string;

    @Column({ nullable: true })
    @IsUUID()
    user_id: string;

    @ManyToOne(() => User, user => user.posts, { onDelete: "CASCADE" })
    @JoinColumn({ name: 'user_id' })
    user: User;

    @OneToMany(() => Comment, comment => comment.post)
    comments: Comment[]

    @OneToMany(() => Favorite, favorite => favorite.post)
    favorites: Favorite[]

}