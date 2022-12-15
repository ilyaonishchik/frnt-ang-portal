import {Injectable} from '@angular/core'
import {HttpErrorResponse} from '@angular/common/http'
import {catchError, map, of, switchMap} from 'rxjs'
import {Actions, createEffect, ofType} from '@ngrx/effects'

import {responseToErrors} from '@shared/functions/error.function'
import {PersistenceService} from '@shared/services/persistence.service'
import {SortingService} from '../../services/sorting.service'
import {
  getPeriodicalsAction,
  getPeriodicalsFailureAction,
  getPeriodicalsSuccessAction,
} from '../actions/periodicals.action'
import {IPeriodical} from '../../interfaces/periodical.interface'
import {IUser} from '@shared/interfaces/user.interface'

@Injectable()
export class GetPeriodicalsEffect {
  constructor(
    private actions$: Actions,
    private sortingService: SortingService,
    private persistenceService: PersistenceService
  ) {}

  getPeriodicals$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getPeriodicalsAction),
      switchMap(({date}) => {
        const user: IUser | null = this.persistenceService.getCurrentUser()
        if (user && user.sd_id) {
          return this.sortingService.getPeriodicals(user.sd_id, date).pipe(
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
