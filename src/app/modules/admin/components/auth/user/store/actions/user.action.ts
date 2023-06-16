import {createAction, props} from '@ngrx/store'

import {UserActionTypes} from '../actionTypes'
import {IUserFull} from '@shared/interfaces/user.interface'
import {IBackendErrors} from '@shared/interfaces/backend-errors.interface'
import {IDeleteResponse} from '@shared/interfaces/delete-response.interface'

export const getUserAction = createAction(
  UserActionTypes.GET_USER,
  props<{id: number}>()
)

export const getUserSuccessAction = createAction(
  UserActionTypes.GET_USER_SUCCESS,
  props<{user: IUserFull}>()
)

export const getUserFailureAction = createAction(
  UserActionTypes.GET_USER_FAILURE,
  props<{errors: IBackendErrors}>()
)

export const createUserAction = createAction(
  UserActionTypes.CREATE_USER,
  props<{user: IUserFull}>()
)

export const createUserSuccessAction = createAction(
  UserActionTypes.CREATE_USER_SUCCESS,
  props<{user: IUserFull}>()
)

export const createUserFailureAction = createAction(
  UserActionTypes.CREATE_USER_FAILURE,
  props<{errors: IBackendErrors}>()
)

export const updateUserAction = createAction(
  UserActionTypes.UPDATE_USER,
  props<{id: number; user: IUserFull}>()
)

export const updateUserSuccessAction = createAction(
  UserActionTypes.UPDATE_USER_SUCCESS,
  props<{user: IUserFull}>()
)

export const updateUserFailureAction = createAction(
  UserActionTypes.UPDATE_USER_FAILURE,
  props<{errors: IBackendErrors}>()
)

export const deleteUserAction = createAction(
  UserActionTypes.DELETE_USER,
  props<{id: number}>()
)

export const deleteUserSuccessAction = createAction(
  UserActionTypes.DELETE_USER_SUCCESS,
  props<{response: IDeleteResponse}>()
)

export const deleteUserFailureAction = createAction(
  UserActionTypes.DELETE_USER_FAILURE,
  props<{errors: IBackendErrors}>()
)

// export const clearUserStateAction = createAction(UserActionTypes.CLEAR_STATE)
