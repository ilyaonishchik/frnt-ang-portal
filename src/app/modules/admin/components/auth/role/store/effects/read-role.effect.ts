import {Injectable} from '@angular/core'
import {HttpErrorResponse} from '@angular/common/http'
import {catchError, map, of, switchMap} from 'rxjs'
import {Actions, createEffect, ofType} from '@ngrx/effects'

import {RoleService} from '../../services/role.service'
import {
  getRoleAction,
  getRoleFailureAction,
  getRoleSuccessAction,
} from '../actions/role.action'
import {IRoleFull} from '@shared/interfaces/role.interface'
import {responseToErrors} from '@shared/functions/error.function'

@Injectable()
export class ReadRoleEffect {
  constructor(private actions$: Actions, private roleService: RoleService) {}

  getRole$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getRoleAction),
      switchMap(({id}) => {
        return this.roleService.getRole(id).pipe(
          map((role: IRoleFull) => {
            return getRoleSuccessAction({role: role})
          }),
          catchError((response: HttpErrorResponse) => {
            return of(
              getRoleFailureAction({errors: responseToErrors(response)})
            )
          })
        )
      })
    )
  )
}
