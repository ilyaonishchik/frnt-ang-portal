import {HttpErrorResponse} from '@angular/common/http'

import {IBackendErrors} from '../interfaces/backend-errors.interface'
import {capitalize} from './string.function'
import {IValidateErrorResponse} from '../interfaces/backend-errors-response.interface'

export function responseToErrors(response: HttpErrorResponse): IBackendErrors {
  const errors: IBackendErrors = {}
  switch (response.status) {
    case 400:
      errors['_'] = response.error.message
      break
    case 404:
      errors['_'] = `Ресурс не найден: ${response.url}`
      break
    case 422:
      const validateErrors: IValidateErrorResponse = response.error
      for (const key in validateErrors.detail) {
        errors[validateErrors.detail[key].loc[1]] = capitalize(
          validateErrors.detail[key].msg
        )
      }
      break
    default:
      errors['_error_'] = response.statusText
  }
  return errors
}
