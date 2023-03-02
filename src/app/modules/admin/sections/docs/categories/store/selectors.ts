import {createFeatureSelector, createSelector} from '@ngrx/store'

import {ICategoriesState} from '../interfaces/categories-state.interface'
import {categoriesFeatureKey} from './reducers'

export const categoriesFeatureSelector =
  createFeatureSelector<ICategoriesState>(categoriesFeatureKey)

export const isLoadingSelector = createSelector(
  categoriesFeatureSelector,
  (categoriesState: ICategoriesState) => categoriesState.isLoading
)

export const errorsSelector = createSelector(
  categoriesFeatureSelector,
  (categoriesState: ICategoriesState) => categoriesState.backendErrors
)

export const categoriesSelector = createSelector(
  categoriesFeatureSelector,
  (categoriesState: ICategoriesState) => categoriesState.data
)

export const dialogActionSelector = createSelector(
  categoriesFeatureSelector,
  (categoriesState: ICategoriesState) => categoriesState.crud
)
