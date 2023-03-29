import {Injectable} from '@angular/core'
import {HttpErrorResponse} from '@angular/common/http'
import {catchError, map, of, switchMap, tap} from 'rxjs'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {Store} from '@ngrx/store'

import {MenuService} from '../../services/menu.service'
import {
  updateMenuAction,
  updateMenuFailureAction,
  updateMenuSuccessAction,
} from '../actions/menu.action'
import {responseToErrors} from '@shared/functions/error.function'
import {TCrudAction} from '@shared/types/crud-action.type'
import {dialogConfirmAction} from '@shared/store/actions/dialog.action'
import {IMenu} from '../../../../../sections/portal/menus/interfaces/menu.interface'

@Injectable()
export class UpdateMenuEffect {
  constructor(
    private actions$: Actions,
    private menuService: MenuService,
    private store: Store
  ) {}

  updateMenu$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateMenuAction),
      switchMap(({id, menu}) => {
        return this.menuService.updateMenu(id, menu).pipe(
          map((menu: IMenu) => {
            return updateMenuSuccessAction({menu: menu})
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              updateMenuFailureAction({
                errors: responseToErrors(errorResponse),
              })
            )
          })
        )
      })
    )
  )

  afterUpdateMenu$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateMenuSuccessAction),
        tap(() => {
          this.store.dispatch(dialogConfirmAction({action: TCrudAction.UPDATE}))
        })
      ),
    {dispatch: false}
  )
}
