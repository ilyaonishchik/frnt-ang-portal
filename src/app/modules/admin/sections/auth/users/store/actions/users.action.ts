import {createAction, props} from '@ngrx/store'

import {LazyLoadEvent} from 'primeng/api'

import {ActionTypes} from '../actionTypes'
import {ITableItems} from 'src/app/shared/interfaces/table-items.interface'
import {IBackendErrors} from 'src/app/shared/interfaces/backend-errors.interface'
import {IUser} from 'src/app/shared/interfaces/user.interface'

export const getUsersAction = createAction(
  ActionTypes.GET_USERS,
  props<{event: LazyLoadEvent | null; action: number}>()
)

export const getUsersSuccessAction = createAction(
  ActionTypes.GET_USERS_SUCCESS,
  props<{users: ITableItems<IUser>}>()
)

export const getUsersFailureAction = createAction(
  ActionTypes.GET_USERS_FAILURE,
  props<{errors: IBackendErrors}>()
)
