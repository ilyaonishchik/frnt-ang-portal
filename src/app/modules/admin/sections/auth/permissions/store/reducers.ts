import {IPermissionsState} from '../interfaces/permissions-state.interface'
import {Action, createReducer, on} from '@ngrx/store'
import {
  createPermissionAction,
  deletePermissionAction,
  deletePermissionCancelAction,
  deletePermissionConfirmAction,
  getPermissionsAction,
  getPermissionsFailureAction,
  getPermissionsSuccessAction,
  hidePermissionDialogAction,
  readPermissionAction,
  savePermissionAction,
  updatePermissionAction,
} from './actions/permissions.action'
import {routerNavigationAction} from '@ngrx/router-store'

const initialState: IPermissionsState = {
  isLoading: false,
  error: null,
  item: null,
  items: [],
  count: 0,
  itemDialog: false,
  itemDialogView: false,
  itemDialogDelete: false,
  submitted: false,
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
  ),
  on(
    createPermissionAction,
    (state): IPermissionsState => ({
      ...state,
      item: {id: 0, code: '', name: '', comment: null, status: 1},
      itemDialog: true,
      submitted: false,
    })
  ),
  on(
    readPermissionAction,
    (state, action): IPermissionsState => ({
      ...state,
      item: action.item,
      itemDialog: true,
      itemDialogView: true,
    })
  ),
  on(
    updatePermissionAction,
    (state, action): IPermissionsState => ({
      ...state,
      item: action.item,
      itemDialog: true,
    })
  ),
  on(
    deletePermissionAction,
    (state, action): IPermissionsState => ({
      ...state,
      item: action.item,
      itemDialogDelete: true,
    })
  ),
  on(
    deletePermissionConfirmAction,
    (state): IPermissionsState => ({
      ...state,
      item: null,
      itemDialogDelete: false,
    })
  ),
  on(
    deletePermissionCancelAction,
    (state): IPermissionsState => ({
      ...state,
      item: null,
      itemDialogDelete: false,
    })
  ),
  on(
    savePermissionAction,
    (state): IPermissionsState => ({
      ...state,
      item: null,
      submitted: true,
      itemDialog: false,
    })
  ),
  on(
    hidePermissionDialogAction,
    (state): IPermissionsState => ({
      ...state,
      item: null,
      itemDialog: false,
      itemDialogView: false,
      submitted: false,
    })
  ),
  on(routerNavigationAction, (): IPermissionsState => initialState)
)

export function reducers(state: IPermissionsState, action: Action) {
  return permissionsReducer(state, action)
}
