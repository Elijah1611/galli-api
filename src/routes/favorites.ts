import express, { Router } from "express";
import FavoriteController from "../controller/FavoriteController";

const router: Router = express.Router()

router.get('/favorites/:id', FavoriteController.getOne)

router.patch('/favorites/:id', FavoriteController.update)

router.delete('/favorites/:id', FavoriteController.delete)

router.get('/favorites', FavoriteController.getAll)

router.post('/favorites', FavoriteController.create)

export default router