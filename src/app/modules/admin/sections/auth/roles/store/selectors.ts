import {createFeatureSelector, createSelector} from '@ngrx/store'
import {IRolesState} from '../interfaces/roles-state.interface'

export const rolesFeatureSelector = createFeatureSelector<IRolesState>('roles')

export const isLoadingSelector = createSelector(
  rolesFeatureSelector,
  (rolesState: IRolesState) => rolesState.isLoading
)

export const errorSelector = createSelector(
  rolesFeatureSelector,
  (rolesState: IRolesState) => rolesState.error
)

export const permissionsSelector = createSelector(
  rolesFeatureSelector,
  (rolesState: IRolesState) => rolesState.items
)

export const countSelector = createSelector(
  rolesFeatureSelector,
  (rolesState: IRolesState) => rolesState.count
)
