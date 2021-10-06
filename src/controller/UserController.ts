import { transformAndValidate } from "class-transformer-validator";
import { NextFunction, Request, Response } from "express"
import { UserCreateDto } from "../dto/create/UserCreateDto";
import { UserUpdateDto } from "../dto/update/UserUpdateDto";
import { User } from "../entity/User";
import { HttpException, StatusCode } from "../exception/HttpException";
import { TryCatch } from "../exception/TryCatch";
import { ResourceTag } from "../interface/ResourceTag";
import UserService from "../service/UserService";

export class UserController {

        @TryCatch
        public static async getAll(req: Request, res: Response): Promise<Response<User[]>> {

                const result = await UserService.getAll()

                return res.status(StatusCode.OK).json(result)
        }

        @TryCatch
        public static async getOne(req: Request, res: Response): Promise<Response<User>> {

                const uuid = req.params.id

                const result = await UserService.getByUUID(uuid)

                return res.status(StatusCode.OK).json(result)
        }

        @TryCatch
        public static async create(req: Request, res: Response, next: NextFunction): Promise<Response<ResourceTag>> {

                const user = await transformAndValidate(UserCreateDto, req.body) as UserCreateDto;

                const newUser = await UserService.create(user)

                return res.status(StatusCode.CREATED).json(newUser)
        }

        @TryCatch
        public static async update(req: Request, res: Response, next: NextFunction): Promise<Response<User>> {

                const id = req.params.id

                const user = await transformAndValidate(UserUpdateDto, req.body) as UserUpdateDto;

                const updatedUser = await UserService.update(id, user)

                return res.status(StatusCode.OK).json(updatedUser)
        }

        @TryCatch
        public static async delete(req: Request, res: Response, next: NextFunction): Promise<Response<HttpException>> {

                const id = req.params.id

                const removed = await UserService.remove(id)

                return res.status(StatusCode.OK).json({
                        statusCode: StatusCode.OK,
                        status: 'Successful',
                        message: `${removed} user successfully removed.`,
                })
        }
}

export default UserController