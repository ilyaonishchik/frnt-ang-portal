import {createAction, props} from '@ngrx/store'

import {ActionTypes} from '../actionTypes'
import {
  IPermission,
  IPermissionSave,
} from 'src/app/shared/interfaces/permission.interface'
import {IBackendErrors} from 'src/app/shared/interfaces/backend-errors.interface'
import {IBackendErrorResponse} from 'src/app/shared/interfaces/backend-error-response.interface'

export const getPermissionAction = createAction(
  ActionTypes.GET_PERMISSION,
  props<{id: number}>()
)

export const getPermissionSuccessAction = createAction(
  ActionTypes.GET_PERMISSION_SUCCESS,
  props<{permission: IPermission}>()
)

export const getPermissionFailureAction = createAction(
  ActionTypes.GET_PERMISSION_FAILURE
)

export const createPermissionAction = createAction(
  ActionTypes.CREATE_PERMISSION,
  props<{permission: IPermissionSave}>()
)

export const createPermissionSuccessAction = createAction(
  ActionTypes.CREATE_PERMISSION_SUCCESS,
  props<{permission: IPermission}>()
)

export const createPermissionFailureAction = createAction(
  ActionTypes.CREATE_PERMISSION_FAILURE,
  props<{response: IBackendErrorResponse}>()
)

export const updatePermissionAction = createAction(
  ActionTypes.UPDATE_PERMISSION,
  props<{id: number; permission: IPermissionSave}>()
)

export const updatePermissionSuccessAction = createAction(
  ActionTypes.UPDATE_PERMISSION_SUCCESS,
  props<{permission: IPermission}>()
)

export const updatePermissionFailureAction = createAction(
  ActionTypes.UPDATE_PERMISSION_FAILURE,
  props<{errors: IBackendErrors}>()
)
