import { getConnection } from "typeorm"
import { User } from "../entity/User"
import { HttpException, Status, StatusCode } from "../exception/HttpException"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export class AuthService {

    public static async Authenticate(username: string, password: string): Promise<string> {
        const connection = getConnection(process.env.CONNECTION)
        const db = connection.getRepository(User)
        const dbQuery = connection.createQueryBuilder()

        
        const user = await db.findOne({ username: username })
        
        if (!user)
            throw new HttpException(StatusCode.UNAUTHORIZED, Status.FAIL, "User Does Not Exist.") 
            
        // @TODO: Refactor to use simple syntax 
        // db.find({ select: ["password"], where: { username: user.username } })
        const userPasswordResults = await connection.manager.query(`SELECT "password" FROM "user" as u WHERE u.username = '${user.username}'`)
        const userPassword = userPasswordResults[0].password

        if (!user)
            throw new HttpException(StatusCode.UNAUTHORIZED, Status.FAIL, "Username or Password is incorrect.")

        const passwordMatch = await bcrypt.compare(password, userPassword)

        if (!passwordMatch)
            throw new HttpException(StatusCode.UNAUTHORIZED, Status.FAIL, "Username or Password is incorrect.")

        const token: string = this.CreateJwtToken(user.id, user.username)

        return token
    }

    public static CreateJwtToken(uuid: string, username: string): string {
        const token = jwt.sign({ id: uuid, username }, process.env.SECRET, { expiresIn: '3h' });

        return token
    }

    public static async HashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, 12)
    }

}