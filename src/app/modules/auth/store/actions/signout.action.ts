import {createAction, props} from '@ngrx/store'

import {AuthActionTypes} from '../actionTypes'
import {IBackendErrors} from '@shared/interfaces/backend-errors.interface'

export const signoutAction = createAction(AuthActionTypes.SIGNOUT)

export const signoutSuccessAction = createAction(
  AuthActionTypes.SIGNOUT_SUCCESS,
  props<{url: string}>()
)

export const signoutFailureAction = createAction(
  AuthActionTypes.SIGNOUT_FAILURE,
  props<{errors: IBackendErrors}>()
)
