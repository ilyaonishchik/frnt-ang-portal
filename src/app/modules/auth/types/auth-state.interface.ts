import {ICurrentUser} from '../../../shared/types/current-user.interface'
import {IBackendError} from '../../../shared/types/backend-errors.interface'

export interface IAuthState {
  isSubmitting: boolean
  isLoading: boolean
  currentUser: ICurrentUser | null
  isSignedIn: boolean | null
  validationError: IBackendError | null
  redirectUrl: string
}
