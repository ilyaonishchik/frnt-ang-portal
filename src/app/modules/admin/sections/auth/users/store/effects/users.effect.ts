import {Injectable} from '@angular/core'
import {HttpErrorResponse} from '@angular/common/http'
import {catchError, map, of, switchMap, tap} from 'rxjs'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {Store} from '@ngrx/store'

import {
  getUsersAction,
  getUsersSuccessAction,
  getUsersFailureAction,
} from '../actions/users.action'
import {IResponseItems} from 'src/app/shared/interfaces/response-items.interface'
import {responseToErrors} from 'src/app/shared/functions/error.function'
import {dialogConfirmAction} from 'src/app/shared/store/actions/dialogs.action'
import {UsersService} from '../../services/users.service'
import {IUser} from 'src/app/shared/interfaces/user.interface'

@Injectable()
export class GetUsersEffect {
  constructor(
    private actions$: Actions,
    private usersService: UsersService,
    private store: Store
  ) {}

  getUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getUsersAction),
      switchMap(({event, action}) => {
        return this.usersService.getUsers(event, action).pipe(
          map((response: IResponseItems<IUser>) => {
            return getUsersSuccessAction({
              users: {
                items: response.results,
                count: response.records,
                first: response.skip,
              },
            })
          }),
          catchError((response: HttpErrorResponse) => {
            return of(
              getUsersFailureAction({errors: responseToErrors(response)})
            )
          })
        )
      })
    )
  )

  afterDialogConfirm$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(dialogConfirmAction),
        tap((value) => {
          this.store.dispatch(
            getUsersAction({event: null, action: value.action})
          )
        })
      ),
    {dispatch: false}
  )
}
