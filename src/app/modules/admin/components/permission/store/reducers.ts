import {IPermissionState} from '../interfaces/permission-state.interface'
import {Action, createReducer, on} from '@ngrx/store'
import {routerNavigationAction} from '@ngrx/router-store'

import {
  getPermissionAction,
  getPermissionSuccessAction,
  getPermissionFailureAction,
} from './actions/permission.action'

const initialState: IPermissionState = {
  isLoading: false,
  isReadOnly: true,
  isSubmitting: false,
  validationError: null,
  item: null,
}

const permissionReducer = createReducer(
  initialState,
  on(
    getPermissionAction,
    (state): IPermissionState => ({
      ...state,
      isLoading: true,
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
  on(routerNavigationAction, (): IPermissionState => initialState)
)

export function reducers(state: IPermissionState, action: Action) {
  return permissionReducer(state, action)
}
