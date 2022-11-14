import {Action, createReducer, on} from '@ngrx/store'
import {routerNavigationAction} from '@ngrx/router-store'

import {IRoleState} from '../interfaces/role-state.interface'
import {
  createRoleAction,
  createRoleFailureAction,
  createRoleSuccessAction,
  getRoleAction,
  getRoleFailureAction,
  getRoleSuccessAction,
  updateRoleAction,
  updateRoleFailureAction,
  updateRoleSuccessAction,
} from './actions/role.action'

const initialState: IRoleState = {
  isLoading: false,
  isSubmitting: false,
  backendErrors: null,
  item: null,
}

const roleReducer = createReducer(
  initialState,
  on(
    getRoleAction,
    (state): IRoleState => ({
      ...state,
      isLoading: true,
      item: null,
      backendErrors: null,
    })
  ),
  on(
    getRoleSuccessAction,
    (state, action): IRoleState => ({
      ...state,
      isLoading: false,
      item: action.role,
    })
  ),
  on(
    getRoleFailureAction,
    (state, action): IRoleState => ({
      ...state,
      isLoading: false,
      backendErrors: action.errors,
    })
  ),
  on(
    createRoleAction,
    (state, action): IRoleState => ({
      ...state,
      isSubmitting: true,
      item: action.role,
      backendErrors: null,
    })
  ),
  on(
    createRoleSuccessAction,
    (state, action): IRoleState => ({
      ...state,
      isSubmitting: false,
      item: action.role,
    })
  ),
  on(
    createRoleFailureAction,
    (state, action): IRoleState => ({
      ...state,
      isSubmitting: false,
      backendErrors: action.errors,
    })
  ),
  on(
    updateRoleAction,
    (state, action): IRoleState => ({
      ...state,
      isSubmitting: true,
      item: action.role,
      backendErrors: null,
    })
  ),
  on(
    updateRoleSuccessAction,
    (state, action): IRoleState => ({
      ...state,
      isSubmitting: false,
      item: action.role,
    })
  ),
  on(
    updateRoleFailureAction,
    (state, action): IRoleState => ({
      ...state,
      isSubmitting: false,
      backendErrors: action.errors,
    })
  ),
  on(routerNavigationAction, (): IRoleState => initialState)
)

export function reducers(state: IRoleState, action: Action) {
  return roleReducer(state, action)
}
