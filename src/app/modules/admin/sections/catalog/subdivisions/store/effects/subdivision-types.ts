import {Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {Store} from '@ngrx/store'
import {SubdivisionsService} from '@modules/admin/sections/catalog/subdivisions/services/subdivisions.service'
import {
  getSubdivisionTypesAction,
  getSubdivisionTypesFailureAction,
  getSubdivisionTypesSuccessAction,
} from '@modules/admin/sections/catalog/subdivisions/store/actions/subdivision-types.action'
import {catchError, map, of, switchMap, tap} from 'rxjs'
import {responseToErrors} from '@shared/functions/error.function'
import {dialogConfirmAction} from '@shared/store/actions/dialog.action'

@Injectable()
export class GetSubdivisionTypesEffects {
  constructor(
    private actions$: Actions,
    private subdivisionsService: SubdivisionsService,
    private store: Store
  ) {}

  getSubdivisionTypes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getSubdivisionTypesAction),
      switchMap(({event, action}) => {
        return this.subdivisionsService.getSubdivisionTypes(event, action).pipe(
          map((response) => {
            return getSubdivisionTypesSuccessAction({
              data: {
                items: response.results,
                count: response.records,
                first: response.skip,
              },
            })
          }),
          catchError((response) => {
            return of(
              getSubdivisionTypesFailureAction({
                errors: responseToErrors(response),
              })
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
            getSubdivisionTypesAction({event: null, action: value.action})
          )
        })
      ),
    {dispatch: false}
  )
}
