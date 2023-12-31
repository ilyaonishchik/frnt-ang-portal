import {Injectable} from '@angular/core'
import {HttpErrorResponse} from '@angular/common/http'
import {catchError, map, of, switchMap, tap} from 'rxjs'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {Store} from '@ngrx/store'

import {responseToErrors} from '@shared/functions/error.function'
import {TCrudAction} from '@shared/types/crud-action.type'
import {dialogConfirmAction} from '@shared/store/actions/dialog.action'
import {RoleService} from '../../services/role.service'
import {
  updateRoleAction,
  updateRoleFailureAction,
  updateRoleSuccessAction,
} from '../actions/role.action'
import {IRoleFull} from '@shared/interfaces/role.interface'

@Injectable()
export class UpdateRoleEffect {
  constructor(
    private actions$: Actions,
    private roleService: RoleService,
    private store: Store
  ) {}

  updateRole$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateRoleAction),
      switchMap(({id, role}) => {
        return this.roleService.updateRole(id, role).pipe(
          map((role: IRoleFull) => {
            return updateRoleSuccessAction({role: role})
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              updateRoleFailureAction({
                errors: responseToErrors(errorResponse),
              })
            )
          })
        )
      })
    )
  )

  afterUpdateRole$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateRoleSuccessAction),
        tap(() => {
          this.store.dispatch(dialogConfirmAction({action: TCrudAction.UPDATE}))
        })
      ),
    {dispatch: false}
  )
}
