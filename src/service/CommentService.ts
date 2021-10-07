import { getConnection } from "typeorm";
import { CommentCreateDto } from "../dto/create/CommentCreateDto";
import { CommentUpdateDto } from "../dto/update/CommentUpdateDto";
import { Comment } from "../entity/Comment";
import { HttpException, Status, StatusCode } from "../exception/HttpException";
import { ResourceTag } from "../interface/ResourceTag";

export class CommentService {

    public static async getAll(): Promise<Comment[]> {

        const db = await getConnection(process.env.CONNECTION).getRepository(Comment)

        const comments = await db.find()

        return comments
    }

    public static async getByUUID(uuid: string): Promise<Comment> {

        const db = await getConnection(process.env.CONNECTION).getRepository(Comment)

        const comment = await db.findOne(uuid)

        if (!comment) throw new HttpException(StatusCode.NOT_FOUND, Status.FAIL, "Comment by that id could not be found.")

        return comment
    }

    public static async create(comment: CommentCreateDto): Promise<Comment> {

        const db = await getConnection(process.env.CONNECTION).getRepository(Comment)

        const createdComment: ResourceTag = await (await db.insert(comment)).raw[0]

        const newComment = await db.findOne(createdComment.id)

        return newComment
    }

    public static async update(id: string, updateCommentData: Partial<CommentUpdateDto>): Promise<Comment> {
        const db = await getConnection(process.env.CONNECTION).getRepository(Comment)

        const foundComment = await db.findOne(id)

        if (!foundComment) {
            throw new HttpException(StatusCode.NOT_FOUND, Status.FAIL, "Could not find comment by that id.")
        }

        await db.update(id, updateCommentData)

        const updatedComment = await db.findOne(id)

        return updatedComment
    }

    public static async remove(uuid: string): Promise<Number> {

        const db = await getConnection(process.env.CONNECTION).getRepository(Comment)

        const result = await (await db.delete(uuid)).affected

        return result
    }
}

export default CommentService