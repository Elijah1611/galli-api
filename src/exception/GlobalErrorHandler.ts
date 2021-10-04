import { ValidationError } from "class-validator"
import { NextFunction, Request, Response } from "express"

export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    err.statusCode = err.statusCode || 500
    err.status = err.status || 'Failed'

    console.log(err)

    return res.status(err.statusCode).json({
      statusCode: err.statusCode,
      status: err.status,
      message: err.message
    })
  }