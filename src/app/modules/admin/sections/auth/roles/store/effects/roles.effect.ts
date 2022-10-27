import {Injectable} from '@angular/core'
import {catchError, map, of, switchMap} from 'rxjs'
import {Actions, createEffect, ofType} from '@ngrx/effects'

import {
  getRolesAction,
  getRolesFailureAction,
  getRolesSuccessAction,
} from '../actions/roles.action'
import {RolesService} from '../../services/roles.service'
import {IResponseItems} from 'src/app/shared/interfaces/response-items.interface'
import {IRole} from 'src/app/shared/interfaces/role.interface'

@Injectable()
export class GetRolesEffect {
  constructor(private actions$: Actions, private rolesService: RolesService) {}

  getRoles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getRolesAction),
      switchMap(({event}) => {
        return this.rolesService.getRoles(event).pipe(
          map((response: IResponseItems<IRole>) => {
            return getRolesSuccessAction({
              roles: {
                items: response.results,
                count: response.records,
                first: response.skip,
              },
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
