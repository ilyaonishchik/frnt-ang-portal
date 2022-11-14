import {IAuthState} from '../../modules/auth/interfaces/auth-state.interface'
import {IPermissionsState} from '../../modules/admin/sections/auth/permissions/interfaces/permissions-state.interface'
import {IPermissionState} from '../../modules/admin/components/permission/interfaces/permission-state.interface'
import {IRolesState} from '../../modules/admin/sections/auth/roles/interfaces/roles-state.interface'
import {IUserState} from '../../modules/admin/components/user/interfaces/user-state.interface'
import {IRoleState} from '../../modules/admin/components/role/interfaces/role-state.interface'
import {IUsersState} from '../../modules/admin/sections/auth/users/interfaces/users-state.interface'

export interface IAppState {
  auth: IAuthState
  permissions: IPermissionsState
  permission: IPermissionState
  roles: IRolesState
  role: IRoleState
  users: IUsersState
  user: IUserState
}
