import { Request, Response } from "express"
import { TryCatch } from "../exception/TryCatch";
import { ImageService } from "../service/ImageService";

export class ImageController {

    @TryCatch
    public static async Upload(req: Request, res: Response) {
        const file = req.file

        // can process image here before it gets uploaded to S3

        const result = await ImageService.UploadImageToS3(file)

        const title = req.body.description

        const imageLoc = `${process.env.API_HOST}/api/image/${result.Key}`

        return res.json({ imageLoc, title, ...result })
    }

    @TryCatch
    public static async GetImageByKey(req: Request, res: Response) {
        const { key } = req.params

        const imageStream = ImageService.DownloadImageFromS3(key)

        return imageStream.pipe(res)
    }

}