import {Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {
  signupAction,
  signupFailureAction,
  signupSuccessAction,
} from '../actions/signup.action'
import {catchError, map, of, switchMap} from 'rxjs'
import {AuthService} from '../../services/auth.service'
import {ICurrentUser} from '../../../../shared/types/current-user.interface'

@Injectable()
export class SignupEffect {
  signup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signupAction),
      switchMap(({request}) => {
        return this.authService.signUp(request).pipe(
          map((currentUser: ICurrentUser) => {
            return signupSuccessAction({currentUser})
          }),
          catchError(() => {
            return of(signupFailureAction())
          })
        )
      })
    )
  )

  constructor(private actions$: Actions, private authService: AuthService) {}
}
