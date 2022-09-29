import {Injectable} from '@angular/core'

import {Actions, createEffect, ofType} from '@ngrx/effects'
import {catchError, map, of, switchMap} from 'rxjs'

import {AuthService} from '../../services/auth.service'
import {PersistenceService} from '../../../../shared/services/persistence.service'
import {
  getCurrentUserAction,
  getCurrentUserFailureAction,
  getCurrentUserSuccessAction,
} from '../actions/get-current-user.action'
import {ICurrentUser} from '../../../../shared/types/current-user.interface'
import {LayoutService} from '../../../../shared/services/layout.service'

@Injectable()
export class GetCurrentUserEffect {
  constructor(
    private actions$: Actions,
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
}
