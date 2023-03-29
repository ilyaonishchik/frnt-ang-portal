import {Injectable} from '@angular/core'
import {HttpErrorResponse} from '@angular/common/http'
import {catchError, map, of, switchMap, tap} from 'rxjs'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {Store} from '@ngrx/store'

import {LinkService} from '../../services/link.service'
import {
  createLinkAction,
  createLinkFailureAction,
  createLinkSuccessAction,
} from '../actions/link.action'
import {responseToErrors} from '@shared/functions/error.function'
import {TCrudAction} from '@shared/types/crud-action.type'
import {dialogConfirmAction} from '@shared/store/actions/dialog.action'
import {ILink} from '../../../../../sections/portal/links/interfaces/link.interface'

@Injectable()
export class CreateLinkEffect {
  constructor(
    private actions$: Actions,
    private linkService: LinkService,
    private store: Store
  ) {}

  createLink$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createLinkAction),
      switchMap(({link}) => {
        return this.linkService.createLink(link).pipe(
          map((link: ILink) => {
            return createLinkSuccessAction({link: link})
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              createLinkFailureAction({
                errors: responseToErrors(errorResponse),
              })
            )
          })
        )
      })
    )
  )

  afterCreateLink$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(createLinkSuccessAction),
        tap(() => {
          this.store.dispatch(dialogConfirmAction({action: TCrudAction.CREATE}))
        })
      ),
    {dispatch: false}
  )
}
