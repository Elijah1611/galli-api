import { transformAndValidate } from "class-transformer-validator";
import { Request, Response } from "express"
import { PostCreateDto } from "../dto/create/PostCreateDto";
import { PostUpdateDto } from "../dto/update/PostUpdateDto";
import { Post } from "../entity/Post";
import { HttpException, StatusCode } from "../exception/HttpException";
import { TryCatch } from "../exception/TryCatch";
import PostService from "../service/PostService";

export class PostController {

    @TryCatch
    public static async getAll(req: Request, res: Response): Promise<Response<Post[]>> {

        const result = await PostService.getAll()

        return res.status(StatusCode.OK).json(result)
    }

    @TryCatch
    public static async getAllFull(req: Request, res: Response): Promise<Response<Post[]>> {

        const result = await PostService.getAllFull()

        return res.status(StatusCode.OK).json(result)
    }

    @TryCatch
    public static async getOneFull(req: Request, res: Response): Promise<Response<Post>> {

        const uuid = req.params.id

        const result = await PostService.getByUUIDFull(uuid)

        return res.status(StatusCode.OK).json(result)
    }

    @TryCatch
    public static async getOne(req: Request, res: Response): Promise<Response<Post>> {

        const uuid = req.params.id

        const result = await PostService.getByUUID(uuid)

        return res.status(StatusCode.OK).json(result)
    }

    @TryCatch
    public static async create(req: Request, res: Response): Promise<Response<Post>> {

        const post = await transformAndValidate(PostCreateDto, req.body) as PostCreateDto;

        const newPost = await PostService.create(post)

        return res.status(StatusCode.CREATED).json(newPost)
    }

    @TryCatch
    public static async update(req: Request, res: Response): Promise<Response<Post>> {

        const id = req.params.id

        const post = await transformAndValidate(PostUpdateDto, req.body) as PostUpdateDto;

        const updatedPost = await PostService.update(id, post)

        return res.status(StatusCode.OK).json(updatedPost)
    }

    @TryCatch
    public static async delete(req: Request, res: Response): Promise<Response<HttpException>> {

        const id = req.params.id

        const removed = await PostService.remove(id)

        return res.status(StatusCode.OK).json({
            statusCode: StatusCode.OK,
            status: 'Successful',
            message: `${removed} post successfully removed.`,
        })
    }

    @TryCatch
    public static async addLike(req: Request, res: Response): Promise<Response<HttpException>> {

        const { post_id, user_id } = req.body

        const updatedPost = await PostService.addLike(post_id, user_id)

        return res.status(StatusCode.OK).json(updatedPost)
    }

    @TryCatch
    public static async removeLike(req: Request, res: Response): Promise<Response<HttpException>> {

        const { post_id, user_id } = req.body

        const updatedPost = await PostService.removeLike(post_id, user_id)

        return res.status(StatusCode.OK).json(updatedPost)
    }
}

export default PostController