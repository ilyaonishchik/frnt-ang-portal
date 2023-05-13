import {Action, createReducer, on} from '@ngrx/store'
import {ISubdivisionType} from '@modules/admin/sections/catalog/subdivisions/interfaces/subdivision.interface'
import {IState} from '@shared/interfaces/state.interface'
import {
  clearSubdivisionTypesStateAction,
  getSubdivisionTypesAction,
  getSubdivisionTypesFailureAction,
  getSubdivisionTypesSuccessAction,
} from '@modules/admin/sections/catalog/subdivisions/store/actions/subdivision-types.action'
import {
  dialogCancelAction,
  dialogConfirmAction,
  dialogShowAction,
} from '@shared/store/actions/dialog.action'

export const subdivisionTypesFeatureKey = 'subdivisionTypes'

const initialState: IState<ISubdivisionType> = {
  isLoading: false,
  backendErrors: null,
  data: {items: [], count: 0, first: 0},
  crud: null,
}

const subdivisionTypesReducer = createReducer(
  initialState,
  on(
    getSubdivisionTypesAction,
    (state): IState<ISubdivisionType> => ({
      ...state,
      isLoading: true,
      backendErrors: null,
    })
  ),
  on(
    getSubdivisionTypesSuccessAction,
    (state, action): IState<ISubdivisionType> => ({
      ...state,
      isLoading: false,
      data: action.data,
    })
  ),
  on(
    getSubdivisionTypesFailureAction,
    (state, action): IState<ISubdivisionType> => ({
      ...state,
      isLoading: false,
      backendErrors: action.errors,
    })
  ),
  on(
    dialogShowAction,
    (state, action): IState<ISubdivisionType> => ({
      ...state,
      crud: action.crud,
    })
  ),
  on(
    dialogConfirmAction,
    (state): IState<ISubdivisionType> => ({
      ...state,
      crud: null,
    })
  ),
  on(
    dialogCancelAction,
    (state): IState<ISubdivisionType> => ({
      ...state,
      crud: null,
      backendErrors: null,
    })
  ),
  on(
    clearSubdivisionTypesStateAction,
    (): IState<ISubdivisionType> => initialState
  )
)

export function reducerSubdivisionTypes(
  state: IState<ISubdivisionType>,
  action: Action
) {
  return subdivisionTypesReducer(state, action)
}
