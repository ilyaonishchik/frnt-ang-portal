import {Injectable} from '@angular/core'

import {Actions, createEffect, ofType} from '@ngrx/effects'
import {catchError, map, of, switchMap} from 'rxjs'

import {AuthService} from '../../services/auth.service'
import {
  getAllPermissionsAction,
  getAllPermissionsFailureAction,
  getAllPermissionsSuccessAction,
} from '../actions/get-all-permissions.action'
import {IPermission} from 'src/app/shared/interfaces/permission.interface'

@Injectable()
export class GetAllPermissionsEffect {
  constructor(private actions$: Actions, private authService: AuthService) {}

  getAllPermissions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getAllPermissionsAction),
      switchMap(() => {
        return this.authService.getPermissions().pipe(
          map((permissions: IPermission[]) => {
            return getAllPermissionsSuccessAction({permissions: permissions})
          }),
          catchError(() => {
            return of(getAllPermissionsFailureAction())
          })
        )
      })
    )
  )
}
