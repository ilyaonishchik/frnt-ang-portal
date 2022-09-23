import {createAction, props} from '@ngrx/store'
import {ActionTypes} from '../actionTypes'
import {ISigninRequest} from '../../types/signin-request.interface'
import {IBackendError} from '../../../../shared/types/backend-errors.interface'
import {ICurrentUser} from '../../../../shared/types/current-user.interface'

export const signinAction = createAction(
  ActionTypes.SIGNIN,
  props<{request: ISigninRequest}>()
)

export const signinSuccessAction = createAction(
  ActionTypes.SIGNIN_SUCCESS,
  props<{currentUser: ICurrentUser}>()
)

export const signinFailureAction = createAction(
  ActionTypes.SIGNIN_FAILURE,
  props<{error: IBackendError}>()
)
