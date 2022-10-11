import {ICurrentUser} from 'src/app/shared/interfaces/current-user.interface'
import {IBackendError} from 'src/app/shared/interfaces/backend-errors.interface'
import {IRole} from 'src/app/shared/interfaces/role.interface'
import {IPermission} from 'src/app/shared/interfaces/permission.interface'

export interface IAuthState {
  isSubmitting: boolean
  isLoading: boolean
  currentUser: ICurrentUser | null
  allRoles: IRole[]
  allPermissions: IPermission[]
  isSignedIn: boolean | null
  validationError: IBackendError | null
  redirectUrl: string
}
