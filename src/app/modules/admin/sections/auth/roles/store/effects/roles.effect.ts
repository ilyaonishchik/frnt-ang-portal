import {Injectable} from '@angular/core'
import {HttpErrorResponse} from '@angular/common/http'
import {catchError, map, of, switchMap, tap} from 'rxjs'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {Store} from '@ngrx/store'

import {
  getRolesAction,
  getRolesFailureAction,
  getRolesSuccessAction,
} from '../actions/roles.action'
import {RolesService} from '../../services/roles.service'
import {IResponseItems} from '@shared/interfaces/response-items.interface'
import {IRole} from '@shared/interfaces/role.interface'
import {responseToErrors} from '@shared/functions/error.function'
import {dialogConfirmAction} from '@shared/store/actions/dialog.action'

@Injectable()
export class GetRolesEffect {
  constructor(
    private actions$: Actions,
    private rolesService: RolesService,
    private store: Store
  ) {}

  getRoles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getRolesAction),
      switchMap(({event, action}) => {
        return this.rolesService.getRoles(event, action).pipe(
          map((response: IResponseItems<IRole>) => {
            return getRolesSuccessAction({
              roles: {
                items: response.results,
                count: response.records,
                first: response.skip,
              },
            })
          }),
          catchError((response: HttpErrorResponse) => {
            return of(
              getRolesFailureAction({errors: responseToErrors(response)})
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
            getRolesAction({event: null, action: value.action})
          )
        })
      ),
    {dispatch: false}
  )
}
