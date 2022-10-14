import {createAction, props} from '@ngrx/store'

import {ActionTypes} from '../actionTypes'
import {IActionErrorResponse} from 'src/app/shared/interfaces/action-error-response.interface'
import {IPermission} from 'src/app/shared/interfaces/permission.interface'

export const readPermissionAction = createAction(
  ActionTypes.GET_PERMISSION,
  props<{id: number}>()
)

export const readPermissionSuccessAction = createAction(
  ActionTypes.GET_PERMISSION_SUCCESS,
  props<{item: IPermission}>()
)

export const readPermissionFailureAction = createAction(
  ActionTypes.GET_PERMISSION_FAILURE,
  props<{error: IActionErrorResponse}>()
)
