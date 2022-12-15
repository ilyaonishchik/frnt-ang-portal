import {createFeatureSelector, createSelector} from '@ngrx/store'

import {ILinksState} from '../interfaces/links-state.interface'
import {linksFeatureKey} from './reducers'

export const linksFeatureSelector =
  createFeatureSelector<ILinksState>(linksFeatureKey)

export const isLoadingSelector = createSelector(
  linksFeatureSelector,
  (linksState: ILinksState) => linksState.isLoading
)

export const errorsSelector = createSelector(
  linksFeatureSelector,
  (linksState: ILinksState) => linksState.backendErrors
)

export const linksSelector = createSelector(
  linksFeatureSelector,
  (linksState: ILinksState) => linksState.data
)

export const dialogActionSelector = createSelector(
  linksFeatureSelector,
  (linksState: ILinksState) => linksState.crud
)
