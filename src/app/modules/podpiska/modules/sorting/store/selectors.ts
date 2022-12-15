import {createFeatureSelector, createSelector} from '@ngrx/store'

import {IPdpSrtState} from '../interfaces/pdp-srt-state.interface'
import {pdpSrtFeatureKey} from './reducers'

export const pdpSrtFeatureSelector =
  createFeatureSelector<IPdpSrtState>(pdpSrtFeatureKey)

export const isLoadingSelector = createSelector(
  pdpSrtFeatureSelector,
  (pdpSrtState: IPdpSrtState) => pdpSrtState.isLoading
)

export const errorsSelector = createSelector(
  pdpSrtFeatureSelector,
  (pdpSrtState: IPdpSrtState) => pdpSrtState.backendErrors
)

export const periodicalsSelector = createSelector(
  pdpSrtFeatureSelector,
  (pdpSrtState: IPdpSrtState) => pdpSrtState.periodicalList
)

export const cellsSelector = createSelector(
  pdpSrtFeatureSelector,
  (pdpSrtState: IPdpSrtState) => pdpSrtState.cells
)
