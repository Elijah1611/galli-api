import express, { NextFunction, Request, Response, Router } from "express";
import { HttpException, Status, StatusCode } from "../exception/HttpException";
import UserRouter from './users'
import AuthRouter from './auth'
import UnsplashRouter from './unsplash'

const router = express.Router()

router.use(AuthRouter)

router.use(UserRouter)

router.use(UnsplashRouter)

router.all('*', (req: Request, res: Response, next: NextFunction) => {
    const err = new HttpException(
        StatusCode.NOT_FOUND,
        Status.FAIL,
        `Can't find the resource at ${req.originalUrl}.`
    )

    next(err)
})

export default router