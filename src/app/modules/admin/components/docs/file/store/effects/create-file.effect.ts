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
  createFileAction,
  createFileFailureAction,
  createFileSuccessAction,
} from '@modules/admin/components/docs/file/store/actions/file.action'
import {IFile} from '@modules/admin/sections/docs/files/interfaces/file.interface'

@Injectable()
export class CreateFileEffect {
  constructor(
    private actions$: Actions,
    private fileService: FileService,
    private store: Store
  ) {}

  createFile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createFileAction),
      switchMap(({file}) => {
        return this.fileService.createFile(file).pipe(
          map((file: IFile) => {
            return createFileSuccessAction({file: file})
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              createFileFailureAction({
                errors: responseToErrors(errorResponse),
              })
            )
          })
        )
      })
    )
  )

  afterCreateFile$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(createFileSuccessAction),
        tap(() => {
          this.store.dispatch(dialogConfirmAction({action: TCrudAction.CREATE}))
        })
      ),
    {dispatch: false}
  )
}
