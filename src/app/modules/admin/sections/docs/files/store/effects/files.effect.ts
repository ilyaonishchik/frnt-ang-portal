import {Injectable} from '@angular/core'
import {HttpErrorResponse} from '@angular/common/http'
import {catchError, map, of, switchMap, tap} from 'rxjs'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {Store} from '@ngrx/store'

import {IResponseItems} from '@shared/interfaces/response-items.interface'
import {dialogConfirmAction} from '@shared/store/actions/dialog.action'
import {responseToErrors} from '@shared/functions/error.function'
import {FilesService} from '@modules/admin/sections/docs/files/services/files.service'
import {
  getFilesAction,
  getFilesFailureAction,
  getFilesSuccessAction,
} from '@modules/admin/sections/docs/files/store/actions/files.action'
import {IFile} from '@modules/admin/sections/docs/files/interfaces/file.interface'

@Injectable()
export class GetFilesEffect {
  constructor(
    private actions$: Actions,
    private filesService: FilesService,
    private store: Store
  ) {}

  getFiles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getFilesAction),
      switchMap(({event, action}) => {
        return this.filesService.getFiles(event, action).pipe(
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
              getFilesFailureAction({errors: responseToErrors(response)})
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
            getFilesAction({event: null, action: value.action})
          )
        })
      ),
    {dispatch: false}
  )
}
