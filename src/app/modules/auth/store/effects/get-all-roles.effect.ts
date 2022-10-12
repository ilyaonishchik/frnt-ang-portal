import {Injectable} from '@angular/core'

import {Actions, createEffect, ofType} from '@ngrx/effects'
import {catchError, map, of, switchMap} from 'rxjs'

import {AuthService} from '../../services/auth.service'
import {
  getAllRolesAction,
  getAllRolesFailureAction,
  getAllRolesSuccessAction,
} from '../actions/get-all-roles.action'
import {IRole} from 'src/app/shared/interfaces/role.interface'

@Injectable()
export class GetAllRolesEffect {
  constructor(private actions$: Actions, private authService: AuthService) {}

  getAllRoles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getAllRolesAction),
      switchMap(() => {
        return this.authService.getRoles().pipe(
          map((roles: IRole[]) => {
            return getAllRolesSuccessAction({roles: roles})
          }),
          catchError(() => {
            return of(getAllRolesFailureAction())
          })
        )
      })
    )
  )
}
