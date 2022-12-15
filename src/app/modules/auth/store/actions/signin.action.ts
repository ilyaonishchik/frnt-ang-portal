import {createAction, props} from '@ngrx/store'

import {AuthActionTypes} from '../actionTypes'
import {ISigninRequest} from '../../interfaces/signin-request.interface'
import {IBackendErrors} from '@shared/interfaces/backend-errors.interface'
import {IUser} from '@shared/interfaces/user.interface'

export const signinAction = createAction(
  AuthActionTypes.SIGNIN,
  props<{request: ISigninRequest}>()
)

export const signinSuccessAction = createAction(
  AuthActionTypes.SIGNIN_SUCCESS,
  props<{currentUser: IUser}>()
)

export const signinFailureAction = createAction(
  AuthActionTypes.SIGNIN_FAILURE,
  props<{errors: IBackendErrors}>()
)
