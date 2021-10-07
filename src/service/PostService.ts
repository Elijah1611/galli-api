import { getConnection } from "typeorm";
import { PostCreateDto } from "../dto/create/PostCreateDto";
import { PostUpdateDto } from "../dto/update/PostUpdateDto";
import { Post } from "../entity/Post";
import { HttpException, Status, StatusCode } from "../exception/HttpException";
import { ResourceTag } from "../interface/ResourceTag";

export class PostService {

    public static async getAll(): Promise<Post[]> {

        const db = await getConnection(process.env.CONNECTION).getRepository(Post)

        const posts = await db.find()

        return posts
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
}

export default PostService