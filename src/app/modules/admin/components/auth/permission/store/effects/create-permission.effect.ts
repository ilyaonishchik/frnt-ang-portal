import {Injectable} from '@angular/core'
import {HttpErrorResponse} from '@angular/common/http'
import {catchError, map, of, switchMap, tap} from 'rxjs'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {Store} from '@ngrx/store'

import {PermissionService} from '../../services/permission.service'
import {
  createPermissionAction,
  createPermissionFailureAction,
  createPermissionSuccessAction,
} from '../actions/permission.action'
import {IPermissionFull} from '@shared/interfaces/permission.interface'
import {responseToErrors} from '@shared/functions/error.function'
import {TCrudAction} from '@shared/types/crud-action.type'
import {dialogConfirmAction} from '@shared/store/actions/dialog.action'

@Injectable()
export class CreatePermissionEffect {
  constructor(
    private actions$: Actions,
    private permissionService: PermissionService,
    private store: Store
  ) {}

  createPermission$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createPermissionAction),
      switchMap(({permission}) => {
        return this.permissionService.createPermission(permission).pipe(
          map((permission: IPermissionFull) => {
            return createPermissionSuccessAction({permission: permission})
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              createPermissionFailureAction({
                errors: responseToErrors(errorResponse),
              })
            )
          })
        )
      })
    )
  )

  afterCreatePermission$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(createPermissionSuccessAction),
        tap(() => {
          this.store.dispatch(dialogConfirmAction({action: TCrudAction.CREATE}))
        })
      ),
    {dispatch: false}
  )
}
