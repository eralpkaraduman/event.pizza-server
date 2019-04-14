export class HttpError extends Error {
  code: number
  constructor(message: string, code = 500) {
    super(message)
    this.name = 'HttpError'
    this.code = code
  }
}

export class BadRequestError extends HttpError {
  constructor(message: string) {
    super(message, 400)
    this.name = 'BadRequestError'
  }
}

export class MissingParameterError extends BadRequestError {
  constructor(parameterName: string) {
    super(`Missing parameter '${parameterName}'`)
  }
}

export class MissingHeaderError extends BadRequestError {
  constructor(headerName: string) {
    super(`Missing header '${headerName}'`)
  }
}
