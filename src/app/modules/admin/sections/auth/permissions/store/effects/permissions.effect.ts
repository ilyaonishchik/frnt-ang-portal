import {Injectable} from '@angular/core'
import {catchError, map, of, switchMap} from 'rxjs'
import {Actions, createEffect, ofType} from '@ngrx/effects'

import {PermissionsService} from '../../services/permissions.service'
import {
  getPermissionsAction,
  getPermissionsFailureAction,
  getPermissionsSuccessAction,
} from '../actions/permissions.action'
import {IResponseItems} from 'src/app/shared/interfaces/response-items.interface'
import {IPermission} from 'src/app/shared/interfaces/permission.interface'

@Injectable()
export class GetPermissionsEffect {
  constructor(
    private actions$: Actions,
    private permissionsService: PermissionsService
  ) {}

  getPermissions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getPermissionsAction),
      switchMap(({event}) => {
        return this.permissionsService.getPermissions(event).pipe(
          map((response: IResponseItems<IPermission>) => {
            return getPermissionsSuccessAction({
              permissions: {
                items: response.results,
                count: response.records,
              },
            })
          }),
          catchError(() => {
            return of(getPermissionsFailureAction())
          })
        )
      })
    )
  )
}
