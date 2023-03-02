import {Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {Store} from '@ngrx/store'

import {CategoryService} from '@modules/admin/components/docs/category/services/category.service'
import {catchError, map, of, switchMap, tap} from 'rxjs'
import {IDeleteResponse} from '@shared/interfaces/delete-response.interface'
import {HttpErrorResponse} from '@angular/common/http'
import {responseToErrors} from '@shared/functions/error.function'
import {dialogConfirmAction} from '@shared/store/actions/dialog.action'
import {TCrudAction} from '@shared/types/crud-action.type'
import {
  deleteCategoryAction,
  deleteCategoryFailureAction,
  deleteCategorySuccessAction,
} from '@modules/admin/components/docs/category/store/actions/category.action'

@Injectable()
export class DeleteCategoryEffect {
  constructor(
    private actions$: Actions,
    private categoryService: CategoryService,
    private store: Store
  ) {}

  deleteCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteCategoryAction),
      switchMap(({id}) => {
        return this.categoryService.deleteCategory(id).pipe(
          map((response: IDeleteResponse) => {
            return deleteCategorySuccessAction({response: response})
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              deleteCategoryFailureAction({
                errors: responseToErrors(errorResponse),
              })
            )
          })
        )
      })
    )
  )

  afterDeleteCategory$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(deleteCategorySuccessAction),
        tap(() => {
          this.store.dispatch(dialogConfirmAction({action: TCrudAction.DELETE}))
        })
      ),
    {dispatch: false}
  )
}
