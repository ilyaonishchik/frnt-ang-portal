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
  updateUserAction,
  updateUserFailureAction,
  updateUserSuccessAction,
} from '../actions/user.action'
import {IUserFull} from '@shared/interfaces/user.interface'

@Injectable()
export class UpdateUserEffect {
  constructor(
    private actions$: Actions,
    private userService: UserService,
    private store: Store
  ) {}

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateUserAction),
      switchMap(({id, user}) => {
        return this.userService.updateUser(id, user).pipe(
          map((user: IUserFull) => {
            return updateUserSuccessAction({user: user})
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              updateUserFailureAction({
                errors: responseToErrors(errorResponse),
              })
            )
          })
        )
      })
    )
  )

  afterUpdateUser$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateUserSuccessAction),
        tap(() => {
          this.store.dispatch(dialogConfirmAction({action: TCrudAction.UPDATE}))
        })
      ),
    {dispatch: false}
  )
}
