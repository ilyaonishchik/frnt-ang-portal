import {Injectable} from '@angular/core'
import {HttpErrorResponse} from '@angular/common/http'
import {catchError, map, of, switchMap, tap} from 'rxjs'
import {Actions, createEffect, ofType} from '@ngrx/effects'

import {responseToErrors} from '@shared/functions/error.function'
import {SortingService} from '../../services/sorting.service'
import {SerialService} from '@shared/services/serial.service'
import {
  clearCellsAction,
  getCellsAction,
  getCellsFailureAction,
  getCellsSuccessAction,
} from '../actions/cells.action'
import {ICell} from '../../interfaces/cell.interface'

@Injectable()
export class GetCellsEffect {
  constructor(
    private actions$: Actions,
    private sortingService: SortingService,
    private serialService: SerialService
  ) {}

  getCells$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getCellsAction),
      switchMap(({invoice, digitsExist}) => {
        return this.sortingService.getCells(invoice).pipe(
          map((response: ICell[]) => {
            if (digitsExist) {
              this.updateCells(response)
            }
            return getCellsSuccessAction({
              cells: response,
            })
          }),
          catchError((response: HttpErrorResponse) => {
            return of(
              getCellsFailureAction({errors: responseToErrors(response)})
            )
          })
        )
      })
    )
  )

  clearCells$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(clearCellsAction),
        tap((value) => {
          if (value.digitsExist) {
            this.serialService.clearDigits().then()
          }
        })
      ),
    {dispatch: false}
  )

  updateCells(cells: ICell[]): void {
    if (cells) {
      const lines: string[] = []
      for (const cellKey in cells) {
        if (cells[cellKey].cell) {
          lines.push(`;${cells[cellKey].cell}-${cells[cellKey].nom_count}`)
        }
      }
      lines.unshift('#')
      this.serialService.sendData(lines).then()
    } else {
      this.serialService.clearDigits().then()
    }
  }
}
