import {createAction, props} from '@ngrx/store'

import {ActionTypes} from '../actionTypes'
import {IDeleteResponse} from 'src/app/shared/interfaces/delete-response.interface'
import {IActionErrorResponse} from 'src/app/shared/interfaces/action-error-response.interface'

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
  props<{error: IActionErrorResponse}>()
)
