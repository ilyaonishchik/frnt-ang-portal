import {Action, createReducer, on} from '@ngrx/store'

import {ISessionState} from '../../interfaces/session-state.interface'
import {
  getAllPermissionsAction,
  getAllPermissionsFailureAction,
  getAllPermissionsSuccessAction,
  getAllRolesAction,
  getAllRolesFailureAction,
  getAllRolesSuccessAction,
} from '../actions/session.actions'

export const sessionFeatureKey = 'session'

const initialState: ISessionState = {
  isLoading: false,
  backendErrors: null,
  allRoles: null,
  allPermissions: null,
}

const sessionReducer = createReducer(
  initialState,
  on(
    getAllPermissionsAction,
    (state): ISessionState => ({
      ...state,
      isLoading: true,
    })
  ),
  on(
    getAllPermissionsSuccessAction,
    (state, action): ISessionState => ({
      ...state,
      isLoading: false,
      allPermissions: action.permissions,
    })
  ),
  on(
    getAllPermissionsFailureAction,
    (state, action): ISessionState => ({
      ...state,
      isLoading: false,
      backendErrors: action.errors,
    })
  ),
  on(
    getAllRolesAction,
    (state): ISessionState => ({
      ...state,
      isLoading: true,
    })
  ),
  on(
    getAllRolesSuccessAction,
    (state, action): ISessionState => ({
      ...state,
      isLoading: false,
      allRoles: action.roles,
    })
  ),
  on(
    getAllRolesFailureAction,
    (state, action): ISessionState => ({
      ...state,
      isLoading: false,
      backendErrors: action.errors,
    })
  )
)

export function reducerSession(state: ISessionState, action: Action) {
  return sessionReducer(state, action)
}
