import {createFeatureSelector, createSelector} from '@ngrx/store'

import {IRoleState} from '../interfaces/role-state.interface'

export const roleFeatureSelector = createFeatureSelector<IRoleState>('role')

export const isLoadingSelector = createSelector(
  roleFeatureSelector,
  (roleState: IRoleState) => roleState.isLoading
)

export const isSubmittingSelector = createSelector(
  roleFeatureSelector,
  (roleState: IRoleState) => roleState.isSubmitting
)

export const errorsSelector = createSelector(
  roleFeatureSelector,
  (roleState: IRoleState) => roleState.backendErrors
)

export const roleSelector = createSelector(
  roleFeatureSelector,
  (roleState: IRoleState) => roleState.item
)
