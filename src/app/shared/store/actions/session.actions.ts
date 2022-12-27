import {createAction, props} from '@ngrx/store'

import {SessionActionTypes} from '../types/session-action.type'
import {IRole} from '../../interfaces/role.interface'
import {IPermission} from '../../interfaces/permission.interface'
import {IBackendErrors} from '../../interfaces/backend-errors.interface'

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
