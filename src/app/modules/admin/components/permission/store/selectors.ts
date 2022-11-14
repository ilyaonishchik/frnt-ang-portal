import {createFeatureSelector, createSelector} from '@ngrx/store'

import {IPermissionState} from '../interfaces/permission-state.interface'

export const permissionFeatureSelector =
  createFeatureSelector<IPermissionState>('permission')

export const isLoadingSelector = createSelector(
  permissionFeatureSelector,
  (permissionState: IPermissionState) => permissionState.isLoading
)

export const isSubmittingSelector = createSelector(
  permissionFeatureSelector,
  (permissionState: IPermissionState) => permissionState.isSubmitting
)

export const errorsSelector = createSelector(
  permissionFeatureSelector,
  (permissionState: IPermissionState) => permissionState.backendErrors
)

export const permissionSelector = createSelector(
  permissionFeatureSelector,
  (permissionState: IPermissionState) => permissionState.item
)
