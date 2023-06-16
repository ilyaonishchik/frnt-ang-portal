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
  getAllUsersAction,
  getAllUsersFailureAction,
  getAllUsersSuccessAction,
  getClientInfoAction,
  getClientInfoFailureAction,
  getClientInfoSuccessAction,
} from '../actions/session.actions'
import {SessionService} from '../../services/session.service'
import {IPermission} from '../../interfaces/permission.interface'
import {responseToErrors} from '../../functions/error.function'
import {IRole} from '../../interfaces/role.interface'
import {IClient} from '@shared/interfaces/client.interface'
import {IUser} from '@shared/interfaces/user.interface'

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

  getAllUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getAllUsersAction),
      switchMap(() => {
        return this.sessionService.getUsers().pipe(
          map((users: IUser[]) => {
            return getAllUsersSuccessAction({users: users})
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              getAllUsersFailureAction({
                errors: responseToErrors(errorResponse),
              })
            )
          })
        )
      })
    )
  })

  getClient$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getClientInfoAction),
      switchMap(() => {
        return this.sessionService.getClientInfo().pipe(
          map((client: IClient) => {
            return getClientInfoSuccessAction({client: client})
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              getClientInfoFailureAction({
                errors: responseToErrors(errorResponse),
              })
            )
          })
        )
      })
    )
  })
}
