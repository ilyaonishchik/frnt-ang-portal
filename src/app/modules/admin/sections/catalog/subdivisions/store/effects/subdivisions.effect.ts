import {Injectable} from '@angular/core'
import {HttpErrorResponse} from '@angular/common/http'
import {catchError, map, of, switchMap, tap} from 'rxjs'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {Store} from '@ngrx/store'

import {IResponseItems} from '@shared/interfaces/response-items.interface'
import {dialogConfirmAction} from '@shared/store/actions/dialog.action'
import {responseToErrors} from '@shared/functions/error.function'
import {SubdivisionsService} from '@modules/admin/sections/catalog/subdivisions/services/subdivisions.service'
import {
  getSubdivisionsAction,
  getSubdivisionsFailureAction,
  getSubdivisionsSuccessAction,
} from '@modules/admin/sections/catalog/subdivisions/store/actions/subdivisions.action'
import {ISubdivision} from '@modules/admin/sections/catalog/subdivisions/interfaces/subdivision.interface'

@Injectable()
export class GetSubdivisionsEffect {
  constructor(
    private actions$: Actions,
    private subdivisionsService: SubdivisionsService,
    private store: Store
  ) {}

  getSubdivisions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getSubdivisionsAction),
      switchMap(({event, action}) => {
        return this.subdivisionsService.getSubdivisions(event, action).pipe(
          map((response: IResponseItems<ISubdivision>) => {
            return getSubdivisionsSuccessAction({
              subdivisions: {
                items: response.results,
                count: response.records,
                first: response.skip,
              },
            })
          }),
          catchError((response: HttpErrorResponse) => {
            return of(
              getSubdivisionsFailureAction({errors: responseToErrors(response)})
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
            getSubdivisionsAction({event: null, action: value.action})
          )
        })
      ),
    {dispatch: false}
  )
}
