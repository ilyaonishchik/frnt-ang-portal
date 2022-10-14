import {Injectable} from '@angular/core'
import {catchError, map, of, switchMap, tap} from 'rxjs'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {Store} from '@ngrx/store'

import {PermissionsService} from '../../services/permissions.service'
import {
  deletePermissionAction,
  deletePermissionFailureAction,
  deletePermissionSuccessAction,
} from '../actions/delete.action'
import {IDeleteResponse} from 'src/app/shared/interfaces/delete-response.interface'
import {IActionErrorResponse} from 'src/app/shared/interfaces/action-error-response.interface'
import {getPermissionsAction} from '../actions/permissions.action'

@Injectable()
export class DeletePermissionEffect {
  constructor(
    private actions$: Actions,
    private store: Store,
    private permissionsService: PermissionsService
  ) {}

  deletePermission$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deletePermissionAction),
      switchMap(({id}) => {
        return this.permissionsService.deletePermission(id).pipe(
          map((response: IDeleteResponse) => {
            return deletePermissionSuccessAction({response})
          }),
          catchError((error: IActionErrorResponse) => {
            return of(deletePermissionFailureAction({error}))
          })
        )
      })
    )
  )

  afterDeletePermission$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(deletePermissionSuccessAction),
        tap(() => {
          this.store.dispatch(getPermissionsAction({event: null}))
        })
      ),
    {dispatch: false}
  )
}
