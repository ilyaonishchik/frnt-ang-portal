import {Injectable} from '@angular/core'
import {HttpErrorResponse} from '@angular/common/http'
import {catchError, map, of, switchMap, tap} from 'rxjs'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {Store} from '@ngrx/store'

import {PermissionsService} from '../../services/permissions.service'
import {
  getPermissionsAction,
  getPermissionsFailureAction,
  getPermissionsSuccessAction,
} from '../actions/permissions.action'
import {IResponseItems} from '@shared/interfaces/response-items.interface'
import {IPermission} from '@shared/interfaces/permission.interface'
import {dialogConfirmAction} from '@shared/store/actions/dialog.action'
import {responseToErrors} from '@shared/functions/error.function'

@Injectable()
export class GetPermissionsEffect {
  constructor(
    private actions$: Actions,
    private permissionsService: PermissionsService,
    private store: Store
  ) {}

  getPermissions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getPermissionsAction),
      switchMap(({event, action}) => {
        return this.permissionsService.getPermissions(event, action).pipe(
          map((response: IResponseItems<IPermission>) => {
            return getPermissionsSuccessAction({
              permissions: {
                items: response.results,
                count: response.records,
                first: response.skip,
              },
            })
          }),
          catchError((response: HttpErrorResponse) => {
            return of(
              getPermissionsFailureAction({errors: responseToErrors(response)})
            )
          })
        )
      })
    )
  )

  afterDialogConfirm$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(dialogConfirmAction),
        tap((value) => {
          this.store.dispatch(
            getPermissionsAction({event: null, action: value.action})
          )
        })
      ),
    {dispatch: false}
  )
}
