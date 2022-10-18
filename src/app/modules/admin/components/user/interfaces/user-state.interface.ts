import {IUserInfo} from 'src/app/shared/interfaces/user.interface'
import {IBackendError} from 'src/app/shared/interfaces/backend-errors.interface'

export interface IUserState {
  isLoading: boolean
  isReadOnly: boolean
  isSubmitting: boolean
  validationError: IBackendError | null
  item: IUserInfo | null
}
