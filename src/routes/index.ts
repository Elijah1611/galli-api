import express, { NextFunction, Request, Response, Router } from "express";
import UserController from "../controller/UserController";
import { HttpException, Status, StatusCode } from "../exception/HttpException";

const router: Router = express.Router()

router.get('/users/:id', UserController.getOne)
router.patch('/users/:id', UserController.update)
router.delete('/users/:id', UserController.delete)
router.get('/users', UserController.getAll)
router.post('/users', UserController.create)

router.all('*', (req: Request, res: Response, next: NextFunction) => {
    const err = new HttpException(
        StatusCode.NOT_FOUND, 
        Status.FAIL,
        `Can't find the resource at ${req.originalUrl}.`
    )
    
    next(err)
})

export default router