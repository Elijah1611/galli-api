import S3, { GetObjectRequest, PutObjectRequest } from "aws-sdk/clients/s3"
import fs from 'fs'
import util from 'util'

const unlinkFile = util.promisify(fs.unlink)

export class ImageService {

    public static CreateS3Connection() {
        return new S3({
            region: process.env.AWS_BUCKET_REGION,
            accessKeyId: process.env.AWS_ACCESS_KEY,
            secretAccessKey: process.env.AWS_SECRET_KEY
        })
    }

    public static async UploadImageToS3(file: any) {
        console.log('bucket', process.env.AWS_BUCKET_NAME)
        // could resize image here
        const fileStream = fs.createReadStream(file.path)

        const uploadParams: PutObjectRequest = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Body: fileStream,
            Key: file.filename
        }

        const s3 = this.CreateS3Connection()

        const result = await s3.upload(uploadParams).promise()

        await unlinkFile(file.path)

        return result
    }

    public static DownloadImageFromS3(file_key: string) {

        const downloadParams: GetObjectRequest = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: file_key
        }

        const s3 = this.CreateS3Connection()

        return s3.getObject(downloadParams).createReadStream()
    }
}