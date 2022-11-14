import {IUser} from 'src/app/shared/interfaces/user.interface'
import {IBackendErrors} from 'src/app/shared/interfaces/backend-errors.interface'

export interface IUserState {
  isLoading: boolean
  isSubmitting: boolean
  backendErrors: IBackendErrors | null
  item: IUser | null
}
