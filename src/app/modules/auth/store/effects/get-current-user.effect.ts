import {Injectable} from '@angular/core'
import {HttpErrorResponse} from '@angular/common/http'

import {Store} from '@ngrx/store'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {catchError, map, of, switchMap} from 'rxjs'

import {AuthService} from '../../services/auth.service'
import {PersistenceService} from '@shared/services/persistence.service'
import {LayoutService} from '@shared/modules/layout/services/layout.service'
import {
  getCurrentUserAction,
  getCurrentUserFailureAction,
  getCurrentUserSuccessAction,
} from '../actions/get-current-user.action'
import {IUserFull} from '@shared/interfaces/user.interface'
import {responseToErrors} from '@shared/functions/error.function'

@Injectable()
export class GetCurrentUserEffect {
  constructor(
    private actions$: Actions,
    private store: Store,
    private authService: AuthService,
    private persistenceService: PersistenceService,
    private layoutService: LayoutService
  ) {}

  getCurrentUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getCurrentUserAction),
      switchMap(() => {
        const token = this.persistenceService.getAccessToken()
        if (!token) {
          return of(getCurrentUserFailureAction({errors: null}))
        }
        return this.authService.getCurrentUser().pipe(
          map((currentUser: IUserFull) => {
            this.layoutService.config.menuMode = 'static'
            this.persistenceService.setCurrentUser(currentUser)
            return getCurrentUserSuccessAction({currentUser: currentUser})
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            this.persistenceService.clearTokens()
            return of(
              getCurrentUserFailureAction({
                errors: responseToErrors(errorResponse),
              })
            )
          })
        )
      })
    )
  })

  // afterGetCurrentUser$ = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(getCurrentUserSuccessAction),
  //       tap(() => {
  //         this.store.dispatch(getAllRolesAction())
  //         this.store.dispatch(getAllPermissionsAction())
  //       })
  //     ),
  //   {dispatch: false}
  // )
}
