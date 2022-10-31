import {IRolesState} from '../interfaces/roles-state.interface'
import {Action, createReducer, on} from '@ngrx/store'

import {
  getRolesAction,
  getRolesFailureAction,
  getRolesSuccessAction,
} from './actions/roles.action'
import {routerNavigationAction} from '@ngrx/router-store'
import {
  dialogCancelAction,
  dialogConfirmAction,
  dialogShowAction,
} from 'src/app/shared/store/actions/dialogs.action'

const initialState: IRolesState = {
  isLoading: false,
  error: null,
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
    (state): IRolesState => ({
      ...state,
      isLoading: false,
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

export function reducers(state: IRolesState, action: Action) {
  return rolesReducer(state, action)
}
