import {createFeatureSelector, createSelector} from '@ngrx/store'
import {ISubdivisionsState} from '@modules/admin/sections/catalog/subdivisions/interfaces/subdivisions-state.interface'
import {subdivisionsFeatureKey} from '@modules/admin/sections/catalog/subdivisions/store/reducers'

export const subdivisionsFeatureSelector =
  createFeatureSelector<ISubdivisionsState>(subdivisionsFeatureKey)

export const isLoadingSelector = createSelector(
  subdivisionsFeatureSelector,
  (subdivisionsState: ISubdivisionsState) => subdivisionsState.isLoading
)

export const errorsSelector = createSelector(
  subdivisionsFeatureSelector,
  (subdivisionsState: ISubdivisionsState) => subdivisionsState.backendErrors
)

export const subdivisionsSelector = createSelector(
  subdivisionsFeatureSelector,
  (subdivisionsState: ISubdivisionsState) => subdivisionsState.data
)

export const dialogActionSelector = createSelector(
  subdivisionsFeatureSelector,
  (subdivisionsState: ISubdivisionsState) => subdivisionsState.crud
)
