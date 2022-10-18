import {IUserState} from '../interfaces/user-state.interface'
import {Action, createReducer, on} from '@ngrx/store'
import {routerNavigationAction} from '@ngrx/router-store'

import {
  getUserAction,
  getUserFailureAction,
  getUserSuccessAction,
} from './actions/user.action'

const initialState: IUserState = {
  isLoading: false,
  isReadOnly: true,
  isSubmitting: false,
  validationError: null,
  item: null,
}

const userReducer = createReducer(
  initialState,
  on(
    getUserAction,
    (state): IUserState => ({
      ...state,
      isLoading: true,
    })
  ),
  on(
    getUserSuccessAction,
    (state, action): IUserState => ({
      ...state,
      isLoading: false,
      item: action.user,
    })
  ),
  on(
    getUserFailureAction,
    (state): IUserState => ({
      ...state,
      isLoading: false,
    })
  ),
  on(routerNavigationAction, (): IUserState => initialState)
)

export function reducers(state: IUserState, action: Action) {
  return userReducer(state, action)
}
