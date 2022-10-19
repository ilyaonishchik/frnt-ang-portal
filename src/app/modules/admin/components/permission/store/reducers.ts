import {IPermissionState} from '../interfaces/permission-state.interface'
import {Action, createReducer, on} from '@ngrx/store'
import {routerNavigationAction} from '@ngrx/router-store'

import {
  getPermissionAction,
  getPermissionSuccessAction,
  getPermissionFailureAction,
  createPermissionAction,
  createPermissionSuccessAction,
  createPermissionFailureAction,
} from './actions/permission.action'

const initialState: IPermissionState = {
  isLoading: false,
  isReadOnly: true,
  isSubmitting: false,
  validationError: null,
  item: null,
  itemSave: null,
}

const permissionReducer = createReducer(
  initialState,
  on(
    getPermissionAction,
    (state): IPermissionState => ({
      ...state,
      isLoading: true,
      item: null,
      itemSave: null,
    })
  ),
  on(
    getPermissionSuccessAction,
    (state, action): IPermissionState => ({
      ...state,
      isLoading: false,
      item: action.permission,
    })
  ),
  on(
    getPermissionFailureAction,
    (state): IPermissionState => ({
      ...state,
      isLoading: false,
    })
  ),
  on(
    createPermissionAction,
    (state, action): IPermissionState => ({
      ...state,
      isSubmitting: true,
      item: null,
      itemSave: action.permission,
    })
  ),
  on(
    createPermissionSuccessAction,
    (state, action): IPermissionState => ({
      ...state,
      isLoading: false,
      item: action.permission,
      itemSave: null,
    })
  ),
  on(
    createPermissionFailureAction,
    (state): IPermissionState => ({
      ...state,
      isLoading: false,
    })
  ),
  on(routerNavigationAction, (): IPermissionState => initialState)
)

export function reducers(state: IPermissionState, action: Action) {
  return permissionReducer(state, action)
}
