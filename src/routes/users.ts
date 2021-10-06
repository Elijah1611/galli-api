import express, { Router } from "express";
import passport from "passport";
import UserController from "../controller/UserController";

const router: Router = express.Router()

router
    .route('/users')
    // .get(passport.authenticate('jwt', { session: false }), UserController.getAll)
    .get(UserController.getAll)
    .post(UserController.create)

router
    .route('/users/:id')
    .get(UserController.getOne)
    .patch(UserController.update)
    .delete(UserController.delete)

export default router