import express, { Router } from "express";
import { PostController } from "../controller/PostController";

const router: Router = express.Router()


router.get('/posts/all', PostController.getAllFull)

router.get('/posts/:id/all', PostController.getOneFull)

router.get('/posts/:id', PostController.getOne)
router.patch('/posts/:id', PostController.update)
router.delete('/posts/:id', PostController.delete)

router.get('/posts', PostController.getAll)
router.post('/posts', PostController.create)


export default router