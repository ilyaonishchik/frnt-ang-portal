import {createFeatureSelector, createSelector} from '@ngrx/store'

import {IMenuState} from '../interfaces/menu-state.interface'
import {menuFeatureKey} from './reducers'

export const menuFeatureSelector =
  createFeatureSelector<IMenuState>(menuFeatureKey)

export const isLoadingSelector = createSelector(
  menuFeatureSelector,
  (menuState: IMenuState) => menuState.isLoading
)

export const isSubmittingSelector = createSelector(
  menuFeatureSelector,
  (menuState: IMenuState) => menuState.isSubmitting
)

export const errorsSelector = createSelector(
  menuFeatureSelector,
  (menuState: IMenuState) => menuState.backendErrors
)

export const menuSelector = createSelector(
  menuFeatureSelector,
  (menuState: IMenuState) => menuState.item
)
