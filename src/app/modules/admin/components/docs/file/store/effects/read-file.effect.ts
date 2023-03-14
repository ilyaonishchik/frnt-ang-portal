import {Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {HttpErrorResponse} from '@angular/common/http'
import {catchError, map, of, switchMap} from 'rxjs'

import {responseToErrors} from '@shared/functions/error.function'
import {FileService} from '@modules/admin/components/docs/file/services/file.service'
import {
  getFileAction,
  getFileFailureAction,
  getFileSuccessAction,
} from '@modules/admin/components/docs/file/store/actions/file.action'
import {IFile} from '@modules/admin/sections/docs/files/interfaces/file.interface'

@Injectable()
export class ReadFileEffect {
  constructor(private actions$: Actions, private fileService: FileService) {}

  getFile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getFileAction),
      switchMap(({id}) => {
        return this.fileService.getFile(id).pipe(
          map((file: IFile) => {
            return getFileSuccessAction({file: file})
          }),
          catchError((response: HttpErrorResponse) => {
            return of(
              getFileFailureAction({errors: responseToErrors(response)})
            )
          })
        )
      })
    )
  )
}
