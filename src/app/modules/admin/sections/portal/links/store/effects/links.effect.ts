import {Injectable} from '@angular/core'
import {HttpErrorResponse} from '@angular/common/http'
import {catchError, map, of, switchMap, tap} from 'rxjs'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {Store} from '@ngrx/store'

import {LinksService} from '../../services/links.service'
import {
  getLinksAction,
  getLinksFailureAction,
  getLinksSuccessAction,
} from '../actions/links.action'
import {IResponseItems} from '@shared/interfaces/response-items.interface'
import {dialogConfirmAction} from '@shared/store/actions/dialog.action'
import {responseToErrors} from '@shared/functions/error.function'
import {ILink} from '../../interfaces/link.interface'

@Injectable()
export class GetLinksEffect {
  constructor(
    private actions$: Actions,
    private linksService: LinksService,
    private store: Store
  ) {}

  getLinks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getLinksAction),
      switchMap(({event, action}) => {
        return this.linksService.getLinks(event, action).pipe(
          map((response: IResponseItems<ILink>) => {
            return getLinksSuccessAction({
              links: {
                items: response.results,
                count: response.records,
                first: response.skip,
              },
            })
          }),
          catchError((response: HttpErrorResponse) => {
            return of(
              getLinksFailureAction({errors: responseToErrors(response)})
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
            getLinksAction({event: null, action: value.action})
          )
        })
      ),
    {dispatch: false}
  )
}
