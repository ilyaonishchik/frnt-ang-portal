import {Injectable} from '@angular/core'
import {HttpErrorResponse} from '@angular/common/http'
import {catchError, map, of, switchMap} from 'rxjs'
import {Actions, createEffect, ofType} from '@ngrx/effects'

import {MenuService} from '../../services/menu.service'
import {
  getMenuAction,
  getMenuFailureAction,
  getMenuSuccessAction,
} from '../actions/menu.action'
import {responseToErrors} from '@shared/functions/error.function'
import {IMenu} from '@modules/admin/sections/portal/menus/interfaces/menu.interface'

@Injectable()
export class ReadMenuEffect {
  constructor(private actions$: Actions, private menuService: MenuService) {}

  getMenu$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getMenuAction),
      switchMap(({id}) => {
        return this.menuService.getMenu(id).pipe(
          map((menu: IMenu) => {
            return getMenuSuccessAction({menu: menu})
          }),
          catchError((response: HttpErrorResponse) => {
            return of(
              getMenuFailureAction({errors: responseToErrors(response)})
            )
          })
        )
      })
    )
  )
}
