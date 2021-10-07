import { getConnection } from "typeorm";
import { FavoriteCreateDto } from "../dto/create/FavoriteCreateDto";
import { PostCreateDto } from "../dto/create/PostCreateDto";
import { FavoriteUpdateDto } from "../dto/update/FavoriteUpdateDto";
import { PostUpdateDto } from "../dto/update/PostUpdateDto";
import { Favorite } from "../entity/Favorite";
import { Post } from "../entity/Post";
import { User } from "../entity/User";
import { HttpException, Status, StatusCode } from "../exception/HttpException";
import { ResourceTag } from "../interface/ResourceTag";

export class FavoriteService {

    public static async getAll(): Promise<Favorite[]> {

        const db = await getConnection(process.env.CONNECTION).getRepository(Favorite)

        const favorites = await db.find()

        return favorites
    }

    public static async getByUUID(uuid: string): Promise<Favorite> {

        const db = await getConnection(process.env.CONNECTION).getRepository(Favorite)

        const favorite = await db.findOne(uuid)

        if (!favorite) throw new HttpException(StatusCode.NOT_FOUND, Status.FAIL, "Favorite by that id could not be found.")

        return favorite
    }

    public static async create(favorite: FavoriteCreateDto): Promise<Favorite> {

        const db = await getConnection(process.env.CONNECTION).getRepository(Favorite)

        const createdFavorite: ResourceTag = await (await db.insert(favorite)).raw[0]

        const newFavorite = await db.findOne(createdFavorite.id)

        return newFavorite
    }

    public static async update(id: string, updateFavoriteData: Partial<FavoriteUpdateDto>): Promise<Favorite> {
        const db = await getConnection(process.env.CONNECTION).getRepository(Favorite)

        const foundFavorite = await db.findOne(id)

        if (!foundFavorite) {
            throw new HttpException(StatusCode.NOT_FOUND, Status.FAIL, "Could not find favorite by that id.")
        }

        await db.update(id, updateFavoriteData)

        const updatedFavorite = await db.findOne(id)

        return updatedFavorite
    }

    public static async remove(uuid: string): Promise<Number> {

        const db = await getConnection(process.env.CONNECTION).getRepository(Favorite)

        const result = await (await db.delete(uuid)).affected

        return result
    }
}

export default FavoriteService