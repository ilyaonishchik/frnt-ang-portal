import {Action, createReducer, on} from '@ngrx/store'

import {ISessionState} from '../../interfaces/session-state.interface'
import {
  clearPermissionsAction,
  clearRolesAction,
  clearUsersAction,
  getAllPermissionsAction,
  getAllPermissionsFailureAction,
  getAllPermissionsSuccessAction,
  getAllRolesAction,
  getAllRolesFailureAction,
  getAllRolesSuccessAction,
  getAllUsersAction,
  getAllUsersFailureAction,
  getAllUsersSuccessAction,
  getClientInfoAction,
  getClientInfoFailureAction,
  getClientInfoSuccessAction,
} from '../actions/session.actions'

export const sessionFeatureKey = 'session'

const initialState: ISessionState = {
  isLoading: false,
  backendErrors: null,
  allUsers: null,
  allRoles: null,
  allPermissions: null,
  client: null,
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
    clearPermissionsAction,
    (state): ISessionState => ({
      ...state,
      allPermissions: null,
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
  ),
  on(
    clearRolesAction,
    (state): ISessionState => ({
      ...state,
      allRoles: null,
    })
  ),
  on(
    getAllUsersAction,
    (state): ISessionState => ({
      ...state,
      isLoading: true,
    })
  ),
  on(
    getAllUsersSuccessAction,
    (state, action): ISessionState => ({
      ...state,
      isLoading: false,
      allUsers: action.users,
    })
  ),
  on(
    getAllUsersFailureAction,
    (state, action): ISessionState => ({
      ...state,
      isLoading: false,
      backendErrors: action.errors,
    })
  ),
  on(
    clearUsersAction,
    (state): ISessionState => ({
      ...state,
      allUsers: null,
    })
  ),
  on(
    getClientInfoAction,
    (state): ISessionState => ({
      ...state,
      isLoading: true,
      client: null,
    })
  ),
  on(
    getClientInfoSuccessAction,
    (state, action): ISessionState => ({
      ...state,
      isLoading: false,
      client: action.client,
    })
  ),
  on(
    getClientInfoFailureAction,
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
