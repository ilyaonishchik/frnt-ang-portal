import {Injectable} from '@angular/core'
import {HttpErrorResponse} from '@angular/common/http'
import {catchError, map, of, switchMap, tap} from 'rxjs'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {Store} from '@ngrx/store'

import {LinkService} from '../../services/link.service'
import {
  updateLinkAction,
  updateLinkFailureAction,
  updateLinkSuccessAction,
} from '../actions/link.action'
import {responseToErrors} from '@shared/functions/error.function'
import {TCrudAction} from '@shared/types/crud-action.type'
import {dialogConfirmAction} from '@shared/store/actions/dialog.action'
import {ILink} from '../../../../sections/portal/links/interfaces/link.interface'

@Injectable()
export class UpdateLinkEffect {
  constructor(
    private actions$: Actions,
    private linkService: LinkService,
    private store: Store
  ) {}

  updateLink$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateLinkAction),
      switchMap(({id, link}) => {
        return this.linkService.updateLink(id, link).pipe(
          map((link: ILink) => {
            return updateLinkSuccessAction({link: link})
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              updateLinkFailureAction({
                errors: responseToErrors(errorResponse),
              })
            )
          })
        )
      })
    )
  )

  afterUpdateLink$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateLinkSuccessAction),
        tap(() => {
          this.store.dispatch(dialogConfirmAction({action: TCrudAction.UPDATE}))
        })
      ),
    {dispatch: false}
  )
}
