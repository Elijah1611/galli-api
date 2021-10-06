import express, { Router } from "express";
import { AuthController } from "../controller/AuthController";

const router: Router = express.Router()

router.post('/auth/register', AuthController.Register)

router.post('/auth/login', AuthController.Login)

export default router