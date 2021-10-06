import axios from "axios";
import { HttpException, Status, StatusCode } from "../exception/HttpException";
import { UnsplashData } from '../interface/UnsplashData'

export class UnsplashService {
    public static async RandomPhoto(): Promise<UnsplashData> {
        const result = await axios.get('https://api.unsplash.com/photos/random', {
            headers: {
                Authorization: `Client-ID ${process.env.UNSPLASH_KEY}`
            }
        })

        if (!result) new HttpException(StatusCode.INTERNAL_SERVER_ERROR, Status.FAIL, 'There was a problem getting a photo from unsplash api.')

        return result.data
    }

    public static async RandomPhotoTrimmed(): Promise<Partial<UnsplashData>> {
        const randomPhoto = await this.RandomPhoto()

        return {
            id: randomPhoto.id,
            urls: randomPhoto.urls,
            links: randomPhoto.links,
            width: randomPhoto.width,
            height: randomPhoto.height,
            description: randomPhoto.description,
            alt_description: randomPhoto.alt_description,
            color: randomPhoto.color,
            created_at: randomPhoto.created_at,
            updated_at: randomPhoto.updated_at
        }
    }
}