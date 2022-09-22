import {createAction, props} from '@ngrx/store'

import {ActionTypes} from '../actionTypes'
import {ISignupRequest} from '../../types/signup-request.interface'
import {ICurrentUser} from '../../../../shared/types/current-user.interface'

export const signupAction = createAction(
  ActionTypes.SIGNUP,
  props<{request: ISignupRequest}>()
)

export const signupSuccessAction = createAction(
  ActionTypes.SIGNUP_SUCCESS,
  props<{currentUser: ICurrentUser}>()
)

export const signupFailureAction = createAction(ActionTypes.SIGNUP_FAILURE)
