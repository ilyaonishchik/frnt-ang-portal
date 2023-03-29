import {Action, createReducer, on} from '@ngrx/store'

import {IUsersState} from '../interfaces/users-state.interface'

import {
  clearUsersStateAction,
  getUsersAction,
  getUsersFailureAction,
  getUsersSuccessAction,
} from './actions/users.action'
import {
  dialogCancelAction,
  dialogConfirmAction,
  dialogShowAction,
} from '@shared/store/actions/dialog.action'

export const usersFeatureKey = 'users'

const initialState: IUsersState = {
  isLoading: false,
  backendErrors: null,
  data: {items: [], count: 0, first: 0},
  crud: null,
}

const usersReducer = createReducer(
  initialState,
  on(
    getUsersAction,
    (state): IUsersState => ({
      ...state,
      isLoading: true,
      backendErrors: null,
    })
  ),
  on(
    getUsersSuccessAction,
    (state, action): IUsersState => ({
      ...state,
      isLoading: false,
      data: action.users,
    })
  ),
  on(
    getUsersFailureAction,
    (state, action): IUsersState => ({
      ...state,
      isLoading: false,
      backendErrors: action.errors,
    })
  ),
  on(
    dialogShowAction,
    (state, action): IUsersState => ({
      ...state,
      crud: action.crud,
    })
  ),
  on(
    dialogConfirmAction,
    (state): IUsersState => ({
      ...state,
      crud: null,
    })
  ),
  on(
    dialogCancelAction,
    (state): IUsersState => ({
      ...state,
      crud: null,
    })
  ),
  on(clearUsersStateAction, (): IUsersState => initialState)
)

export function reducerUsers(state: IUsersState, action: Action) {
  return usersReducer(state, action)
}
