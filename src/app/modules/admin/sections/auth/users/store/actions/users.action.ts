import {createAction, props} from '@ngrx/store'

import {LazyLoadEvent} from 'primeng/api'

import {UsersActionTypes} from '../actionTypes'
import {ITableItems} from '@shared/interfaces/table-items.interface'
import {IBackendErrors} from '@shared/interfaces/backend-errors.interface'
import {IUser} from '@shared/interfaces/user.interface'

export const getUsersAction = createAction(
  UsersActionTypes.GET_USERS,
  props<{event: LazyLoadEvent | null; action: number}>()
)

export const getUsersSuccessAction = createAction(
  UsersActionTypes.GET_USERS_SUCCESS,
  props<{users: ITableItems<IUser>}>()
)

export const getUsersFailureAction = createAction(
  UsersActionTypes.GET_USERS_FAILURE,
  props<{errors: IBackendErrors}>()
)

export const clearUsersStateAction = createAction(UsersActionTypes.CLEAR_STATE)
