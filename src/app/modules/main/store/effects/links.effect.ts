import {Injectable} from '@angular/core'
import {HttpErrorResponse} from '@angular/common/http'
import {catchError, map, of, switchMap} from 'rxjs'
import {Actions, createEffect, ofType} from '@ngrx/effects'

import {responseToErrors} from '@shared/functions/error.function'
import {WelcomeService} from '../../services/welcome.service'
import {
  getLinksAction,
  getLinksFailureAction,
  getLinksSuccessAction,
} from '../actions/links.action'
import {ILink} from '../../interfaces/link.interface'

@Injectable()
export class GetLinksEffect {
  constructor(
    private actions$: Actions,
    private welcomeService: WelcomeService
  ) {}

  getLinks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getLinksAction),
      switchMap(() => {
        return this.welcomeService.getLinks().pipe(
          map((response: ILink[]) => {
            return getLinksSuccessAction({links: response})
          }),
          catchError((response: HttpErrorResponse) => {
            return of(
              getLinksFailureAction({
                errors: responseToErrors(response),
              })
            )
          })
        )
      })
    )
  )
}
