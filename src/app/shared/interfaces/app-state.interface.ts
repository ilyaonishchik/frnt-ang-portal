import {IAuthState} from '../../modules/auth/interfaces/auth-state.interface'
import {IPermissionsState} from '../../modules/admin/sections/auth/permissions/interfaces/permissions-state.interface'
import {IRolesState} from '../../modules/admin/sections/auth/roles/interfaces/roles-state.interface'
import {IUsersState} from '../../modules/admin/sections/auth/users/interfaces/users-state.interface'

export interface IAppState {
  auth: IAuthState
  permissions: IPermissionsState
  roles: IRolesState
  users: IUsersState
}
