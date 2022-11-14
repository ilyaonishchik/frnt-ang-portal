import {createAction, props} from '@ngrx/store'

import {ActionTypes} from '../actionTypes'
import {IPermission} from 'src/app/shared/interfaces/permission.interface'
import {IBackendErrors} from 'src/app/shared/interfaces/backend-errors.interface'
import {IDeleteResponse} from 'src/app/shared/interfaces/delete-response.interface'

export const getPermissionAction = createAction(
  ActionTypes.GET_PERMISSION,
  props<{id: number}>()
)

export const getPermissionSuccessAction = createAction(
  ActionTypes.GET_PERMISSION_SUCCESS,
  props<{permission: IPermission}>()
)

export const getPermissionFailureAction = createAction(
  ActionTypes.GET_PERMISSION_FAILURE,
  props<{errors: IBackendErrors}>()
)

export const createPermissionAction = createAction(
  ActionTypes.CREATE_PERMISSION,
  props<{permission: IPermission}>()
)

export const createPermissionSuccessAction = createAction(
  ActionTypes.CREATE_PERMISSION_SUCCESS,
  props<{permission: IPermission}>()
)

export const createPermissionFailureAction = createAction(
  ActionTypes.CREATE_PERMISSION_FAILURE,
  props<{errors: IBackendErrors}>()
)

export const updatePermissionAction = createAction(
  ActionTypes.UPDATE_PERMISSION,
  props<{id: number; permission: IPermission}>()
)

export const updatePermissionSuccessAction = createAction(
  ActionTypes.UPDATE_PERMISSION_SUCCESS,
  props<{permission: IPermission}>()
)

export const updatePermissionFailureAction = createAction(
  ActionTypes.UPDATE_PERMISSION_FAILURE,
  props<{errors: IBackendErrors}>()
)

export const deletePermissionAction = createAction(
  ActionTypes.DELETE_PERMISSION,
  props<{id: number}>()
)

export const deletePermissionSuccessAction = createAction(
  ActionTypes.DELETE_PERMISSION_SUCCESS,
  props<{response: IDeleteResponse}>()
)

export const deletePermissionFailureAction = createAction(
  ActionTypes.DELETE_PERMISSION_FAILURE,
  props<{errors: IBackendErrors}>()
)
