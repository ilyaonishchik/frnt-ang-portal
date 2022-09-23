import {ICurrentUser} from '../../../shared/types/current-user.interface'
import {IBackendError} from '../../../shared/types/backend-errors.interface'

export interface IAuthState {
  isSubmitting: boolean
  currentUser: ICurrentUser | null
  isSignedUp: boolean | null
  isSignedIn: boolean | null
  validationError: IBackendError | null
}
