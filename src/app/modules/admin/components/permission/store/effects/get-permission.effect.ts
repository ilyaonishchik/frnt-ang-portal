import {Injectable} from '@angular/core'
import {catchError, map, of, switchMap} from 'rxjs'
import {Actions, createEffect, ofType} from '@ngrx/effects'

import {PermissionService} from '../../services/permission.service'
import {
  getPermissionAction,
  getPermissionFailureAction,
  getPermissionSuccessAction,
} from '../actions/permission.action'
import {IPermission} from 'src/app/shared/interfaces/permission.interface'

@Injectable()
export class GetPermissionEffect {
  constructor(
    private actions$: Actions,
    private permissionService: PermissionService
  ) {}

  getPermission$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getPermissionAction),
      switchMap(({id}) => {
        return this.permissionService.getPermission(id).pipe(
          map((permission: IPermission) => {
            return getPermissionSuccessAction({permission: permission})
          }),
          catchError(() => {
            return of(getPermissionFailureAction())
          })
        )
      })
    )
  )
}