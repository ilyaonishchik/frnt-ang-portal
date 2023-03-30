import {Action, createReducer, on} from '@ngrx/store'

import {IPdpSrtState} from '../interfaces/pdp-srt-state.interface'
import {
  getPeriodicalsAction,
  getPeriodicalsFailureAction,
  getPeriodicalsSuccessAction,
} from './actions/periodicals.action'
import {
  clearCellsAction,
  clearPdpSrtStateAction,
  getCellsAction,
  getCellsFailureAction,
  getCellsSuccessAction,
} from './actions/cells.action'

export const pdpSrtFeatureKey = 'pdp-srt'

const initialState: IPdpSrtState = {
  isLoading: false,
  backendErrors: null,
  invoiceDate: null,
  periodicalList: null,
  cells: null,
}

const pdpSrtReducer = createReducer(
  initialState,
  on(
    getPeriodicalsAction,
    (state, action): IPdpSrtState => ({
      ...state,
      isLoading: true,
      backendErrors: null,
      invoiceDate: action.date,
      periodicalList: null,
      cells: null,
    })
  ),
  on(
    getPeriodicalsSuccessAction,
    (state, action): IPdpSrtState => ({
      ...state,
      isLoading: false,
      periodicalList:
        action.periodicals.length == 0 ? null : action.periodicals,
    })
  ),
  on(
    getPeriodicalsFailureAction,
    (state, action): IPdpSrtState => ({
      ...state,
      isLoading: false,
      backendErrors: action.errors,
    })
  ),
  on(
    getCellsAction,
    (state): IPdpSrtState => ({
      ...state,
      isLoading: true,
      backendErrors: null,
      cells: null,
    })
  ),
  on(
    getCellsSuccessAction,
    (state, action): IPdpSrtState => ({
      ...state,
      isLoading: false,
      cells: action.cells.length == 0 ? null : action.cells,
    })
  ),
  on(
    getCellsFailureAction,
    (state, action): IPdpSrtState => ({
      ...state,
      isLoading: false,
      backendErrors: action.errors,
    })
  ),
  on(
    clearCellsAction,
    (state): IPdpSrtState => ({
      ...state,
      isLoading: false,
      cells: null,
    })
  ),
  on(clearPdpSrtStateAction, () => initialState)
)

export function reducerPdpSrt(state: IPdpSrtState, action: Action) {
  return pdpSrtReducer(state, action)
}
