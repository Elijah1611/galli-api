import { getConnection } from "typeorm";
import { UserCreateDto } from "../dto/create/UserCreateDto";
import { UserUpdateDto } from "../dto/update/UserUpdateDto";
import { User } from "../entity/User";
import { HttpException, Status, StatusCode } from "../exception/HttpException";
import { ResourceTag } from "../interface/ResourceTag";
import { AuthService } from "./AuthService";

export class UserService {

    public static async getAll(): Promise<User[]> {

        const db = await getConnection(process.env.CONNECTION).getRepository(User)

        const users = await db.find()

        return users
    }

    public static async getAllFull(): Promise<User[]> {

        const db = await getConnection(process.env.CONNECTION).getRepository(User)

        const users = await db.find({ relations: ["posts", "comments", "favorites"] })

        return users
    }

    public static async getByUsername(username: string): Promise<User> {

        const db = await getConnection(process.env.CONNECTION).getRepository(User)

        const user = await db.findOne({
            where: { username: username },
            relations: ["posts", "posts.favorites", "posts.comments", "comments", "favorites", "favorites.post", "favorites.post.user", "favorites.user"]
        })

        if (!user) throw new HttpException(StatusCode.NOT_FOUND, Status.FAIL, "User by that username could not be found.")

        return user
    }

    public static async getByUUID(uuid: string): Promise<User> {

        const db = await getConnection(process.env.CONNECTION).getRepository(User)

        const user = await db.findOne(uuid)

        if (!user) throw new HttpException(StatusCode.NOT_FOUND, Status.FAIL, "User by that id could not be found.")

        return user
    }

    public static async create(user: UserCreateDto): Promise<User> {

        const db = await getConnection(process.env.CONNECTION).getRepository(User)

        const foundUser = await db.findOne({
            where: [
                { username: user.username },
                { email: user.email }
            ]
        })

        if (foundUser) {
            throw new HttpException(StatusCode.BAD_REQUEST, Status.FAIL, "This user already has an account.")
        }

        user.password = await AuthService.HashPassword(user.password)

        user.avatar_url = `https://ui-avatars.com/api/?name=${user.first_name}+${user.last_name}`

        const createdUser: ResourceTag = await (await db.insert(user)).raw[0]

        const newUser = await db.findOne(createdUser.id)

        return newUser
    }

    public static async update(id: string, updateUserData: Partial<UserUpdateDto>): Promise<User> {
        const db = await getConnection(process.env.CONNECTION).getRepository(User)

        const foundUser = await db.findOne(id)

        if (!foundUser) {
            throw new HttpException(StatusCode.NOT_FOUND, Status.FAIL, "Could not find user by that id.")
        }

        await db.update(id, updateUserData)

        const updatedUser = await db.findOne(id)

        return updatedUser
    }

    public static async remove(uuid: string): Promise<Number> {

        const db = await getConnection(process.env.CONNECTION).getRepository(User)

        const result = await (await db.delete(uuid)).affected

        return result
    }
}

export default UserService