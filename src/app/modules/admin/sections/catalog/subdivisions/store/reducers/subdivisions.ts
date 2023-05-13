import {Action, createReducer, on} from '@ngrx/store'

import {
  dialogCancelAction,
  dialogConfirmAction,
  dialogShowAction,
} from '@shared/store/actions/dialog.action'
import {ISubdivisionsState} from '@modules/admin/sections/catalog/subdivisions/interfaces/subdivisions-state.interface'
import {
  clearSubdivisionsStateAction,
  getSubdivisionsAction,
  getSubdivisionsFailureAction,
  getSubdivisionsSuccessAction,
} from '@modules/admin/sections/catalog/subdivisions/store/actions/subdivisions.action'

export const subdivisionsFeatureKey = 'subdivisions'

const initialState: ISubdivisionsState = {
  isLoading: false,
  backendErrors: null,
  data: {items: [], count: 0, first: 0},
  crud: null,
}

const subdivisionsReducer = createReducer(
  initialState,
  on(
    getSubdivisionsAction,
    (state): ISubdivisionsState => ({
      ...state,
      isLoading: true,
      backendErrors: null,
    })
  ),
  on(
    getSubdivisionsSuccessAction,
    (state, action): ISubdivisionsState => ({
      ...state,
      isLoading: false,
      data: action.data,
    })
  ),
  on(
    getSubdivisionsFailureAction,
    (state, action): ISubdivisionsState => ({
      ...state,
      isLoading: false,
      backendErrors: action.errors,
    })
  ),
  on(
    dialogShowAction,
    (state, action): ISubdivisionsState => ({
      ...state,
      crud: action.crud,
    })
  ),
  on(
    dialogConfirmAction,
    (state): ISubdivisionsState => ({
      ...state,
      crud: null,
    })
  ),
  on(
    dialogCancelAction,
    (state): ISubdivisionsState => ({
      ...state,
      crud: null,
      backendErrors: null,
    })
  ),
  on(clearSubdivisionsStateAction, (): ISubdivisionsState => initialState)
)

export function reducerSubdivisions(state: ISubdivisionsState, action: Action) {
  return subdivisionsReducer(state, action)
}
