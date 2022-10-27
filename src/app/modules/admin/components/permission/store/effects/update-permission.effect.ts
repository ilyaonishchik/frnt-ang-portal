import {Injectable} from '@angular/core'
import {HttpErrorResponse} from '@angular/common/http'
import {catchError, map, of, switchMap, tap} from 'rxjs'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {Store} from '@ngrx/store'

import {PermissionService} from '../../services/permission.service'
import {
  updatePermissionAction,
  updatePermissionFailureAction,
  updatePermissionSuccessAction,
} from '../actions/permission.action'
import {IPermission} from 'src/app/shared/interfaces/permission.interface'
import {responseToErrors} from 'src/app/shared/functions/error.function'
import {dialogConfirmAction} from '../../../../sections/auth/permissions/store/actions/dialogs.action'
import {TCrudAction} from '../../../../../../shared/types/crud-action.type'

@Injectable()
export class UpdatePermissionEffect {
  constructor(
    private actions$: Actions,
    private permissionService: PermissionService,
    private store: Store
  ) {}

  updatePermission$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updatePermissionAction),
      switchMap(({id, permission}) => {
        return this.permissionService.updatePermission(id, permission).pipe(
          map((permission: IPermission) => {
            return updatePermissionSuccessAction({permission: permission})
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              updatePermissionFailureAction({
                errors: responseToErrors(errorResponse),
              })
            )
          })
        )
      })
    )
  )

  afterUpdatePermission$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updatePermissionSuccessAction),
        tap(() => {
          this.store.dispatch(dialogConfirmAction({action: TCrudAction.UPDATE}))
        })
      ),
    {dispatch: false}
  )
}
