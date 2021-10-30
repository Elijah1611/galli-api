import { transformAndValidate } from "class-transformer-validator";
import { Request, Response } from "express"
import { FavoriteCreateDto } from "../dto/create/FavoriteCreateDto";
import { FavoriteUpdateDto } from "../dto/update/FavoriteUpdateDto";
import { Favorite } from "../entity/Favorite";
import { HttpException, StatusCode } from "../exception/HttpException";
import { TryCatch } from "../exception/TryCatch";
import FavoriteService from "../service/FavoriteService";

export class FavoriteController {

    @TryCatch
    public static async getAll(req: Request, res: Response): Promise<Response<Favorite[]>> {

        const result = await FavoriteService.getAll()

        return res.status(StatusCode.OK).json(result)
    }

    @TryCatch
    public static async getAllByUser(req: Request, res: Response): Promise<Response<Favorite>> {

        const username = req.params.username

        const result = await FavoriteService.getAllByUsername(username)

        return res.status(StatusCode.OK).json(result)
    }

    @TryCatch
    public static async getOne(req: Request, res: Response): Promise<Response<Favorite>> {

        const uuid = req.params.id

        const result = await FavoriteService.getByUUID(uuid)

        return res.status(StatusCode.OK).json(result)
    }

    @TryCatch
    public static async create(req: Request, res: Response): Promise<Response<Favorite>> {

        const favorite = await transformAndValidate(FavoriteCreateDto, req.body) as FavoriteCreateDto;

        const newFavorite = await FavoriteService.create(favorite)

        return res.status(StatusCode.CREATED).json(newFavorite)
    }

    @TryCatch
    public static async update(req: Request, res: Response): Promise<Response<Favorite>> {

        const id = req.params.id

        const favorite = await transformAndValidate(FavoriteUpdateDto, req.body) as FavoriteUpdateDto;

        const updatedFavorite = await FavoriteService.update(id, favorite)

        return res.status(StatusCode.OK).json(updatedFavorite)
    }

    @TryCatch
    public static async delete(req: Request, res: Response): Promise<Response<HttpException>> {

        const id = req.params.id

        const removed = await FavoriteService.remove(id)

        return res.status(StatusCode.OK).json({
            statusCode: StatusCode.OK,
            status: 'Successful',
            message: `${removed} favorite successfully removed.`,
        })
    }
}

export default FavoriteController