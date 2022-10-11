import {IRolesState} from '../interfaces/roles-state.interface'
import {Action, createReducer, on} from '@ngrx/store'

import {
  getRolesAction,
  getRolesFailureAction,
  getRolesSuccessAction,
} from './actions/roles.action'

const initialState: IRolesState = {
  isLoading: false,
  error: null,
  items: [],
  count: 0,
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
      items: action.items,
      count: action.count,
    })
  ),
  on(
    getRolesFailureAction,
    (state): IRolesState => ({
      ...state,
      isLoading: false,
    })
  )
)

export function reducers(state: IRolesState, action: Action) {
  return rolesReducer(state, action)
}
