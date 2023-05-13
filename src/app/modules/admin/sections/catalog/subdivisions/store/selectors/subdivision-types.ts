import {createFeatureSelector, createSelector} from '@ngrx/store'
import {IState} from '@shared/interfaces/state.interface'
import {ISubdivisionType} from '@modules/admin/sections/catalog/subdivisions/interfaces/subdivision.interface'
import {subdivisionTypesFeatureKey} from '@modules/admin/sections/catalog/subdivisions/store/reducers/subdivision-types'

export const subdivisionTypesFeatureSelector = createFeatureSelector<
  IState<ISubdivisionType>
>(subdivisionTypesFeatureKey)

export const isLoadingSelector = createSelector(
  subdivisionTypesFeatureSelector,
  (state) => state.isLoading
)

export const errorsSelector = createSelector(
  subdivisionTypesFeatureSelector,
  (state) => state.backendErrors
)

export const subdivisionTypesSelector = createSelector(
  subdivisionTypesFeatureSelector,
  (state) => state.data
)

export const dialogActionSelector = createSelector(
  subdivisionTypesFeatureSelector,
  (state) => state.crud
)
