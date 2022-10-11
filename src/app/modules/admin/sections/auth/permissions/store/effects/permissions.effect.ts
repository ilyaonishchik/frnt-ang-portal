import {Injectable} from '@angular/core'
import {catchError, map, of, switchMap} from 'rxjs'
import {Actions, createEffect, ofType} from '@ngrx/effects'

import {
  getPermissionsAction,
  getPermissionsFailureAction,
  getPermissionsSuccessAction,
} from '../actions/permissions.action'
import {PermissionsService} from '../../services/permissions.service'
import {IPermissionsResponse} from 'src/app/shared/interfaces/permissions-response.interface'

@Injectable()
export class PermissionsEffect {
  constructor(
    private actions$: Actions,
    private permissionsService: PermissionsService
  ) {}

  permissions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getPermissionsAction),
      switchMap(({event}) => {
        return this.permissionsService.getPermissions(event).pipe(
          map((permissions: IPermissionsResponse) => {
            return getPermissionsSuccessAction({
              items: permissions.results,
              count: permissions.records,
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
