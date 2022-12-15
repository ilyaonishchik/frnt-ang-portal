import {createFeatureSelector, createSelector} from '@ngrx/store'

import {ILinkState} from '../interfaces/link-state.interface'
import {linkFeatureKey} from './reducers'

export const linkFeatureSelector =
  createFeatureSelector<ILinkState>(linkFeatureKey)

export const isLoadingSelector = createSelector(
  linkFeatureSelector,
  (linkState: ILinkState) => linkState.isLoading
)

export const isSubmittingSelector = createSelector(
  linkFeatureSelector,
  (linkState: ILinkState) => linkState.isSubmitting
)

export const errorsSelector = createSelector(
  linkFeatureSelector,
  (linkState: ILinkState) => linkState.backendErrors
)

export const linkSelector = createSelector(
  linkFeatureSelector,
  (linkState: ILinkState) => linkState.item
)
