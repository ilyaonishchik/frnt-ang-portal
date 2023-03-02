import {Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {Store} from '@ngrx/store'

import {CategoryService} from '@modules/admin/components/docs/category/services/category.service'
import {catchError, map, of, switchMap, tap} from 'rxjs'
import {HttpErrorResponse} from '@angular/common/http'
import {responseToErrors} from '@shared/functions/error.function'
import {dialogConfirmAction} from '@shared/store/actions/dialog.action'
import {TCrudAction} from '@shared/types/crud-action.type'
import {
  updateCategoryAction,
  updateCategoryFailureAction,
  updateCategorySuccessAction,
} from '@modules/admin/components/docs/category/store/actions/category.action'
import {ICategory} from '@modules/admin/sections/docs/categories/interfaces/category.interface'

@Injectable()
export class UpdateCategoryEffect {
  constructor(
    private actions$: Actions,
    private categoryService: CategoryService,
    private store: Store
  ) {}

  updateCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateCategoryAction),
      switchMap(({id, category}) => {
        return this.categoryService.updateCategory(id, category).pipe(
          map((category: ICategory) => {
            return updateCategorySuccessAction({category: category})
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              updateCategoryFailureAction({
                errors: responseToErrors(errorResponse),
              })
            )
          })
        )
      })
    )
  )

  afterUpdateCategory$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateCategorySuccessAction),
        tap(() => {
          this.store.dispatch(dialogConfirmAction({action: TCrudAction.UPDATE}))
        })
      ),
    {dispatch: false}
  )
}
