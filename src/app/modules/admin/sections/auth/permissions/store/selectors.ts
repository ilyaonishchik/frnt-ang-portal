import {createFeatureSelector, createSelector} from '@ngrx/store'

import {IPermissionsState} from '../interfaces/permissions-state.interface'
import {permissionsFeatureKey} from './reducers'

export const permissionsFeatureSelector =
  createFeatureSelector<IPermissionsState>(permissionsFeatureKey)

export const isLoadingSelector = createSelector(
  permissionsFeatureSelector,
  (permissionsState: IPermissionsState) => permissionsState.isLoading
)

export const errorsSelector = createSelector(
  permissionsFeatureSelector,
  (permissionsState: IPermissionsState) => permissionsState.backendErrors
)

export const permissionsSelector = createSelector(
  permissionsFeatureSelector,
  (permissionsState: IPermissionsState) => permissionsState.data
)

export const dialogActionSelector = createSelector(
  permissionsFeatureSelector,
  (permissionsState: IPermissionsState) => permissionsState.crud
)
