import {IFilesState} from '../interfaces/files-state.interface'
import {Action, createReducer, on} from '@ngrx/store'
import {routerNavigationAction} from '@ngrx/router-store'

import {
  dialogCancelAction,
  dialogConfirmAction,
  dialogShowAction,
} from '@shared/store/actions/dialog.action'
import {
  getFilesAction,
  getFilesFailureAction,
  getFilesSuccessAction,
} from '@modules/admin/sections/docs/files/store/actions/files.action'

export const filesFeatureKey = 'files'

const initialState: IFilesState = {
  isLoading: false,
  backendErrors: null,
  data: {items: [], count: 0, first: 0},
  crud: null,
}

const filesReducer = createReducer(
  initialState,
  on(
    getFilesAction,
    (state): IFilesState => ({
      ...state,
      isLoading: true,
      backendErrors: null,
    })
  ),
  on(
    getFilesSuccessAction,
    (state, action): IFilesState => ({
      ...state,
      isLoading: false,
      data: action.files,
    })
  ),
  on(
    getFilesFailureAction,
    (state, action): IFilesState => ({
      ...state,
      isLoading: false,
      backendErrors: action.errors,
    })
  ),
  on(
    dialogShowAction,
    (state, action): IFilesState => ({
      ...state,
      crud: action.crud,
    })
  ),
  on(
    dialogConfirmAction,
    (state): IFilesState => ({
      ...state,
      crud: null,
    })
  ),
  on(
    dialogCancelAction,
    (state): IFilesState => ({
      ...state,
      crud: null,
      backendErrors: null,
    })
  ),
  on(routerNavigationAction, (): IFilesState => initialState)
)

export function reducerFiles(state: IFilesState, action: Action) {
  return filesReducer(state, action)
}
