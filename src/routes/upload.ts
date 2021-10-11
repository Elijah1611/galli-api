import multer from 'multer'
import express, { Router } from "express";
import { ImageController } from "../controller/ImageController";

const router: Router = express.Router()

const upload = multer({ dest: './src/uploads/' })

router.post('/upload/image', upload.single('image'), ImageController.Upload)

router.get('/image/:key', ImageController.GetImageByKey)

export default router