import express, { Router } from "express";
import UserController from "../controller/UserController";

const router: Router = express.Router()

router.get('/users', UserController.getAll)

router.get('/users/:id', UserController.getOne)

router.post('/users', UserController.create)

router.patch('/users/:id', UserController.update)

router.delete('/users/:id', UserController.delete)

export default router