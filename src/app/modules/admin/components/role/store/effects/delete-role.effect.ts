import {Injectable} from '@angular/core'
import {HttpErrorResponse} from '@angular/common/http'
import {catchError, map, of, switchMap, tap} from 'rxjs'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {Store} from '@ngrx/store'

import {TCrudAction} from 'src/app/shared/types/crud-action.type'
import {dialogConfirmAction} from 'src/app/shared/store/actions/dialogs.action'
import {RoleService} from '../../services/role.service'
import {
  deleteRoleAction,
  deleteRoleFailureAction,
  deleteRoleSuccessAction,
} from '../actions/role.action'
import {IDeleteResponse} from 'src/app/shared/interfaces/delete-response.interface'
import {responseToErrors} from 'src/app/shared/functions/error.function'

@Injectable()
export class DeleteRoleEffect {
  constructor(
    private actions$: Actions,
    private roleService: RoleService,
    private store: Store
  ) {}

  deleteRole$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteRoleAction),
      switchMap(({id}) => {
        return this.roleService.deleteRole(id).pipe(
          map((response: IDeleteResponse) => {
            return deleteRoleSuccessAction({response: response})
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              deleteRoleFailureAction({
                errors: responseToErrors(errorResponse),
              })
            )
          })
        )
      })
    )
  )

  afterDeleteRole$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(deleteRoleSuccessAction),
        tap(() => {
          this.store.dispatch(dialogConfirmAction({action: TCrudAction.DELETE}))
        })
      ),
    {dispatch: false}
  )
}
