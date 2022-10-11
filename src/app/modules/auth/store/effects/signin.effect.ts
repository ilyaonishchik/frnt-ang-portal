import {Injectable} from '@angular/core'
import {HttpErrorResponse} from '@angular/common/http'
import {Router} from '@angular/router'

import {Store} from '@ngrx/store'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {catchError, map, of, switchMap, tap} from 'rxjs'

import {
  signinAction,
  signinFailureAction,
  signinSuccessAction,
} from '../actions/signin.action'
import {AuthService} from '../../services/auth.service'
import {responseToError} from 'src/app/shared/functions/error.function'

import {ISigninResponse} from '../../interfaces/signin-response.interface'
import {PersistenceService} from 'src/app/shared/services/persistence.service'
import {LayoutService} from 'src/app/shared/services/layout.service'
import {IAuthState} from '../../interfaces/auth-state.interface'
import {redirectUrlSelector} from '../selectors'
import {getAllRolesAction} from '../actions/get-all-roles.action'

@Injectable()
export class SigninEffect {
  constructor(
    private actions$: Actions,
    private store: Store<IAuthState>,
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
            this.persistenceService.setAccessToken(response.access_token)
            this.persistenceService.setRefreshToken(response.refresh_token)
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

  afterSignin$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(signinSuccessAction),
        tap(() => {
          this.store.dispatch(getAllRolesAction())
          let getRedirectUrl$ = this.store
            .select(redirectUrlSelector)
            .subscribe((value) => {
              this.router.navigateByUrl(value).then((_) => {})
            })
          getRedirectUrl$.unsubscribe()
        })
      ),
    {dispatch: false}
  )

  // redirectAfterSignin$ = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(signinSuccessAction),
  //       tap(() => {
  //         this.router.navigateByUrl('/').then((_) => {})
  //       })
  //     ),
  //   {dispatch: false}
  // )
}
