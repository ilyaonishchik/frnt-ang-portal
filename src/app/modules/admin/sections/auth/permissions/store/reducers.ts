import {Action, createReducer, on} from '@ngrx/store'

import {IPermissionsState} from '../interfaces/permissions-state.interface'

import {
  clearPermissionsStateAction,
  getPermissionsAction,
  getPermissionsFailureAction,
  getPermissionsSuccessAction,
} from './actions/permissions.action'
import {
  dialogCancelAction,
  dialogConfirmAction,
  dialogShowAction,
} from '@shared/store/actions/dialog.action'

export const permissionsFeatureKey = 'permissions'

const initialState: IPermissionsState = {
  isLoading: false,
  backendErrors: null,
  data: {items: [], count: 0, first: 0},
  crud: null,
}

const permissionsReducer = createReducer(
  initialState,
  on(
    getPermissionsAction,
    (state): IPermissionsState => ({
      ...state,
      isLoading: true,
      backendErrors: null,
    })
  ),
  on(
    getPermissionsSuccessAction,
    (state, action): IPermissionsState => ({
      ...state,
      isLoading: false,
      backendErrors: null,
      data: action.permissions,
    })
  ),
  on(
    getPermissionsFailureAction,
    (state, action): IPermissionsState => ({
      ...state,
      isLoading: false,
      backendErrors: action.errors,
    })
  ),
  on(
    dialogShowAction,
    (state, action): IPermissionsState => ({
      ...state,
      crud: action.crud,
    })
  ),
  on(
    dialogConfirmAction,
    (state): IPermissionsState => ({
      ...state,
      crud: null,
    })
  ),
  on(
    dialogCancelAction,
    (state): IPermissionsState => ({
      ...state,
      crud: null,
      backendErrors: null,
    })
  ),
  on(clearPermissionsStateAction, (): IPermissionsState => initialState)
)

export function reducerPermissions(state: IPermissionsState, action: Action) {
  return permissionsReducer(state, action)
}
