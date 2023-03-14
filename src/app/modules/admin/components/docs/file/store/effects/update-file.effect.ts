import {Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {Store} from '@ngrx/store'

import {catchError, map, of, switchMap, tap} from 'rxjs'
import {HttpErrorResponse} from '@angular/common/http'
import {responseToErrors} from '@shared/functions/error.function'
import {dialogConfirmAction} from '@shared/store/actions/dialog.action'
import {TCrudAction} from '@shared/types/crud-action.type'
import {FileService} from '@modules/admin/components/docs/file/services/file.service'
import {
  updateFileAction,
  updateFileFailureAction,
  updateFileSuccessAction,
} from '@modules/admin/components/docs/file/store/actions/file.action'
import {IFile} from '@modules/admin/sections/docs/files/interfaces/file.interface'

@Injectable()
export class UpdateFileEffect {
  constructor(
    private actions$: Actions,
    private fileService: FileService,
    private store: Store
  ) {}

  updateFile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateFileAction),
      switchMap(({id, file}) => {
        return this.fileService.updateFile(id, file).pipe(
          map((file: IFile) => {
            return updateFileSuccessAction({file: file})
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              updateFileFailureAction({
                errors: responseToErrors(errorResponse),
              })
            )
          })
        )
      })
    )
  )

  afterUpdateFile$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateFileSuccessAction),
        tap(() => {
          this.store.dispatch(dialogConfirmAction({action: TCrudAction.UPDATE}))
        })
      ),
    {dispatch: false}
  )
}
