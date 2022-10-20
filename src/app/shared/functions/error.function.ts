import {HttpErrorResponse} from '@angular/common/http'
import {
  IBackendError,
  IBackendErrors,
} from '../interfaces/backend-errors.interface'
import {IValidateErrorResponse} from '../interfaces/backend-error-response.interface'
import {capitalize} from './string.function'

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

export function responseToErrors(response: HttpErrorResponse): IBackendErrors {
  let errors: IBackendErrors = {}
  switch (response.status) {
    case 400:
      errors['_'] = response.error.message
      break
    case 422:
      let validateErrors: IValidateErrorResponse = response.error
      for (const key in validateErrors.detail) {
        errors[validateErrors.detail[key].loc[1]] = capitalize(
          validateErrors.detail[key].msg
        )
      }
      break
    default:
      errors['_error_'] = response.statusText
      break
  }
  return errors
}
