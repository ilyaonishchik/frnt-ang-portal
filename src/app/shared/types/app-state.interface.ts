import {IAuthState} from '../../modules/auth/types/auth-state.interface'
import {IPermissionsState} from '../../modules/admin/sections/auth/permissions/interfaces/permissions-state.interface'

export interface IAppState {
  auth: IAuthState
  permissions: IPermissionsState
}
