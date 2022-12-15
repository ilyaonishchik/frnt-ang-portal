import {Injectable} from '@angular/core'
import {HttpErrorResponse} from '@angular/common/http'
import {catchError, map, of, switchMap, tap} from 'rxjs'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {Store} from '@ngrx/store'

import {TCrudAction} from '@shared/types/crud-action.type'
import {dialogConfirmAction} from '@shared/store/actions/dialog.action'
import {UserService} from '../../services/user.service'
import {
  deleteUserAction,
  deleteUserFailureAction,
  deleteUserSuccessAction,
} from '../actions/user.action'
import {IDeleteResponse} from '@shared/interfaces/delete-response.interface'
import {responseToErrors} from '@shared/functions/error.function'

@Injectable()
export class DeleteUserEffect {
  constructor(
    private actions$: Actions,
    private userService: UserService,
    private store: Store
  ) {}

  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteUserAction),
      switchMap(({id}) => {
        return this.userService.deleteUser(id).pipe(
          map((response: IDeleteResponse) => {
            return deleteUserSuccessAction({response: response})
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              deleteUserFailureAction({
                errors: responseToErrors(errorResponse),
              })
            )
          })
        )
      })
    )
  )

  afterDeleteUser$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(deleteUserSuccessAction),
        tap(() => {
          this.store.dispatch(dialogConfirmAction({action: TCrudAction.DELETE}))
        })
      ),
    {dispatch: false}
  )
}
