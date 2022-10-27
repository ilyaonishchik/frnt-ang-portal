import {IPermissionsState} from '../interfaces/permissions-state.interface'
import {Action, createReducer, on} from '@ngrx/store'
import {
  getPermissionsAction,
  getPermissionsFailureAction,
  getPermissionsSuccessAction,
} from './actions/permissions.action'
import {routerNavigationAction} from '@ngrx/router-store'
import {
  dialogCancelAction,
  dialogConfirmAction,
  dialogShowAction,
} from './actions/dialogs.action'

const initialState: IPermissionsState = {
  isLoading: false,
  error: null,
  data: {items: [], count: 0, first: 0},
  crud: null,
  tableState: null,
}

const permissionsReducer = createReducer(
  initialState,
  on(
    getPermissionsAction,
    (state, action): IPermissionsState =>
      action.event
        ? {
            ...state,
            isLoading: true,
            tableState: action.event,
          }
        : {
            ...state,
            isLoading: true,
          }
  ),
  on(
    getPermissionsSuccessAction,
    (state, action): IPermissionsState => ({
      ...state,
      isLoading: false,
      data: action.permissions,
    })
  ),
  on(
    getPermissionsFailureAction,
    (state): IPermissionsState => ({
      ...state,
      isLoading: false,
      tableState: null,
      // error: action.errors['_'].toString()
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
    })
  ),
  on(routerNavigationAction, (): IPermissionsState => initialState)
)

export function reducers(state: IPermissionsState, action: Action) {
  return permissionsReducer(state, action)
}
