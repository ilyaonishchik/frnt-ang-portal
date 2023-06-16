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
import {IResponseItems} from '@shared/interfaces/response-items.interface'
import {responseToErrors} from '@shared/functions/error.function'
import {dialogConfirmAction} from '@shared/store/actions/dialog.action'
import {UsersService} from '../../services/users.service'
import {IUserFull} from '@shared/interfaces/user.interface'

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
          map((response: IResponseItems<IUserFull>) => {
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
