import {Injectable} from '@angular/core'
import {HttpErrorResponse} from '@angular/common/http'
import {catchError, map, of, switchMap, tap} from 'rxjs'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {Store} from '@ngrx/store'

import {IResponseItems} from '@shared/interfaces/response-items.interface'
import {dialogConfirmAction} from '@shared/store/actions/dialog.action'
import {responseToErrors} from '@shared/functions/error.function'
import {CategoriesService} from '@modules/admin/sections/docs/categories/services/categories.service'
import {
  getCategoriesAction,
  getCategoriesFailureAction,
  getCategoriesSuccessAction,
} from '@modules/admin/sections/docs/categories/store/actions/categories.action'
import {ICategory} from '@modules/admin/sections/docs/categories/interfaces/category.interface'

@Injectable()
export class GetCategoriesEffect {
  constructor(
    private actions$: Actions,
    private categoriesService: CategoriesService,
    private store: Store
  ) {}

  getCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getCategoriesAction),
      switchMap(({event, action}) => {
        return this.categoriesService.getCategories(event, action).pipe(
          map((response: IResponseItems<ICategory>) => {
            return getCategoriesSuccessAction({
              categories: {
                items: response.results,
                count: response.records,
                first: response.skip,
                // first: 0,
              },
            })
          }),
          catchError((response: HttpErrorResponse) => {
            return of(
              getCategoriesFailureAction({errors: responseToErrors(response)})
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
            getCategoriesAction({event: null, action: value.action})
          )
        })
      ),
    {dispatch: false}
  )
}
