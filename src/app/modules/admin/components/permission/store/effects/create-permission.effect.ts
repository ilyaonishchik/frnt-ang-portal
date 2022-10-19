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
          catchError(() => {
            return of(createPermissionFailureAction())
          })
        )
      })
    )
  )
}
