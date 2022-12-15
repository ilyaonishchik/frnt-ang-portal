import {createFeatureSelector, createSelector} from '@ngrx/store'

import {IMainState} from '../interfaces/main-state.interface'
import {mainFeatureKey} from './reducers'

export const mainFeatureSelector =
  createFeatureSelector<IMainState>(mainFeatureKey)

export const isLoadingSelector = createSelector(
  mainFeatureSelector,
  (mainState: IMainState) => mainState.isLoading
)

export const errorsSelector = createSelector(
  mainFeatureSelector,
  (mainState: IMainState) => mainState.backendErrors
)

export const linksSelector = createSelector(
  mainFeatureSelector,
  (mainState: IMainState) => mainState.links
)
