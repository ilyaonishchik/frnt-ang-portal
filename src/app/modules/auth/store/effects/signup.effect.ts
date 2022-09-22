import {Injectable} from '@angular/core'
import {HttpErrorResponse} from '@angular/common/http'

import {Actions, createEffect, ofType} from '@ngrx/effects'
import {catchError, map, of, switchMap} from 'rxjs'

import {
  signupAction,
  signupFailureAction,
  signupSuccessAction,
} from '../actions/signup.action'
import {AuthService} from '../../services/auth.service'
import {ICurrentUser} from '../../../../shared/types/current-user.interface'
import {responseToError} from '../../../../shared/functions/error.function'

@Injectable()
export class SignupEffect {
  constructor(private actions$: Actions, private authService: AuthService) {}

  signup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signupAction),
      switchMap(({request}) => {
        return this.authService.signUp(request).pipe(
          map((currentUser: ICurrentUser) => {
            return signupSuccessAction({currentUser})
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              signupFailureAction({error: responseToError(errorResponse)})
            )
          })
        )
      })
    )
  )
}
