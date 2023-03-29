import {createFeatureSelector, createSelector} from '@ngrx/store'

import {IRoleState} from '../interfaces/role-state.interface'
import {roleFeatureKey} from './reducers'

export const roleFeatureSelector =
  createFeatureSelector<IRoleState>(roleFeatureKey)

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
