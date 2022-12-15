import {createFeatureSelector, createSelector} from '@ngrx/store'

import {IRolesState} from '../interfaces/roles-state.interface'
import {rolesFeatureKey} from './reducers'

export const rolesFeatureSelector =
  createFeatureSelector<IRolesState>(rolesFeatureKey)

export const isLoadingSelector = createSelector(
  rolesFeatureSelector,
  (rolesState: IRolesState) => rolesState.isLoading
)

export const errorsSelector = createSelector(
  rolesFeatureSelector,
  (rolesState: IRolesState) => rolesState.backendErrors
)

export const rolesSelector = createSelector(
  rolesFeatureSelector,
  (rolesState: IRolesState) => rolesState.data
)

export const dialogActionSelector = createSelector(
  rolesFeatureSelector,
  (rolesState: IRolesState) => rolesState.crud
)
