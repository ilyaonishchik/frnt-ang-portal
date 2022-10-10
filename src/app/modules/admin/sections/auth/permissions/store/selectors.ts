import {createFeatureSelector, createSelector} from '@ngrx/store'

import {IPermissionsState} from '../interfaces/permissions-state.interface'

export const permissionsFeatureSelector =
  createFeatureSelector<IPermissionsState>('permissions')

export const isLoadingSelector = createSelector(
  permissionsFeatureSelector,
  (permissionsState: IPermissionsState) => permissionsState.isLoading
)

export const errorSelector = createSelector(
  permissionsFeatureSelector,
  (permissionsState: IPermissionsState) => permissionsState.error
)

export const permissionsSelector = createSelector(
  permissionsFeatureSelector,
  (permissionsState: IPermissionsState) => permissionsState.items
)

export const countSelector = createSelector(
  permissionsFeatureSelector,
  (permissionsState: IPermissionsState) => permissionsState.count
)
