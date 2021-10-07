import { transformAndValidate } from "class-transformer-validator";
import { Request, Response } from "express"
import { CommentCreateDto } from "../dto/create/CommentCreateDto";
import { CommentUpdateDto } from "../dto/update/CommentUpdateDto";
import { Comment } from "../entity/Comment";
import { HttpException, StatusCode } from "../exception/HttpException";
import { TryCatch } from "../exception/TryCatch";
import CommentService from "../service/CommentService";

export class CommentController {

    @TryCatch
    public static async getAll(req: Request, res: Response): Promise<Response<Comment[]>> {

        const result = await CommentService.getAll()

        return res.status(StatusCode.OK).json(result)
    }

    @TryCatch
    public static async getOne(req: Request, res: Response): Promise<Response<Comment>> {

        const uuid = req.params.id

        const result = await CommentService.getByUUID(uuid)

        return res.status(StatusCode.OK).json(result)
    }

    @TryCatch
    public static async create(req: Request, res: Response): Promise<Response<Comment>> {

        const comment = await transformAndValidate(CommentCreateDto, req.body) as CommentCreateDto;

        const newFavorite = await CommentService.create(comment)

        return res.status(StatusCode.CREATED).json(newFavorite)
    }

    @TryCatch
    public static async update(req: Request, res: Response): Promise<Response<Comment>> {

        const id = req.params.id

        const comment = await transformAndValidate(CommentUpdateDto, req.body) as CommentUpdateDto;

        const updatedComment = await CommentService.update(id, comment)

        return res.status(StatusCode.OK).json(updatedComment)
    }

    @TryCatch
    public static async delete(req: Request, res: Response): Promise<Response<HttpException>> {

        const id = req.params.id

        const removed = await CommentService.remove(id)

        return res.status(StatusCode.OK).json({
            statusCode: StatusCode.OK,
            status: 'Successful',
            message: `${removed} comment successfully removed.`,
        })
    }
}

export default CommentController