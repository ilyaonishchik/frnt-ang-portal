import {createFeatureSelector, createSelector} from '@ngrx/store'

import {IUsersState} from '../interfaces/users-state.interface'
import {usersFeatureKey} from './reducers'

export const usersFeatureSelector =
  createFeatureSelector<IUsersState>(usersFeatureKey)

export const isLoadingSelector = createSelector(
  usersFeatureSelector,
  (usersState: IUsersState) => usersState.isLoading
)

export const errorsSelector = createSelector(
  usersFeatureSelector,
  (usersState: IUsersState) => usersState.backendErrors
)

export const usersSelector = createSelector(
  usersFeatureSelector,
  (usersState: IUsersState) => usersState.data
)

export const dialogActionSelector = createSelector(
  usersFeatureSelector,
  (usersState: IUsersState) => usersState.crud
)
