import {Action, createReducer, on} from '@ngrx/store'
import {IFileState} from '@modules/admin/components/docs/file/interfaces/file-state.interface'

import {
  createFileAction,
  createFileFailureAction,
  createFileSuccessAction,
  deleteFileAction,
  deleteFileFailureAction,
  deleteFileSuccessAction,
  getFileAction,
  getFileFailureAction,
  getFileSuccessAction,
  updateFileAction,
  updateFileFailureAction,
  updateFileSuccessAction,
} from '@modules/admin/components/docs/file/store/actions/file.action'
import {dialogCancelAction} from '@shared/store/actions/dialog.action'

export const fileFeatureKey = 'docs-file'

const initialState: IFileState = {
  isLoading: false,
  isSubmitting: false,
  backendErrors: null,
  item: null,
}

const fileReducer = createReducer(
  initialState,
  on(
    getFileAction,
    (state): IFileState => ({
      ...state,
      isLoading: true,
      item: null,
      backendErrors: null,
    })
  ),
  on(
    getFileSuccessAction,
    (state, action): IFileState => ({
      ...state,
      isLoading: false,
      item: action.file,
    })
  ),
  on(
    getFileFailureAction,
    (state, action): IFileState => ({
      ...state,
      isLoading: false,
      backendErrors: action.errors,
    })
  ),
  on(
    createFileAction,
    (state, action): IFileState => ({
      ...state,
      isSubmitting: true,
      item: action.file,
      backendErrors: null,
    })
  ),
  on(
    createFileSuccessAction,
    (state, action): IFileState => ({
      ...state,
      isSubmitting: false,
      item: action.file,
    })
  ),
  on(
    createFileFailureAction,
    (state, action): IFileState => ({
      ...state,
      isSubmitting: false,
      backendErrors: action.errors,
    })
  ),
  on(
    updateFileAction,
    (state, action): IFileState => ({
      ...state,
      isSubmitting: true,
      item: action.file,
      backendErrors: null,
    })
  ),
  on(
    updateFileSuccessAction,
    (state, action): IFileState => ({
      ...state,
      isSubmitting: false,
      item: action.file,
    })
  ),
  on(
    updateFileFailureAction,
    (state, action): IFileState => ({
      ...state,
      isSubmitting: false,
      backendErrors: action.errors,
    })
  ),
  on(
    deleteFileAction,
    (state): IFileState => ({
      ...state,
      isSubmitting: true,
      backendErrors: null,
    })
  ),
  on(
    deleteFileSuccessAction,
    (state): IFileState => ({
      ...state,
      isSubmitting: false,
    })
  ),
  on(
    deleteFileFailureAction,
    (state, action): IFileState => ({
      ...state,
      isSubmitting: false,
      backendErrors: action.errors,
    })
  ),
  on(dialogCancelAction, (): IFileState => initialState)
)

export function reducerFile(state: IFileState, action: Action) {
  return fileReducer(state, action)
}
