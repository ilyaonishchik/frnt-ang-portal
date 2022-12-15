import {createAction, props} from '@ngrx/store'

import {AuthActionTypes} from '../actionTypes'
import {ISignupRequest} from '../../interfaces/signup-request.interface'
import {IUser} from '@shared/interfaces/user.interface'
import {IBackendErrors} from '@shared/interfaces/backend-errors.interface'

export const signupAction = createAction(
  AuthActionTypes.SIGNUP,
  props<{request: ISignupRequest}>()
)

export const signupSuccessAction = createAction(
  AuthActionTypes.SIGNUP_SUCCESS,
  props<{currentUser: IUser}>()
)

export const signupFailureAction = createAction(
  AuthActionTypes.SIGNUP_FAILURE,
  props<{errors: IBackendErrors}>()
)
