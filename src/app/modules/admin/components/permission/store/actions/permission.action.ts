import {createAction, props} from '@ngrx/store'

import {ActionTypes} from '../actionTypes'
import {IPermission} from 'src/app/shared/interfaces/permission.interface'

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
