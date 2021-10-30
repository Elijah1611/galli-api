import { transformAndValidate } from "class-transformer-validator";
import { Request, Response } from "express"
import { UserCreateDto } from "../dto/create/UserCreateDto";
import { LoginDto } from "../dto/LoginDto";
import { StatusCode } from "../exception/HttpException";
import { TryCatch } from "../exception/TryCatch";
import { AuthService } from "../service/AuthService";
import UserService from "../service/UserService";


export class AuthController {

    @TryCatch
    public static async Login(req: Request, res: Response) {

        const user = await transformAndValidate(LoginDto, req.body) as LoginDto;

        const token = await AuthService.Authenticate(user.username, user.password)

        return res.status(StatusCode.OK).json({ access_token: `Bearer ${token}`, username: user.username })
    }

    @TryCatch
    public static async Register(req: Request, res: Response) {

        const user = await transformAndValidate(UserCreateDto, req.body) as UserCreateDto;

        const newUser = await UserService.create(user)

        const token = AuthService.CreateJwtToken(newUser.id, newUser.username)

        return res.status(StatusCode.OK).json({ access_token: token, username: newUser.username })
    }
}
