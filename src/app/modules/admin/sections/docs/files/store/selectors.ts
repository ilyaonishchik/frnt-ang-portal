import {createFeatureSelector, createSelector} from '@ngrx/store'

import {IFilesState} from '../interfaces/files-state.interface'
import {filesFeatureKey} from './reducers'

export const filesFeatureSelector =
  createFeatureSelector<IFilesState>(filesFeatureKey)

export const isLoadingSelector = createSelector(
  filesFeatureSelector,
  (filesState: IFilesState) => filesState.isLoading
)

export const errorsSelector = createSelector(
  filesFeatureSelector,
  (filesState: IFilesState) => filesState.backendErrors
)

export const filesSelector = createSelector(
  filesFeatureSelector,
  (filesState: IFilesState) => filesState.data
)

export const dialogActionSelector = createSelector(
  filesFeatureSelector,
  (filesState: IFilesState) => filesState.crud
)
