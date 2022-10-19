import {createAction, props} from '@ngrx/store'

import {ActionTypes} from '../actionTypes'
import {
  IPermission,
  IPermissionSave,
} from 'src/app/shared/interfaces/permission.interface'

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
  ActionTypes.CREATE_PERMISSION_FAILURE
)
