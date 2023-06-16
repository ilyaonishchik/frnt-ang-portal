import {Injectable} from '@angular/core'
import {HttpErrorResponse} from '@angular/common/http'
import {catchError, map, of, switchMap, tap} from 'rxjs'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {Store} from '@ngrx/store'

import {responseToErrors} from '@shared/functions/error.function'
import {TCrudAction} from '@shared/types/crud-action.type'
import {dialogConfirmAction} from '@shared/store/actions/dialog.action'
import {UserService} from '../../services/user.service'
import {
  createUserAction,
  createUserFailureAction,
  createUserSuccessAction,
} from '../actions/user.action'
import {IUserFull} from '@shared/interfaces/user.interface'

@Injectable()
export class CreateUserEffect {
  constructor(
    private actions$: Actions,
    private userService: UserService,
    private store: Store
  ) {}

  createUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createUserAction),
      switchMap(({user}) => {
        return this.userService.createUser(user).pipe(
          map((user: IUserFull) => {
            return createUserSuccessAction({user: user})
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              createUserFailureAction({
                errors: responseToErrors(errorResponse),
              })
            )
          })
        )
      })
    )
  )

  afterCreateUser$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(createUserSuccessAction),
        tap(() => {
          this.store.dispatch(dialogConfirmAction({action: TCrudAction.CREATE}))
        })
      ),
    {dispatch: false}
  )
}
