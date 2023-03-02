import {Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {Store} from '@ngrx/store'
import {catchError, map, of, switchMap, tap} from 'rxjs'
import {HttpErrorResponse} from '@angular/common/http'

import {CategoryService} from '@modules/admin/components/docs/category/services/category.service'
import {
  createCategoryAction,
  createCategoryFailureAction,
  createCategorySuccessAction,
} from '@modules/admin/components/docs/category/store/actions/category.action'
import {ICategory} from '@modules/admin/sections/docs/categories/interfaces/category.interface'
import {responseToErrors} from '@shared/functions/error.function'
import {dialogConfirmAction} from '@shared/store/actions/dialog.action'
import {TCrudAction} from '@shared/types/crud-action.type'

@Injectable()
export class CreateCategoryEffect {
  constructor(
    private actions$: Actions,
    private categoryService: CategoryService,
    private store: Store
  ) {}

  createCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createCategoryAction),
      switchMap(({category}) => {
        return this.categoryService.createCategory(category).pipe(
          map((category: ICategory) => {
            return createCategorySuccessAction({category: category})
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              createCategoryFailureAction({
                errors: responseToErrors(errorResponse),
              })
            )
          })
        )
      })
    )
  )

  afterCreateCategory$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(createCategorySuccessAction),
        tap(() => {
          this.store.dispatch(dialogConfirmAction({action: TCrudAction.CREATE}))
        })
      ),
    {dispatch: false}
  )
}
