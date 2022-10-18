import {Injectable} from '@angular/core'
import {catchError, map, of, switchMap} from 'rxjs'
import {Actions, createEffect, ofType} from '@ngrx/effects'

import {UserService} from '../../services/user.service'
import {
  getUserAction,
  getUserFailureAction,
  getUserSuccessAction,
} from '../actions/user.action'
import {IUserInfo} from 'src/app/shared/interfaces/user.interface'

@Injectable()
export class GetUserEffect {
  constructor(private actions$: Actions, private userService: UserService) {}

  getUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getUserAction),
      switchMap(({id}) => {
        return this.userService.getUser(id).pipe(
          map((response: IUserInfo) => {
            return getUserSuccessAction({user: response})
          }),
          catchError(() => {
            return of(getUserFailureAction)
          })
        )
      })
    )
  )
}
