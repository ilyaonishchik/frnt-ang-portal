import {Action, createReducer, on} from '@ngrx/store'
import {routerNavigationAction} from '@ngrx/router-store'

import {IUsersState} from '../interfaces/users-state.interface'

import {
  getUsersAction,
  getUsersFailureAction,
  getUsersSuccessAction,
} from './actions/users.action'
import {
  dialogCancelAction,
  dialogConfirmAction,
  dialogShowAction,
} from 'src/app/shared/store/actions/dialogs.action'

const initialState: IUsersState = {
  isLoading: false,
  error: null,
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
    (state): IUsersState => ({
      ...state,
      isLoading: false,
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
  on(routerNavigationAction, (): IUsersState => initialState)
)

export function reducers(state: IUsersState, action: Action) {
  return usersReducer(state, action)
}
