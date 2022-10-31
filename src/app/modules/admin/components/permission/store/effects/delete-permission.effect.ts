import {Injectable} from '@angular/core'
import {HttpErrorResponse} from '@angular/common/http'
import {catchError, map, of, switchMap, tap} from 'rxjs'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {Store} from '@ngrx/store'

import {PermissionService} from '../../services/permission.service'
import {responseToErrors} from 'src/app/shared/functions/error.function'
import {IDeleteResponse} from 'src/app/shared/interfaces/delete-response.interface'
import {
  deletePermissionAction,
  deletePermissionFailureAction,
  deletePermissionSuccessAction,
} from '../actions/permission.action'
import {TCrudAction} from 'src/app/shared/types/crud-action.type'
import {dialogConfirmAction} from 'src/app/shared/store/actions/dialogs.action'

@Injectable()
export class DeletePermissionEffect {
  constructor(
    private actions$: Actions,
    private permissionService: PermissionService,
    private store: Store
  ) {}

  deletePermission$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deletePermissionAction),
      switchMap(({id}) => {
        return this.permissionService.deletePermission(id).pipe(
          map((response: IDeleteResponse) => {
            return deletePermissionSuccessAction({response: response})
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              deletePermissionFailureAction({
                errors: responseToErrors(errorResponse),
              })
            )
          })
        )
      })
    )
  )

  afterDeletePermission$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(deletePermissionSuccessAction),
        tap(() => {
          this.store.dispatch(dialogConfirmAction({action: TCrudAction.DELETE}))
        })
      ),
    {dispatch: false}
  )
}
