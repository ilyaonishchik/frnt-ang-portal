import {Injectable} from '@angular/core'
import {HttpErrorResponse} from '@angular/common/http'
import {catchError, map, of, switchMap} from 'rxjs'
import {Actions, createEffect, ofType} from '@ngrx/effects'

import {LinkService} from '../../services/link.service'
import {
  getLinkAction,
  getLinkFailureAction,
  getLinkSuccessAction,
} from '../actions/link.action'
import {responseToErrors} from '@shared/functions/error.function'
import {ILink} from '../../../../../sections/portal/links/interfaces/link.interface'

@Injectable()
export class ReadLinkEffect {
  constructor(private actions$: Actions, private linkService: LinkService) {}

  getLink$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getLinkAction),
      switchMap(({id}) => {
        return this.linkService.getLink(id).pipe(
          map((link: ILink) => {
            return getLinkSuccessAction({link: link})
          }),
          catchError((response: HttpErrorResponse) => {
            return of(
              getLinkFailureAction({errors: responseToErrors(response)})
            )
          })
        )
      })
    )
  )
}
