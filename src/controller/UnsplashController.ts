import { NextFunction, Request, Response } from "express"
import { StatusCode } from "../exception/HttpException";
import { TryCatch } from "../exception/TryCatch";
import { UnsplashService } from "../service/UnsplashService";

export class UnsplashController {
    @TryCatch
    public static async getRandomPhoto(req: Request, res: Response) {
        const randomPhoto = await UnsplashService.RandomPhoto()

        return res.status(StatusCode.OK).json(randomPhoto)
    }

    @TryCatch
    public static async getRandomPhotoTrimmed(req: Request, res: Response) {
        const randomPhoto = await UnsplashService.RandomPhotoTrimmed()

        return res.status(StatusCode.OK).json(randomPhoto)
    }
}