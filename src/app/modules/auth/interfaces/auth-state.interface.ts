import {IBackendErrors} from '@shared/interfaces/backend-errors.interface'
import {IUserFull} from '@shared/interfaces/user.interface'

export interface IAuthState {
  isLoading: boolean
  isSubmitting: boolean
  isSignedIn: boolean
  currentUser: IUserFull | null
  backendErrors: IBackendErrors | null
  redirectUrl: string
}
