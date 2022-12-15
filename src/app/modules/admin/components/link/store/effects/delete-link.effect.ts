import {Injectable} from '@angular/core'
import {HttpErrorResponse} from '@angular/common/http'
import {catchError, map, of, switchMap, tap} from 'rxjs'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {Store} from '@ngrx/store'

import {LinkService} from '../../services/link.service'
import {responseToErrors} from '@shared/functions/error.function'
import {IDeleteResponse} from '@shared/interfaces/delete-response.interface'
import {
  deleteLinkAction,
  deleteLinkFailureAction,
  deleteLinkSuccessAction,
} from '../actions/link.action'
import {TCrudAction} from '@shared/types/crud-action.type'
import {dialogConfirmAction} from '@shared/store/actions/dialog.action'

@Injectable()
export class DeleteLinkEffect {
  constructor(
    private actions$: Actions,
    private linkService: LinkService,
    private store: Store
  ) {}

  deleteLink$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteLinkAction),
      switchMap(({id}) => {
        return this.linkService.deleteLink(id).pipe(
          map((response: IDeleteResponse) => {
            return deleteLinkSuccessAction({response: response})
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              deleteLinkFailureAction({
                errors: responseToErrors(errorResponse),
              })
            )
          })
        )
      })
    )
  )

  afterDeleteLink$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(deleteLinkSuccessAction),
        tap(() => {
          this.store.dispatch(dialogConfirmAction({action: TCrudAction.DELETE}))
        })
      ),
    {dispatch: false}
  )
}
