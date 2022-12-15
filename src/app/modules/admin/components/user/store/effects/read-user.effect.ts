import {Injectable} from '@angular/core'
import {HttpErrorResponse} from '@angular/common/http'
import {catchError, map, of, switchMap} from 'rxjs'
import {Actions, createEffect, ofType} from '@ngrx/effects'

import {UserService} from '../../services/user.service'
import {
  getUserAction,
  getUserFailureAction,
  getUserSuccessAction,
} from '../actions/user.action'
import {IUser} from '@shared/interfaces/user.interface'
import {responseToErrors} from '@shared/functions/error.function'

@Injectable()
export class ReadUserEffect {
  constructor(private actions$: Actions, private userService: UserService) {}

  getUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getUserAction),
      switchMap(({id}) => {
        return this.userService.getUser(id).pipe(
          map((response: IUser) => {
            return getUserSuccessAction({user: response})
          }),
          catchError((response: HttpErrorResponse) => {
            return of(
              getUserFailureAction({errors: responseToErrors(response)})
            )
          })
        )
      })
    )
  )
}
