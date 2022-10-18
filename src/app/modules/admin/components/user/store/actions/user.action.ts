import {createAction, props} from '@ngrx/store'

import {ActionTypes} from '../actionTypes'
import {IUserInfo} from 'src/app/shared/interfaces/user.interface'

export const getUserAction = createAction(
  ActionTypes.GET_USER,
  props<{id: number}>()
)

export const getUserSuccessAction = createAction(
  ActionTypes.GET_USER_SUCCESS,
  props<{user: IUserInfo}>()
)

export const getUserFailureAction = createAction(ActionTypes.GET_USER_FAILURE)
