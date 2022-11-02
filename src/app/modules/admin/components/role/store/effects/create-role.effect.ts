import {Injectable} from '@angular/core'
import {HttpErrorResponse} from '@angular/common/http'
import {catchError, map, of, switchMap, tap} from 'rxjs'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {Store} from '@ngrx/store'

import {responseToErrors} from 'src/app/shared/functions/error.function'
import {TCrudAction} from 'src/app/shared/types/crud-action.type'
import {dialogConfirmAction} from 'src/app/shared/store/actions/dialogs.action'
import {RoleService} from '../../services/role.service'
import {
  createRoleAction,
  createRoleFailureAction,
  createRoleSuccessAction,
} from '../actions/role.action'
import {IRole} from 'src/app/shared/interfaces/role.interface'

@Injectable()
export class CreateRoleEffect {
  constructor(
    private actions$: Actions,
    private roleService: RoleService,
    private store: Store
  ) {}

  createRole$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createRoleAction),
      switchMap(({role}) => {
        console.log(role)
        return this.roleService.createRole(role).pipe(
          map((role: IRole) => {
            return createRoleSuccessAction({role: role})
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              createRoleFailureAction({
                errors: responseToErrors(errorResponse),
              })
            )
          })
        )
      })
    )
  )

  afterCreateRole$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(createRoleSuccessAction),
        tap(() => {
          this.store.dispatch(dialogConfirmAction({action: TCrudAction.CREATE}))
        })
      ),
    {dispatch: false}
  )
}
