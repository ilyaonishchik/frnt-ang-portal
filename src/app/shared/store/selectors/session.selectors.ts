import {createFeatureSelector, createSelector} from '@ngrx/store'

import {ISessionState} from '../../interfaces/session-state.interface'
import {sessionFeatureKey} from '../reducers/session.reducer'

export const sessionFeatureSelector =
  createFeatureSelector<ISessionState>(sessionFeatureKey)

export const allRolesSelector = createSelector(
  sessionFeatureSelector,
  (sessionState: ISessionState) => sessionState.allRoles
)

export const allPermissionsSelector = createSelector(
  sessionFeatureSelector,
  (sessionState: ISessionState) => sessionState.allPermissions
)

export const clientSelector = createSelector(
  sessionFeatureSelector,
  (sessionState: ISessionState) => sessionState.client
)
