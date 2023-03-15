import {Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {
  getCategoriesAction,
  getCategoriesFailureAction,
  getCategoriesSuccessAction,
  getFilesAction,
  getFilesFailureAction,
  getFilesSuccessAction,
} from '@modules/documents/store/actions/docs.actions'
import {catchError, map, of, switchMap} from 'rxjs'
import {DocsService} from '@modules/documents/services/docs.service'
import {HttpErrorResponse} from '@angular/common/http'
import {responseToErrors} from '@shared/functions/error.function'
import {ICategory} from '@modules/documents/interfaces/category.interface'
import {IFile} from '@modules/documents/interfaces/file.interface'
import {IResponseItems} from '@shared/interfaces/response-items.interface'

@Injectable()
export class GetDocsEffect {
  constructor(private actions$: Actions, private docsService: DocsService) {}

  getCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getCategoriesAction),
      switchMap(({category_id}) => {
        return this.docsService.getCategories(category_id).pipe(
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

  getFiles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getFilesAction),
      switchMap(({event, category_id}) => {
        return this.docsService.getFiles(event, category_id).pipe(
          map((response: IResponseItems<IFile>) => {
            return getFilesSuccessAction({
              files: {
                items: response.results,
                count: response.records,
                first: response.skip,
              },
            })
          }),
          catchError((response: HttpErrorResponse) => {
            return of(
              getFilesFailureAction({
                errors: responseToErrors(response),
              })
            )
          })
        )
      })
    )
  )
}
