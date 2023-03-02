import {createFeatureSelector, createSelector} from '@ngrx/store'

import {categoryFeatureKey} from './reducers'
import {ICategoryState} from '@modules/admin/components/docs/category/interfaces/category-state.interface'

export const categoryFeatureSelector =
  createFeatureSelector<ICategoryState>(categoryFeatureKey)

export const isLoadingSelector = createSelector(
  categoryFeatureSelector,
  (categoryState: ICategoryState) => categoryState.isLoading
)

export const isSubmittingSelector = createSelector(
  categoryFeatureSelector,
  (categoryState: ICategoryState) => categoryState.isSubmitting
)

export const errorsSelector = createSelector(
  categoryFeatureSelector,
  (categoryState: ICategoryState) => categoryState.backendErrors
)

export const categorySelector = createSelector(
  categoryFeatureSelector,
  (categoryState: ICategoryState) => categoryState.item
)
