import {IRolesState} from '../interfaces/roles-state.interface'
import {Action, createReducer, on} from '@ngrx/store'
import {routerNavigationAction} from '@ngrx/router-store'

import {
  getRolesAction,
  getRolesFailureAction,
  getRolesSuccessAction,
} from './actions/roles.action'
import {
  dialogCancelAction,
  dialogConfirmAction,
  dialogShowAction,
} from '@shared/store/actions/dialog.action'

export const rolesFeatureKey = 'roles'

const initialState: IRolesState = {
  isLoading: false,
  backendErrors: null,
  data: {items: [], count: 0, first: 0},
  crud: null,
}

const rolesReducer = createReducer(
  initialState,
  on(
    getRolesAction,
    (state): IRolesState => ({
      ...state,
      isLoading: true,
      backendErrors: null,
    })
  ),
  on(
    getRolesSuccessAction,
    (state, action): IRolesState => ({
      ...state,
      isLoading: false,
      data: action.roles,
    })
  ),
  on(
    getRolesFailureAction,
    (state, action): IRolesState => ({
      ...state,
      isLoading: false,
      backendErrors: action.errors,
    })
  ),
  on(
    dialogShowAction,
    (state, action): IRolesState => ({
      ...state,
      crud: action.crud,
    })
  ),
  on(
    dialogConfirmAction,
    (state): IRolesState => ({
      ...state,
      crud: null,
    })
  ),
  on(
    dialogCancelAction,
    (state): IRolesState => ({
      ...state,
      crud: null,
    })
  ),
  on(routerNavigationAction, (): IRolesState => initialState)
)

export function reducerRoles(state: IRolesState, action: Action) {
  return rolesReducer(state, action)
}
