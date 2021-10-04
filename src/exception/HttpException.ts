export enum Status {
  SUCCESS = 'Successful',
  FAIL = 'Failed'
}

export enum StatusCode {
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  NO_CONTENT = 204,

  MOVED_PERMANENTLY = 301,
  NOT_MODIFIED = 304,

  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  METHOD_NOT_ALLOWED = 405,

  INTERNAL_SERVER_ERROR = 500
}

export class HttpException extends Error {
    public status: Status
    public message: string
    public statusCode: number
    public isOperational: boolean

    constructor(statusCode: number = StatusCode.BAD_REQUEST, status: Status = Status.FAIL, message: string) {
      super(message)

      this.statusCode = statusCode
      this.status = status
      this.message = message
      this.isOperational = true
      

      // Exclude this class from the stacktrace so that it does not pollute it.
      Error.captureStackTrace(this, this.constructor)
    }
  }