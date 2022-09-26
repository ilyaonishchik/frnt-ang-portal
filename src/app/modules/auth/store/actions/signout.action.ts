import {createAction, props} from '@ngrx/store'
import {ActionTypes} from '../actionTypes'
import {IBackendError} from '../../../../shared/types/backend-errors.interface'

export const signoutAction = createAction(ActionTypes.SIGNOUT)

export const signoutSuccessAction = createAction(
  ActionTypes.SIGNOUT_SUCCESS,
  props<{url: string}>()
)

export const signoutFailureAction = createAction(
  ActionTypes.SIGNOUT_FAILURE,
  props<{error: IBackendError}>()
)
