import {createFeatureSelector, createSelector} from '@ngrx/store'

import {IUsersState} from '../interfaces/users-state.interface'

export const usersFeatureSelector = createFeatureSelector<IUsersState>('users')

export const isLoadingSelector = createSelector(
  usersFeatureSelector,
  (usersState: IUsersState) => usersState.isLoading
)

export const errorSelector = createSelector(
  usersFeatureSelector,
  (usersState: IUsersState) => usersState.error
)

export const usersSelector = createSelector(
  usersFeatureSelector,
  (usersState: IUsersState) => usersState.data
)

export const dialogActionSelector = createSelector(
  usersFeatureSelector,
  (usersState: IUsersState) => usersState.crud
)
