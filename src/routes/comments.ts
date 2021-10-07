import express, { Router } from "express";
import { CommentController } from "../controller/CommentController";

const router: Router = express.Router()

router.get('/comments/:id', CommentController.getOne)

router.patch('/comments/:id', CommentController.update)

router.delete('/comments/:id', CommentController.delete)

router.get('/comments', CommentController.getAll)

router.post('/comments', CommentController.create)

export default router