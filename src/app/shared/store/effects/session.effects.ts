import {Injectable} from '@angular/core'
import {HttpErrorResponse} from '@angular/common/http'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {catchError, map, of, switchMap} from 'rxjs'

import {
  getAllPermissionsAction,
  getAllPermissionsFailureAction,
  getAllPermissionsSuccessAction,
  getAllRolesAction,
  getAllRolesFailureAction,
  getAllRolesSuccessAction,
} from '../actions/session.actions'
import {SessionService} from '../../services/session.service'
import {IPermission} from '../../interfaces/permission.interface'
import {responseToErrors} from '../../functions/error.function'
import {IRole} from '../../interfaces/role.interface'

@Injectable()
export class SessionEffects {
  constructor(
    private actions$: Actions,
    private sessionService: SessionService
  ) {}

  getAllPermissions$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getAllPermissionsAction),
      switchMap(() => {
        return this.sessionService.getPermissions().pipe(
          map((permissions: IPermission[]) => {
            return getAllPermissionsSuccessAction({permissions: permissions})
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              getAllPermissionsFailureAction({
                errors: responseToErrors(errorResponse),
              })
            )
          })
        )
      })
    )
  })

  getAllRoles$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getAllRolesAction),
      switchMap(() => {
        return this.sessionService.getRoles().pipe(
          map((roles: IRole[]) => {
            return getAllRolesSuccessAction({roles: roles})
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              getAllRolesFailureAction({
                errors: responseToErrors(errorResponse),
              })
            )
          })
        )
      })
    )
  })
}
