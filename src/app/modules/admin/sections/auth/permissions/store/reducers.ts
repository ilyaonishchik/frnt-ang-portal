import {IPermissionsState} from '../interfaces/permissions-state.interface'
import {Action, createReducer, on} from '@ngrx/store'
import {
  getPermissionsAction,
  getPermissionsFailureAction,
  getPermissionsSuccessAction,
} from './actions/permissions.action'

const initialState: IPermissionsState = {
  isLoading: false,
  error: null,
  items: [],
  count: 0,
}

const permissionsReducer = createReducer(
  initialState,
  on(
    getPermissionsAction,
    (state): IPermissionsState => ({
      ...state,
      isLoading: true,
    })
  ),
  on(
    getPermissionsSuccessAction,
    (state, action): IPermissionsState => ({
      ...state,
      isLoading: false,
      items: action.items,
      count: action.count,
    })
  ),
  on(
    getPermissionsFailureAction,
    (state): IPermissionsState => ({
      ...state,
      isLoading: false,
    })
  )
)

export function reducers(state: IPermissionsState, action: Action) {
  return permissionsReducer(state, action)
}
