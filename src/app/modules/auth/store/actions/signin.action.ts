import {createAction, props} from '@ngrx/store'
import {ActionTypes} from '../actionTypes'
import {ISigninRequest} from '../../interfaces/signin-request.interface'
import {IBackendError} from 'src/app/shared/interfaces/backend-errors.interface'
import {ICurrentUser} from 'src/app/shared/interfaces/current-user.interface'

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
