import express, { NextFunction, Request, Response, Router } from "express";
import UserController from "../controller/UserController";
import { HttpException, Status, StatusCode } from "../exception/HttpException";
import UserRouter from './users'

const router = express.Router()

router.use(UserRouter)

router.all('*', (req: Request, res: Response, next: NextFunction) => {
    const err = new HttpException(
        StatusCode.NOT_FOUND, 
        Status.FAIL,
        `Can't find the resource at ${req.originalUrl}.`
    )
    
    next(err)
})

export default router