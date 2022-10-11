import {Injectable} from '@angular/core'
import {catchError, map, of, switchMap} from 'rxjs'
import {Actions, createEffect, ofType} from '@ngrx/effects'

import {RolesService} from '../../services/roles.service'
import {
  getRolesAction,
  getRolesFailureAction,
  getRolesSuccessAction,
} from '../actions/roles.action'
import {IRolesResponse} from 'src/app/shared/interfaces/roles-response.interface'

@Injectable()
export class RolesEffect {
  constructor(private actions$: Actions, private rolesService: RolesService) {}

  roles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getRolesAction),
      switchMap(({event}) => {
        return this.rolesService.getRoles(event).pipe(
          map((roles: IRolesResponse) => {
            return getRolesSuccessAction({
              items: roles.results,
              count: roles.records,
            })
          }),
          catchError(() => {
            return of(getRolesFailureAction())
          })
        )
      })
    )
  )
}
