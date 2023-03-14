import {Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {Store} from '@ngrx/store'

import {catchError, map, of, switchMap, tap} from 'rxjs'
import {IDeleteResponse} from '@shared/interfaces/delete-response.interface'
import {HttpErrorResponse} from '@angular/common/http'
import {responseToErrors} from '@shared/functions/error.function'
import {dialogConfirmAction} from '@shared/store/actions/dialog.action'
import {TCrudAction} from '@shared/types/crud-action.type'
import {FileService} from '@modules/admin/components/docs/file/services/file.service'
import {
  deleteFileAction,
  deleteFileFailureAction,
  deleteFileSuccessAction,
} from '@modules/admin/components/docs/file/store/actions/file.action'

@Injectable()
export class DeleteFileEffect {
  constructor(
    private actions$: Actions,
    private fileService: FileService,
    private store: Store
  ) {}

  deleteFile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteFileAction),
      switchMap(({id}) => {
        return this.fileService.deleteFile(id).pipe(
          map((response: IDeleteResponse) => {
            return deleteFileSuccessAction({response: response})
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              deleteFileFailureAction({
                errors: responseToErrors(errorResponse),
              })
            )
          })
        )
      })
    )
  )

  afterDeleteFile$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(deleteFileSuccessAction),
        tap(() => {
          this.store.dispatch(dialogConfirmAction({action: TCrudAction.DELETE}))
        })
      ),
    {dispatch: false}
  )
}
