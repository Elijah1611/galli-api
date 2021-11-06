import express, { Router } from "express";
import { PostController } from "../controller/PostController";

const router: Router = express.Router()


router.get('/posts/all', PostController.getAllFull)

router.get('/posts/:id/all', PostController.getOneFull)

router.get('/posts/:id', PostController.getOne)
router.patch('/posts/:id', PostController.update)
router.delete('/posts/:id', PostController.delete)

router.post('/posts/addLike', PostController.addLike)
router.post('/posts/removeLike', PostController.removeLike)
router.get('/posts', PostController.getAll)
router.post('/posts', PostController.create)


export default router