import { ValidationError } from "class-validator"
import { NextFunction, Request, Response } from "express"
import { Status } from "./HttpException"

export const validationErrorHandler = (err: ValidationError[], req: Request, res: Response, next: NextFunction) => {
    // @TODO: What if error is not validation error but an array?
    if (!Array.isArray(err)) return next(err)

    const errors = err.map(e => ({
      invalid: e.property,
      validation: e.constraints
    }))

    const httpEx = {
      statusCode: 400,
      status: Status.FAIL,
      message: errors
    }

    return res.status(400).json(httpEx)
  }