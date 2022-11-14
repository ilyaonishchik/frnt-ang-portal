import {createFeatureSelector, createSelector} from '@ngrx/store'

import {IUserState} from '../interfaces/user-state.interface'

export const userFeatureSelector = createFeatureSelector<IUserState>('user')

export const isLoadingSelector = createSelector(
  userFeatureSelector,
  (userState: IUserState) => userState.isLoading
)

export const isSubmittingSelector = createSelector(
  userFeatureSelector,
  (userState: IUserState) => userState.isSubmitting
)

export const errorsSelector = createSelector(
  userFeatureSelector,
  (userState: IUserState) => userState.backendErrors
)

export const userSelector = createSelector(
  userFeatureSelector,
  (userState: IUserState) => userState.item
)
