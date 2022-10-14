import {Injectable} from '@angular/core'
import {catchError, map, of, switchMap} from 'rxjs'
import {Actions, createEffect, ofType} from '@ngrx/effects'

import {PermissionsService} from '../../services/permissions.service'
import {IActionErrorResponse} from 'src/app/shared/interfaces/action-error-response.interface'
import {
  readPermissionAction,
  readPermissionFailureAction,
  readPermissionSuccessAction,
} from '../actions/read.action'
import {IPermission} from 'src/app/shared/interfaces/permission.interface'

@Injectable()
export class ReadPermissionEffect {
  constructor(
    private actions$: Actions,
    private permissionsService: PermissionsService
  ) {}

  readPermission$ = createEffect(() =>
    this.actions$.pipe(
      ofType(readPermissionAction),
      switchMap(({id}) => {
        return this.permissionsService.getPermission(id).pipe(
          map((item: IPermission) => {
            return readPermissionSuccessAction({item})
          }),
          catchError((error: IActionErrorResponse) => {
            return of(readPermissionFailureAction({error}))
          })
        )
      })
    )
  )
}
