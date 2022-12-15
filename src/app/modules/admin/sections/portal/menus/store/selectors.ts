import {createFeatureSelector, createSelector} from '@ngrx/store'

import {IMenusState} from '../interfaces/menus-state.interface'
import {menusFeatureKey} from './reducers'

export const menusFeatureSelector =
  createFeatureSelector<IMenusState>(menusFeatureKey)

export const isLoadingSelector = createSelector(
  menusFeatureSelector,
  (menusState: IMenusState) => menusState.isLoading
)

export const errorsSelector = createSelector(
  menusFeatureSelector,
  (menusState: IMenusState) => menusState.backendErrors
)

export const menusSelector = createSelector(
  menusFeatureSelector,
  (menusState: IMenusState) => menusState.data
)

export const dialogActionSelector = createSelector(
  menusFeatureSelector,
  (menusState: IMenusState) => menusState.crud
)
