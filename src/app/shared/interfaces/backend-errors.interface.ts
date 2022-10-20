export interface IBackendErrors {
  [key: string]: string | number
}

export interface IBackendError {
  status: number
  code: string
  message: string
}
