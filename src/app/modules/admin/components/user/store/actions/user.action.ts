import {createAction, props} from '@ngrx/store'

import {ActionTypes} from '../actionTypes'
import {IUser} from 'src/app/shared/interfaces/user.interface'
import {IBackendErrors} from 'src/app/shared/interfaces/backend-errors.interface'
import {IDeleteResponse} from 'src/app/shared/interfaces/delete-response.interface'

export const getUserAction = createAction(
  ActionTypes.GET_USER,
  props<{id: number}>()
)

export const getUserSuccessAction = createAction(
  ActionTypes.GET_USER_SUCCESS,
  props<{user: IUser}>()
)

export const getUserFailureAction = createAction(
  ActionTypes.GET_USER_FAILURE,
  props<{errors: IBackendErrors}>()
)

export const createUserAction = createAction(
  ActionTypes.CREATE_USER,
  props<{user: IUser}>()
)

export const createUserSuccessAction = createAction(
  ActionTypes.CREATE_USER_SUCCESS,
  props<{user: IUser}>()
)

export const createUserFailureAction = createAction(
  ActionTypes.CREATE_USER_FAILURE,
  props<{errors: IBackendErrors}>()
)

export const updateUserAction = createAction(
  ActionTypes.UPDATE_USER,
  props<{id: number; user: IUser}>()
)

export const updateUserSuccessAction = createAction(
  ActionTypes.UPDATE_USER_SUCCESS,
  props<{user: IUser}>()
)

export const updateUserFailureAction = createAction(
  ActionTypes.UPDATE_USER_FAILURE,
  props<{errors: IBackendErrors}>()
)

export const deleteUserAction = createAction(
  ActionTypes.DELETE_USER,
  props<{id: number}>()
)

export const deleteUserSuccessAction = createAction(
  ActionTypes.DELETE_USER_SUCCESS,
  props<{response: IDeleteResponse}>()
)

export const deleteUserFailureAction = createAction(
  ActionTypes.DELETE_USER_FAILURE,
  props<{errors: IBackendErrors}>()
)
