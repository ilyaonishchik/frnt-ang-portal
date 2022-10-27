import {Injectable} from '@angular/core'
import {catchError, map, of, switchMap} from 'rxjs'
import {Actions, createEffect, ofType} from '@ngrx/effects'

import {PermissionService} from '../../services/permission.service'
import {
  updatePermissionAction,
  updatePermissionFailureAction,
  updatePermissionSuccessAction,
} from '../actions/permission.action'
import {IPermission} from 'src/app/shared/interfaces/permission.interface'
import {HttpErrorResponse} from '@angular/common/http'
import {responseToErrors} from '../../../../../../shared/functions/error.function'

@Injectable()
export class UpdatePermissionEffect {
  constructor(
    private actions$: Actions,
    private permissionService: PermissionService
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
}