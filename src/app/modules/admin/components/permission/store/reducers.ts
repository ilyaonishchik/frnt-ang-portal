import {Action, createReducer, on} from '@ngrx/store'
import {routerNavigationAction} from '@ngrx/router-store'

import {IPermissionState} from '../interfaces/permission-state.interface'
import {
  getPermissionAction,
  getPermissionSuccessAction,
  getPermissionFailureAction,
  createPermissionAction,
  createPermissionSuccessAction,
  createPermissionFailureAction,
  updatePermissionAction,
  updatePermissionSuccessAction,
  updatePermissionFailureAction,
} from './actions/permission.action'
import {deleteLinkFailureAction} from '../../link/store/actions/link.action'
import {dialogCancelAction} from '@shared/store/actions/dialog.action'

export const permissionFeatureKey = 'permission'

const initialState: IPermissionState = {
  isLoading: false,
  isSubmitting: false,
  backendErrors: null,
  item: null,
}

const permissionReducer = createReducer(
  initialState,
  on(
    getPermissionAction,
    (state): IPermissionState => ({
      ...state,
      isLoading: true,
      item: null,
      backendErrors: null,
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
    (state, action): IPermissionState => ({
      ...state,
      isLoading: false,
      backendErrors: action.errors,
    })
  ),
  on(
    createPermissionAction,
    (state, action): IPermissionState => ({
      ...state,
      isSubmitting: true,
      item: action.permission,
      backendErrors: null,
    })
  ),
  on(
    createPermissionSuccessAction,
    (state, action): IPermissionState => ({
      ...state,
      isSubmitting: false,
      item: action.permission,
    })
  ),
  on(
    createPermissionFailureAction,
    (state, action): IPermissionState => ({
      ...state,
      isSubmitting: false,
      backendErrors: action.errors,
    })
  ),
  on(
    updatePermissionAction,
    (state, action): IPermissionState => ({
      ...state,
      isSubmitting: true,
      item: action.permission,
      backendErrors: null,
    })
  ),
  on(
    updatePermissionSuccessAction,
    (state, action): IPermissionState => ({
      ...state,
      isSubmitting: false,
      item: action.permission,
    })
  ),
  on(
    updatePermissionFailureAction,
    (state, action): IPermissionState => ({
      ...state,
      isSubmitting: false,
      backendErrors: action.errors,
    })
  ),
  on(
    deleteLinkFailureAction,
    (state, action): IPermissionState => ({
      ...state,
      isSubmitting: false,
      backendErrors: action.errors,
    })
  ),
  on(
    dialogCancelAction,
    (state): IPermissionState => ({
      ...state,
      item: null,
      backendErrors: null,
    })
  ),
  on(routerNavigationAction, (): IPermissionState => initialState)
)

export function reducerPermission(state: IPermissionState, action: Action) {
  return permissionReducer(state, action)
}
