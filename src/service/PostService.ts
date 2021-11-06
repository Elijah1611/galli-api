import { getConnection } from "typeorm";
import { FavoriteCreateDto } from "../dto/create/FavoriteCreateDto";
import { PostCreateDto } from "../dto/create/PostCreateDto";
import { PostUpdateDto } from "../dto/update/PostUpdateDto";
import { Favorite } from "../entity/Favorite";
import { Post } from "../entity/Post";
import { User } from "../entity/User";
import { HttpException, Status, StatusCode } from "../exception/HttpException";
import { ResourceTag } from "../interface/ResourceTag";
import FavoriteService from "./FavoriteService";

export class PostService {

    public static async getAll(): Promise<Post[]> {

        const db = await getConnection(process.env.CONNECTION).getRepository(Post)

        const posts = await db.find()

        return posts
    }

    public static async getAllFull(): Promise<Post[]> {

        const db = await getConnection(process.env.CONNECTION).getRepository(Post)

        const posts = await db.find({ relations: ["user", "comments", "favorites"], order: { created_at: "DESC" } })

        return posts
    }

    public static async getByUUIDFull(uuid: string): Promise<Post> {

        const db = await getConnection(process.env.CONNECTION).getRepository(Post)

        const post = await db.findOne(uuid, { relations: ["user", "comments", "comments.user", "comments.user.favorites", "favorites"] })

        if (!post) throw new HttpException(StatusCode.NOT_FOUND, Status.FAIL, "Post by that id could not be found.")

        return post
    }

    public static async getByUUID(uuid: string): Promise<Post> {

        const db = await getConnection(process.env.CONNECTION).getRepository(Post)

        const post = await db.findOne(uuid)

        if (!post) throw new HttpException(StatusCode.NOT_FOUND, Status.FAIL, "Post by that id could not be found.")

        return post
    }

    public static async create(post: PostCreateDto): Promise<Post> {

        const db = await getConnection(process.env.CONNECTION).getRepository(Post)

        const createdPost: ResourceTag = await (await db.insert(post)).raw[0]

        const newPost = await db.findOne(createdPost.id)

        return newPost
    }

    public static async update(id: string, updatePostData: Partial<PostUpdateDto>): Promise<Post> {
        const db = await getConnection(process.env.CONNECTION).getRepository(Post)

        const foundPost = await db.findOne(id)

        if (!foundPost) {
            throw new HttpException(StatusCode.NOT_FOUND, Status.FAIL, "Could not find post by that id.")
        }

        await db.update(id, updatePostData)

        const updatedPost = await db.findOne(id)

        return updatedPost
    }

    public static async remove(uuid: string): Promise<Number> {

        const db = await getConnection(process.env.CONNECTION).getRepository(Post)

        const result = await (await db.delete(uuid)).affected

        return result
    }

    public static async addLike(post_id: string, liker_id: string): Promise<Post> {
        const db = await getConnection(process.env.CONNECTION).getRepository(Post)

        const newFavoriteDto = new FavoriteCreateDto()
        newFavoriteDto.post_id = post_id
        newFavoriteDto.user_id = liker_id

        await FavoriteService.create(newFavoriteDto)

        const foundPost = await db.findOne(post_id)

        if (!foundPost) {
            throw new HttpException(StatusCode.NOT_FOUND, Status.FAIL, "Could not find post by that id.")
        }

        const updatedUser = this.increaseUserLikes(foundPost.user_id)

        return foundPost
    }

    private static async increaseUserLikes(postUser_id: string): Promise<User> {
        const db = await getConnection(process.env.CONNECTION).getRepository(User)

        const postUser = await db.findOne(postUser_id)

        if (!postUser) {
            throw new HttpException(StatusCode.NOT_FOUND, Status.FAIL, "Could not find user by that id.")
        }

        await db.update(postUser.id, { likes: postUser.likes + 1 })

        const updatedUser = await db.findOne(postUser.id)

        return updatedUser
    }

    public static async removeLike(post_id: string, liker_id: string): Promise<Post> {
        const postdb = await getConnection(process.env.CONNECTION).getRepository(Post)
        const favdb = await getConnection(process.env.CONNECTION).getRepository(Favorite)

        const foundPost = await postdb.findOne(post_id)
        if (!foundPost) {
            throw new HttpException(StatusCode.NOT_FOUND, Status.FAIL, "Could not find user by that id.")
        }

        const foundFav = await FavoriteService.find(post_id, liker_id)
        if (!foundFav) {
            throw new HttpException(StatusCode.NOT_FOUND, Status.FAIL, "Could not find favorite by that post id and user id.")
        }

        const numberRemoved = await (await favdb.delete(foundFav.id)).affected

        const updatedUser = this.decreaseUserLikes(foundPost.user_id)

        return foundPost
    }

    private static async decreaseUserLikes(postUser_id: string): Promise<User> {
        const db = await getConnection(process.env.CONNECTION).getRepository(User)

        const postUser = await db.findOne(postUser_id)

        if (!postUser) {
            throw new HttpException(StatusCode.NOT_FOUND, Status.FAIL, "Could not find user by that id.")
        }

        await db.update(postUser.id, { likes: postUser.likes - 1 })

        const updatedUser = await db.findOne(postUser.id)

        return updatedUser
    }
}

export default PostService