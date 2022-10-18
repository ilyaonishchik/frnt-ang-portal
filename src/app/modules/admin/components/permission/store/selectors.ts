import {createFeatureSelector, createSelector} from '@ngrx/store'

import {IPermissionState} from '../interfaces/permission-state.interface'

export const permissionFeatureSelector =
  createFeatureSelector<IPermissionState>('permission')

export const isLoadingSelector = createSelector(
  permissionFeatureSelector,
  (permissionState: IPermissionState) => permissionState.isLoading
)

export const errorSelector = createSelector(
  permissionFeatureSelector,
  (permissionState: IPermissionState) => permissionState.validationError
)

export const permissionSelector = createSelector(
  permissionFeatureSelector,
  (permissionState: IPermissionState) => permissionState.item
)
