interface IActionErrorResponse {
  error: string
  message: string
  info: {[key: string]: string}
}

interface IDetail {
  loc: string[]
  msg: string
  type: string
}

export interface IValidateErrorResponse {
  detail: IDetail[]
}

export interface IBackendErrorsResponse {
  status: number
  code: string
  error: IActionErrorResponse | IValidateErrorResponse
}
