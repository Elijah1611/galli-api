import express, { Router } from "express";
import { UnsplashController } from "../controller/UnsplashController";

const router: Router = express.Router()

router.get('/unsplash/full', UnsplashController.getRandomPhoto)

router.get('/unsplash', UnsplashController.getRandomPhotoTrimmed)

export default router