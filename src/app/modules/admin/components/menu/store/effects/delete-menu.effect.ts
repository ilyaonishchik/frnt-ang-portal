import {Injectable} from '@angular/core'
import {HttpErrorResponse} from '@angular/common/http'
import {catchError, map, of, switchMap, tap} from 'rxjs'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {Store} from '@ngrx/store'

import {MenuService} from '../../services/menu.service'
import {responseToErrors} from '@shared/functions/error.function'
import {IDeleteResponse} from '@shared/interfaces/delete-response.interface'
import {
  deleteMenuAction,
  deleteMenuFailureAction,
  deleteMenuSuccessAction,
} from '../actions/menu.action'
import {TCrudAction} from '@shared/types/crud-action.type'
import {dialogConfirmAction} from '@shared/store/actions/dialog.action'

@Injectable()
export class DeleteMenuEffect {
  constructor(
    private actions$: Actions,
    private menuService: MenuService,
    private store: Store
  ) {}

  deleteMenu$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteMenuAction),
      switchMap(({id}) => {
        return this.menuService.deleteMenu(id).pipe(
          map((response: IDeleteResponse) => {
            return deleteMenuSuccessAction({response: response})
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              deleteMenuFailureAction({
                errors: responseToErrors(errorResponse),
              })
            )
          })
        )
      })
    )
  )

  afterDeleteMenu$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(deleteMenuSuccessAction),
        tap(() => {
          this.store.dispatch(dialogConfirmAction({action: TCrudAction.DELETE}))
        })
      ),
    {dispatch: false}
  )
}
