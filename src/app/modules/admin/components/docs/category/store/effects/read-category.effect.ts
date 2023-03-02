import {Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {HttpErrorResponse} from '@angular/common/http'
import {catchError, map, of, switchMap} from 'rxjs'

import {CategoryService} from '@modules/admin/components/docs/category/services/category.service'
import {
  getCategoryAction,
  getCategoryFailureAction,
  getCategorySuccessAction,
} from '@modules/admin/components/docs/category/store/actions/category.action'
import {ICategory} from '@modules/admin/sections/docs/categories/interfaces/category.interface'
import {responseToErrors} from '@shared/functions/error.function'

@Injectable()
export class ReadCategoryEffect {
  constructor(
    private actions$: Actions,
    private categoryService: CategoryService
  ) {}

  getCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getCategoryAction),
      switchMap(({id}) => {
        return this.categoryService.getCategory(id).pipe(
          map((category: ICategory) => {
            return getCategorySuccessAction({category: category})
          }),
          catchError((response: HttpErrorResponse) => {
            return of(
              getCategoryFailureAction({errors: responseToErrors(response)})
            )
          })
        )
      })
    )
  )
}
