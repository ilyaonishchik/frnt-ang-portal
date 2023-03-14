import {createFeatureSelector, createSelector} from '@ngrx/store'

import {fileFeatureKey} from './reducers'
import {IFileState} from '@modules/admin/components/docs/file/interfaces/file-state.interface'

export const fileFeatureSelector =
  createFeatureSelector<IFileState>(fileFeatureKey)

export const isLoadingSelector = createSelector(
  fileFeatureSelector,
  (fileState: IFileState) => fileState.isLoading
)

export const isSubmittingSelector = createSelector(
  fileFeatureSelector,
  (fileState: IFileState) => fileState.isSubmitting
)

export const errorsSelector = createSelector(
  fileFeatureSelector,
  (fileState: IFileState) => fileState.backendErrors
)

export const fileSelector = createSelector(
  fileFeatureSelector,
  (fileState: IFileState) => fileState.item
)
