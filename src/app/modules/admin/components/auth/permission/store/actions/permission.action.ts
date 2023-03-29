import {createAction, props} from '@ngrx/store'

import {PermissionActionTypes} from '../actionTypes'
import {IPermission} from '@shared/interfaces/permission.interface'
import {IBackendErrors} from '@shared/interfaces/backend-errors.interface'
import {IDeleteResponse} from '@shared/interfaces/delete-response.interface'

export const getPermissionAction = createAction(
  PermissionActionTypes.GET_PERMISSION,
  props<{id: number}>()
)

export const getPermissionSuccessAction = createAction(
  PermissionActionTypes.GET_PERMISSION_SUCCESS,
  props<{permission: IPermission}>()
)

export const getPermissionFailureAction = createAction(
  PermissionActionTypes.GET_PERMISSION_FAILURE,
  props<{errors: IBackendErrors}>()
)

export const createPermissionAction = createAction(
  PermissionActionTypes.CREATE_PERMISSION,
  props<{permission: IPermission}>()
)

export const createPermissionSuccessAction = createAction(
  PermissionActionTypes.CREATE_PERMISSION_SUCCESS,
  props<{permission: IPermission}>()
)

export const createPermissionFailureAction = createAction(
  PermissionActionTypes.CREATE_PERMISSION_FAILURE,
  props<{errors: IBackendErrors}>()
)

export const updatePermissionAction = createAction(
  PermissionActionTypes.UPDATE_PERMISSION,
  props<{id: number; permission: IPermission}>()
)

export const updatePermissionSuccessAction = createAction(
  PermissionActionTypes.UPDATE_PERMISSION_SUCCESS,
  props<{permission: IPermission}>()
)

export const updatePermissionFailureAction = createAction(
  PermissionActionTypes.UPDATE_PERMISSION_FAILURE,
  props<{errors: IBackendErrors}>()
)

export const deletePermissionAction = createAction(
  PermissionActionTypes.DELETE_PERMISSION,
  props<{id: number}>()
)

export const deletePermissionSuccessAction = createAction(
  PermissionActionTypes.DELETE_PERMISSION_SUCCESS,
  props<{response: IDeleteResponse}>()
)

export const deletePermissionFailureAction = createAction(
  PermissionActionTypes.DELETE_PERMISSION_FAILURE,
  props<{errors: IBackendErrors}>()
)
