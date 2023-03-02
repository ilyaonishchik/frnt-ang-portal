import {Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {
  getCategoriesAction,
  getCategoriesFailureAction,
  getCategoriesSuccessAction,
} from '@modules/documents/store/actions/docs.actions'
import {catchError, map, of, switchMap} from 'rxjs'
import {DocsService} from '@modules/documents/services/docs.service'
import {HttpErrorResponse} from '@angular/common/http'
import {responseToErrors} from '@shared/functions/error.function'
import {ICategory} from '@modules/documents/interfaces/category.interface'

@Injectable()
export class GetDocsEffect {
  constructor(private actions$: Actions, private docsService: DocsService) {}

  getCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getCategoriesAction),
      switchMap(() => {
        return this.docsService.getCategories(0).pipe(
          map((response: ICategory[]) => {
            return getCategoriesSuccessAction({categories: response})
          }),
          catchError((response: HttpErrorResponse) => {
            return of(
              getCategoriesFailureAction({
                errors: responseToErrors(response),
              })
            )
          })
        )
      })
    )
  )
}
