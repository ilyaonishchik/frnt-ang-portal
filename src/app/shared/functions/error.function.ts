import {HttpErrorResponse} from '@angular/common/http'
import {IBackendError} from '../types/backend-errors.interface'

export function responseToError(response: HttpErrorResponse): IBackendError {
  let error: IBackendError
  switch (response.status) {
    case 400:
      error = {
        status: 400,
        code: response.error.error,
        message: response.error.message,
      }
      break
    case 422:
      error = {
        status: 422,
        code: response.error.detail[0].type,
        message: response.error.detail[0].msg,
      }
      break
    default:
      error = {
        status: response.status,
        code: 'error',
        message: response.statusText,
      }
      break
  }
  return error
}
