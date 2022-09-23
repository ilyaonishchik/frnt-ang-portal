import {Injectable} from '@angular/core'
import {HttpErrorResponse} from '@angular/common/http'
import {Router} from '@angular/router'

import {Actions, createEffect, ofType} from '@ngrx/effects'
import {catchError, map, of, switchMap, tap} from 'rxjs'

import {
  signinAction,
  signinFailureAction,
  signinSuccessAction,
} from '../actions/signin.action'
import {AuthService} from '../../services/auth.service'
import {responseToError} from '../../../../shared/functions/error.function'

import {ISigninResponse} from '../../types/signin-response.interface'
import {PersistenceService} from '../../../../shared/services/persistence.service'
import {LayoutService} from '../../../../services/layout.service'

@Injectable()
export class SigninEffect {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private persistenceService: PersistenceService,
    private layoutService: LayoutService,
    private router: Router
  ) {}

  signin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signinAction),
      switchMap(({request}) => {
        return this.authService.signIn(request).pipe(
          map((response: ISigninResponse) => {
            this.persistenceService.setAccessToken(response.tokens.access_token)
            this.persistenceService.setRefreshToken(
              response.tokens.refresh_token
            )
            this.layoutService.config.menuMode = 'static'
            return signinSuccessAction({currentUser: response.user})
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              signinFailureAction({error: responseToError(errorResponse)})
            )
          })
        )
      })
    )
  )

  redirectAfterSignin$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(signinSuccessAction),
        tap(() => {
          this.router.navigateByUrl('/')
        })
      ),
    {dispatch: false}
  )
}
