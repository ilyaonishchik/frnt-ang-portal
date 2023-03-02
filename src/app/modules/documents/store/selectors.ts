import {createFeatureSelector, createSelector} from '@ngrx/store'

import {IDocsState} from '@modules/documents/interfaces/docs-state.interface'
import {docsFeatureKey} from '@modules/documents/store/reducers'

export const docsFeatureSelector =
  createFeatureSelector<IDocsState>(docsFeatureKey)

export const isLoadingSelector = createSelector(
  docsFeatureSelector,
  (docsState: IDocsState) => docsState.isLoading
)

export const errorsSelector = createSelector(
  docsFeatureSelector,
  (docsState: IDocsState) => docsState.backendErrors
)

export const categoriesSelector = createSelector(
  docsFeatureSelector,
  (docsState: IDocsState) => docsState.categories
)

export const filesSelector = createSelector(
  docsFeatureSelector,
  (docsState: IDocsState) => docsState.files
)
