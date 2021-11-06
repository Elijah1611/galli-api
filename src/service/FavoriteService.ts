import { getConnection } from "typeorm";
import { FavoriteCreateDto } from "../dto/create/FavoriteCreateDto";
import { FavoriteUpdateDto } from "../dto/update/FavoriteUpdateDto";
import { Favorite } from "../entity/Favorite";
import { User } from "../entity/User";
import { HttpException, Status, StatusCode } from "../exception/HttpException";
import { ResourceTag } from "../interface/ResourceTag";

export class FavoriteService {

    public static async getAll(): Promise<Favorite[]> {

        const db = await getConnection(process.env.CONNECTION).getRepository(Favorite)

        const favorites = await db.find()

        return favorites
    }

    public static async getAllByUsername(username: string): Promise<Favorite[]> {

        const db = await getConnection(process.env.CONNECTION).getRepository(Favorite)
        const userDb = await getConnection(process.env.CONNECTION).getRepository(User)

        const user = await userDb.findOne({ where: { username: username } })

        const favorites = await db.find({
            where: { user_id: user.id },
            relations: ["user", "post"]
        })

        return favorites
    }

    public static async getByUUID(uuid: string): Promise<Favorite> {

        const db = await getConnection(process.env.CONNECTION).getRepository(Favorite)

        const favorite = await db.findOne(uuid)

        if (!favorite) throw new HttpException(StatusCode.NOT_FOUND, Status.FAIL, "Favorite by that id could not be found.")

        return favorite
    }

    public static async find(post_id: string, user_id: string): Promise<Favorite> {

        const db = await getConnection(process.env.CONNECTION).getRepository(Favorite)

        const favorite = await db.findOne({ where: { post_id, user_id } })

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