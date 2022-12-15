import {createFeatureSelector, createSelector} from '@ngrx/store'

import {IAuthState} from '../interfaces/auth-state.interface'
import {authFeatureKey} from './reducers'

export const authFeatureSelector =
  createFeatureSelector<IAuthState>(authFeatureKey)

export const isSubmittingSelector = createSelector(
  authFeatureSelector,
  (authState: IAuthState) => authState.isSubmitting
)

export const isSignedInSelector = createSelector(
  authFeatureSelector,
  (authState: IAuthState) => authState.isSignedIn
)

export const isAnonymousSelector = createSelector(
  authFeatureSelector,
  (authState: IAuthState) => !authState.isSignedIn
)

// export const validationErrorSelector = createSelector(
//   authFeatureSelector,
//   (authState: IAuthState) => authState.backendErrors
// )

export const currentUserSelector = createSelector(
  authFeatureSelector,
  (authState: IAuthState) => authState.currentUser
)

export const redirectUrlSelector = createSelector(
  authFeatureSelector,
  (authState: IAuthState) => authState.redirectUrl
)
