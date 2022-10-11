import {createFeatureSelector, createSelector} from '@ngrx/store'

import {IAuthState} from '../interfaces/auth-state.interface'

export const authFeatureSelector = createFeatureSelector<IAuthState>('auth')

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
  (authState: IAuthState) => authState.isSignedIn === false
)

export const validationErrorSelector = createSelector(
  authFeatureSelector,
  (authState: IAuthState) => authState.validationError
)

export const currentUserSelector = createSelector(
  authFeatureSelector,
  (authState: IAuthState) => authState.currentUser
)

export const allRolesSelector = createSelector(
  authFeatureSelector,
  (authState: IAuthState) => authState.allRoles
)

export const allPermissionsSelector = createSelector(
  authFeatureSelector,
  (authState: IAuthState) => authState.allPermissions
)

export const redirectUrlSelector = createSelector(
  authFeatureSelector,
  (authState: IAuthState) => authState.redirectUrl
)
