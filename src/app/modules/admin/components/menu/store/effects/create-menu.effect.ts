import {Injectable} from '@angular/core'
import {HttpErrorResponse} from '@angular/common/http'
import {catchError, map, of, switchMap, tap} from 'rxjs'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {Store} from '@ngrx/store'

import {MenuService} from '../../services/menu.service'
import {
  createMenuAction,
  createMenuFailureAction,
  createMenuSuccessAction,
} from '../actions/menu.action'
import {responseToErrors} from '@shared/functions/error.function'
import {TCrudAction} from '@shared/types/crud-action.type'
import {dialogConfirmAction} from '@shared/store/actions/dialog.action'
import {IMenu} from '../../../../sections/portal/menus/interfaces/menu.interface'

@Injectable()
export class CreateMenuEffect {
  constructor(
    private actions$: Actions,
    private menuService: MenuService,
    private store: Store
  ) {}

  createMenu$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createMenuAction),
      switchMap(({menu}) => {
        return this.menuService.createMenu(menu).pipe(
          map((menu: IMenu) => {
            return createMenuSuccessAction({menu: menu})
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              createMenuFailureAction({
                errors: responseToErrors(errorResponse),
              })
            )
          })
        )
      })
    )
  )

  afterCreateMenu$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(createMenuSuccessAction),
        tap(() => {
          this.store.dispatch(dialogConfirmAction({action: TCrudAction.CREATE}))
        })
      ),
    {dispatch: false}
  )
}
