import {Injectable} from '@angular/core'

import {Store} from '@ngrx/store'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {catchError, map, of, switchMap, tap} from 'rxjs'

import {AuthService} from '../../services/auth.service'
import {PersistenceService} from 'src/app/shared/services/persistence.service'
import {
  getCurrentUserAction,
  getCurrentUserFailureAction,
  getCurrentUserSuccessAction,
} from '../actions/get-current-user.action'
import {ICurrentUser} from 'src/app/shared/interfaces/current-user.interface'
import {LayoutService} from 'src/app/shared/services/layout.service'
import {IAuthState} from '../../interfaces/auth-state.interface'
import {getAllRolesAction} from '../actions/get-all-roles.action'
import {getAllPermissionsAction} from '../actions/get-all-permissions.action'

@Injectable()
export class GetCurrentUserEffect {
  constructor(
    private actions$: Actions,
    private store: Store<IAuthState>,
    private authService: AuthService,
    private persistenceService: PersistenceService,
    private layoutService: LayoutService
  ) {}

  getCurrentUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getCurrentUserAction),
      switchMap(() => {
        const token = this.persistenceService.getAccessToken()
        if (!token) {
          return of(getCurrentUserFailureAction())
        }
        return this.authService.getCurrentUser().pipe(
          map((currentUser: ICurrentUser) => {
            this.layoutService.config.menuMode = 'static'
            return getCurrentUserSuccessAction({currentUser})
          }),
          catchError(() => {
            this.persistenceService.clearTokens()
            return of(getCurrentUserFailureAction())
          })
        )
      })
    )
  )

  afterGetCurrentUser$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(getCurrentUserSuccessAction),
        tap(() => {
          this.store.dispatch(getAllRolesAction())
          this.store.dispatch(getAllPermissionsAction())
        })
      ),
    {dispatch: false}
  )
}
