import {IRole} from './role.interface'
import {IPermission} from './permission.interface'
import {IBackendErrors} from './backend-errors.interface'

export interface ISessionState {
  isLoading: boolean
  backendErrors: IBackendErrors | null
  allRoles: IRole[] | null
  allPermissions: IPermission[] | null
}
