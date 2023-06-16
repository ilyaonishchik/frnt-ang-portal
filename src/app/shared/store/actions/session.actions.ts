import {createAction, props} from '@ngrx/store'

import {SessionActionTypes} from '../types/session-action.type'
import {IRole} from '../../interfaces/role.interface'
import {IPermission} from '../../interfaces/permission.interface'
import {IBackendErrors} from '../../interfaces/backend-errors.interface'
import {IClient} from '@shared/interfaces/client.interface'
import {IUser} from '@shared/interfaces/user.interface'

export const getAllUsersAction = createAction(SessionActionTypes.GET_ALL_USERS)

export const getAllUsersSuccessAction = createAction(
  SessionActionTypes.GET_ALL_USERS_SUCCESS,
  props<{users: IUser[]}>()
)

export const getAllUsersFailureAction = createAction(
  SessionActionTypes.GET_ALL_USERS_FAILURE,
  props<{errors: IBackendErrors}>()
)

export const clearUsersAction = createAction(SessionActionTypes.CLEAR_USERS)

export const getAllRolesAction = createAction(SessionActionTypes.GET_ALL_ROLES)

export const getAllRolesSuccessAction = createAction(
  SessionActionTypes.GET_ALL_ROLES_SUCCESS,
  props<{roles: IRole[]}>()
)

export const getAllRolesFailureAction = createAction(
  SessionActionTypes.GET_ALL_ROLES_FAILURE,
  props<{errors: IBackendErrors}>()
)

export const clearRolesAction = createAction(SessionActionTypes.CLEAR_ROLES)

export const getAllPermissionsAction = createAction(
  SessionActionTypes.GET_ALL_PERMISSIONS
)

export const getAllPermissionsSuccessAction = createAction(
  SessionActionTypes.GET_ALL_PERMISSIONS_SUCCESS,
  props<{permissions: IPermission[]}>()
)

export const getAllPermissionsFailureAction = createAction(
  SessionActionTypes.GET_ALL_PERMISSIONS_FAILURE,
  props<{errors: IBackendErrors}>()
)

export const clearPermissionsAction = createAction(
  SessionActionTypes.CLEAR_PERMISSIONS
)

export const getClientInfoAction = createAction(
  SessionActionTypes.GET_CLIENT_INFO
)

export const getClientInfoSuccessAction = createAction(
  SessionActionTypes.GET_CLIENT_INFO_SUCCESS,
  props<{client: IClient}>()
)

export const getClientInfoFailureAction = createAction(
  SessionActionTypes.GET_CLIENT_INFO_FAILURE,
  props<{errors: IBackendErrors}>()
)
