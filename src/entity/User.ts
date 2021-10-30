import { Exclude } from "class-transformer";
import { IsAlpha, IsEmail, IsFQDN, IsLowercase, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Length, MaxLength, maxLength, MinLength } from "class-validator";
import { Entity, Column, OneToMany, AfterLoad } from "typeorm";
import { Comment } from "./Comment";
import { EntityBase } from "./EntityBase";
import { Favorite } from "./Favorite";
import { Post } from "./Post";

@Entity()
export class User extends EntityBase {

    @Column()
    @IsAlpha()
    @IsNotEmpty()
    @Length(1, 50)
    first_name: string;

    @Column()
    @IsAlpha()
    @IsNotEmpty()
    @Length(1, 50)
    last_name: string;

    @Column({ unique: true })
    @IsString()
    @IsNotEmpty()
    @Length(1, 12)
    username: string;

    @Exclude({ toPlainOnly: true })
    @Column({ select: false })
    @IsString()
    @IsNotEmpty()
    @Length(6, 128)
    password: string;

    @Column({ unique: true })
    @IsEmail()
    @IsNotEmpty()
    @IsLowercase()
    @Length(1, 60)
    email: string;

    @Column({ nullable: true })
    @IsString()
    @IsOptional()
    @MaxLength(160)
    bio?: string;

    @Column({ nullable: true })
    @IsOptional()
    @MinLength(10)
    avatar_url?: string;

    @Column({ default: 0 })
    @IsNumber()
    @IsPositive()
    total_hearts: number;

    @OneToMany(() => Post, post => post.user)
    posts: Post[]

    @OneToMany(() => Comment, comment => comment.user)
    comments: Comment[]

    @OneToMany(() => Favorite, favorite => favorite.user)
    favorites: Favorite[]

    @AfterLoad()
    updateTotalHearts() {
        if (this.posts) {
            const totalHearts = this.posts.map(post => post.favorites.length).reduce((total, curr) => total + curr, 0)
            this.total_hearts = totalHearts
        }
    }
}
