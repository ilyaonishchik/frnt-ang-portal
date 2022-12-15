import {createAction, props} from '@ngrx/store'

import {IBackendErrors} from '@shared/interfaces/backend-errors.interface'
import {PdpSrtActionTypes} from '../actionTypes'
import {ICell} from '../../interfaces/cell.interface'

export const getCellsAction = createAction(
  PdpSrtActionTypes.GET_CELLS,
  props<{invoice: number}>()
)

export const getCellsSuccessAction = createAction(
  PdpSrtActionTypes.GET_CELLS_SUCCESS,
  props<{cells: ICell[]}>()
)

export const getCellsFailureAction = createAction(
  PdpSrtActionTypes.GET_CELLS_FAILURE,
  props<{errors: IBackendErrors}>()
)

export const clearCellsAction = createAction(PdpSrtActionTypes.CLEAR_CELLS)
