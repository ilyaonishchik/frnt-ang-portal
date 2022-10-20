import {Injectable} from '@angular/core'
import {catchError, map, of, switchMap} from 'rxjs'
import {Actions, createEffect, ofType} from '@ngrx/effects'

import {PermissionService} from '../../services/permission.service'
import {
  createPermissionAction,
  createPermissionFailureAction,
  createPermissionSuccessAction,
} from '../actions/permission.action'
import {IPermission} from 'src/app/shared/interfaces/permission.interface'
import {HttpErrorResponse} from '@angular/common/http'

@Injectable()
export class CreatePermissionEffect {
  constructor(
    private actions$: Actions,
    private permissionService: PermissionService
  ) {}

  createPermission$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createPermissionAction),
      switchMap(({permission}) => {
        return this.permissionService.createPermission(permission).pipe(
          map((permission: IPermission) => {
            return createPermissionSuccessAction({permission: permission})
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              createPermissionFailureAction({
                response: {
                  status: errorResponse.status,
                  code: errorResponse.statusText,
                  error: errorResponse.error,
                },
              })
            )
          })
        )
      })
    )
  )
}
