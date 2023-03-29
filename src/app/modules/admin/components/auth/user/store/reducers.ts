import {Action, createReducer, on} from '@ngrx/store'

import {IUserState} from '../interfaces/user-state.interface'

import {
  clearUserStateAction,
  createUserAction,
  createUserFailureAction,
  createUserSuccessAction,
  deleteUserAction,
  deleteUserFailureAction,
  getUserAction,
  getUserFailureAction,
  getUserSuccessAction,
  updateUserAction,
  updateUserFailureAction,
  updateUserSuccessAction,
} from './actions/user.action'
import {dialogCancelAction} from '@shared/store/actions/dialog.action'

export const userFeatureKey = 'user'

const initialState: IUserState = {
  isLoading: false,
  isSubmitting: false,
  backendErrors: null,
  item: null,
}

const userReducer = createReducer(
  initialState,
  on(
    getUserAction,
    (state): IUserState => ({
      ...state,
      isLoading: true,
      item: null,
      backendErrors: null,
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
    (state, action): IUserState => ({
      ...state,
      isLoading: false,
      backendErrors: action.errors,
    })
  ),
  on(
    createUserAction,
    (state, action): IUserState => ({
      ...state,
      isSubmitting: true,
      item: action.user,
      backendErrors: null,
    })
  ),
  on(
    createUserSuccessAction,
    (state, action): IUserState => ({
      ...state,
      isSubmitting: false,
      item: action.user,
    })
  ),
  on(
    createUserFailureAction,
    (state, action): IUserState => ({
      ...state,
      isSubmitting: false,
      backendErrors: action.errors,
    })
  ),
  on(
    updateUserAction,
    (state): IUserState => ({
      ...state,
      isSubmitting: true,
      item: null,
      backendErrors: null,
    })
  ),
  on(
    updateUserSuccessAction,
    (state, action): IUserState => ({
      ...state,
      isSubmitting: false,
      item: action.user,
    })
  ),
  on(
    updateUserFailureAction,
    (state, action): IUserState => ({
      ...state,
      isSubmitting: false,
      backendErrors: action.errors,
    })
  ),
  on(
    deleteUserAction,
    (state): IUserState => ({
      ...state,
      isSubmitting: true,
      backendErrors: null,
    })
  ),
  on(
    deleteUserFailureAction,
    (state, action): IUserState => ({
      ...state,
      isSubmitting: false,
      backendErrors: action.errors,
    })
  ),
  on(
    dialogCancelAction,
    (state): IUserState => ({
      ...state,
      item: null,
      backendErrors: null,
    })
  ),
  on(clearUserStateAction, (): IUserState => initialState)
)

export function reducerUser(state: IUserState, action: Action) {
  return userReducer(state, action)
}
