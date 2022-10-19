import {Injectable} from '@angular/core'
import {catchError, map, of, switchMap} from 'rxjs'
import {Actions, createEffect, ofType} from '@ngrx/effects'

import {UsersService} from '../../services/users.service'
import {
  getUsersAction,
  getUsersFailureAction,
  getUsersSuccessAction,
} from '../actions/users.action'
import {IResponseItems} from 'src/app/shared/interfaces/response-items.interface'
import {IUser} from 'src/app/shared/interfaces/user.interface'

@Injectable()
export class GetUsersEffect {
  constructor(private actions$: Actions, private usersService: UsersService) {}

  getUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getUsersAction),
      switchMap(({event}) => {
        return this.usersService.getUsers(event).pipe(
          map((response: IResponseItems<IUser>) => {
            return getUsersSuccessAction({
              users: {
                items: response.results,
                count: response.records,
              },
            })
          }),
          catchError(() => {
            return of(getUsersFailureAction())
          })
        )
      })
    )
  )
}
