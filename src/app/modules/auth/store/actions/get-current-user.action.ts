import {createAction, props} from '@ngrx/store'

import {AuthActionTypes} from '../actionTypes'
import {IUserFull} from '@shared/interfaces/user.interface'
import {IBackendErrors} from '@shared/interfaces/backend-errors.interface'

export const getCurrentUserAction = createAction(
  AuthActionTypes.GET_CURRENT_USER
)

export const getCurrentUserSuccessAction = createAction(
  AuthActionTypes.GET_CURRENT_USER_SUCCESS,
  props<{currentUser: IUserFull}>()
)

export const getCurrentUserFailureAction = createAction(
  AuthActionTypes.GET_CURRENT_USER_FAILURE,
  props<{errors: IBackendErrors | null}>()
)
