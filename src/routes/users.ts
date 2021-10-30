import express, { Router } from "express";
import passport from "passport";
import UserController from "../controller/UserController";

const router: Router = express.Router()

router.get('/users/username/:username', UserController.getOneByUsername)

router.get('/users/:id', UserController.getOne)
router.patch('/users/:id', UserController.update)
router.delete('/users/:id', UserController.delete)

router.get('/users', UserController.getAll)
router.post('/users', UserController.create)
// .get(passport.authenticate('jwt', { session: false }), UserController.getAll)


export default router