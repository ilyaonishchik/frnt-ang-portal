import {IBackendErrors} from '@shared/interfaces/backend-errors.interface'
import {IUser} from '@shared/interfaces/user.interface'

export interface IAuthState {
  isLoading: boolean
  isSubmitting: boolean
  isSignedIn: boolean
  currentUser: IUser | null
  backendErrors: IBackendErrors | null
  redirectUrl: string
}
