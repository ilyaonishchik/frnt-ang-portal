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

export const rolesSelector = createSelector(
  rolesFeatureSelector,
  (rolesState: IRolesState) => rolesState.data
)
