import {Action, createReducer, on} from '@ngrx/store'

import {
  getMenusAction,
  getMenusSuccessAction,
  getMenusFailureAction,
  clearMenusStateAction,
} from './actions/menus.action'
import {
  dialogCancelAction,
  dialogConfirmAction,
  dialogShowAction,
} from '@shared/store/actions/dialog.action'
import {IMenusState} from '../interfaces/menus-state.interface'

export const menusFeatureKey = 'menus'

const initialState: IMenusState = {
  isLoading: false,
  backendErrors: null,
  data: {items: [], count: 0, first: 0},
  crud: null,
}

const menusReducer = createReducer(
  initialState,
  on(
    getMenusAction,
    (state): IMenusState => ({
      ...state,
      isLoading: true,
      backendErrors: null,
    })
  ),
  on(
    getMenusSuccessAction,
    (state, action): IMenusState => ({
      ...state,
      isLoading: false,
      data: action.menus,
    })
  ),
  on(
    getMenusFailureAction,
    (state, action): IMenusState => ({
      ...state,
      isLoading: false,
      backendErrors: action.errors,
    })
  ),
  on(
    dialogShowAction,
    (state, action): IMenusState => ({
      ...state,
      crud: action.crud,
    })
  ),
  on(
    dialogConfirmAction,
    (state): IMenusState => ({
      ...state,
      crud: null,
    })
  ),
  on(
    dialogCancelAction,
    (state): IMenusState => ({
      ...state,
      crud: null,
      backendErrors: null,
    })
  ),
  on(clearMenusStateAction, (): IMenusState => initialState)
)

export function reducerMenus(state: IMenusState, action: Action) {
  return menusReducer(state, action)
}
