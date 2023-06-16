import {IUserFull} from '@shared/interfaces/user.interface'
import {IBackendErrors} from '@shared/interfaces/backend-errors.interface'

export interface IUserState {
  isLoading: boolean
  isSubmitting: boolean
  backendErrors: IBackendErrors | null
  item: IUserFull | null
}
