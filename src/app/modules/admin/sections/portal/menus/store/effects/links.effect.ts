import {Injectable} from '@angular/core'
import {HttpErrorResponse} from '@angular/common/http'
import {catchError, map, of, switchMap, tap} from 'rxjs'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {Store} from '@ngrx/store'

import {MenusService} from '../../services/menus.service'
import {
  getMenusAction,
  getMenusFailureAction,
  getMenusSuccessAction,
} from '../actions/menus.action'
import {IResponseItems} from '@shared/interfaces/response-items.interface'
import {dialogConfirmAction} from '@shared/store/actions/dialog.action'
import {responseToErrors} from '@shared/functions/error.function'
import {IMenu} from '../../interfaces/menu.interface'

@Injectable()
export class GetMenusEffect {
  constructor(
    private actions$: Actions,
    private menusService: MenusService,
    private store: Store
  ) {}

  getMenus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getMenusAction),
      switchMap(({event, action}) => {
        return this.menusService.getMenus(event, action).pipe(
          map((response: IResponseItems<IMenu>) => {
            return getMenusSuccessAction({
              menus: {
                items: response.results,
                count: response.records,
                first: response.skip,
              },
            })
          }),
          catchError((response: HttpErrorResponse) => {
            return of(
              getMenusFailureAction({errors: responseToErrors(response)})
            )
          })
        )
      })
    )
  )

  afterDialogConfirm$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(dialogConfirmAction),
        tap((value) => {
          this.store.dispatch(
            getMenusAction({event: null, action: value.action})
          )
        })
      ),
    {dispatch: false}
  )
}
