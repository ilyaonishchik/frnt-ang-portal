import {Injectable} from '@angular/core'
import {HttpErrorResponse} from '@angular/common/http'
import {catchError, map, of, switchMap} from 'rxjs'
import {Actions, createEffect, ofType} from '@ngrx/effects'

import {responseToErrors} from '@shared/functions/error.function'
import {SortingService} from '../../services/sorting.service'
import {
  getPeriodicalsAction,
  getPeriodicalsFailureAction,
  getPeriodicalsSuccessAction,
} from '../actions/periodicals.action'
import {IPeriodical} from '../../interfaces/periodical.interface'

@Injectable()
export class GetPeriodicalsEffect {
  constructor(
    private actions$: Actions,
    private sortingService: SortingService
  ) {}

  getPeriodicals$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getPeriodicalsAction),
      switchMap(({subdivision, date}) => {
        if (subdivision > 0) {
          return this.sortingService.getPeriodicals(subdivision, date).pipe(
            map((response: IPeriodical[]) => {
              return getPeriodicalsSuccessAction({periodicals: response})
            }),
            catchError((response: HttpErrorResponse) => {
              return of(
                getPeriodicalsFailureAction({
                  errors: responseToErrors(response),
                })
              )
            })
          )
        } else {
          return of(
            getPeriodicalsFailureAction({
              errors: {_: 'Не указано подразделение пользователя'},
            })
          )
        }
      })
    )
  )
}
