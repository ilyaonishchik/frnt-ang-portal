import {ICategoriesState} from '../interfaces/categories-state.interface'
import {Action, createReducer, on} from '@ngrx/store'

import {
  dialogCancelAction,
  dialogConfirmAction,
  dialogShowAction,
} from '@shared/store/actions/dialog.action'
import {
  clearCategoriesStateAction,
  getCategoriesAction,
  getCategoriesFailureAction,
  getCategoriesSuccessAction,
} from '@modules/admin/sections/docs/categories/store/actions/categories.action'

export const categoriesFeatureKey = 'categories'

const initialState: ICategoriesState = {
  isLoading: false,
  backendErrors: null,
  data: {items: [], count: 0, first: 0},
  crud: null,
}

const categoriesReducer = createReducer(
  initialState,
  on(
    getCategoriesAction,
    (state): ICategoriesState => ({
      ...state,
      isLoading: true,
      backendErrors: null,
    })
  ),
  on(
    getCategoriesSuccessAction,
    (state, action): ICategoriesState => ({
      ...state,
      isLoading: false,
      data: action.categories,
    })
  ),
  on(
    getCategoriesFailureAction,
    (state, action): ICategoriesState => ({
      ...state,
      isLoading: false,
      backendErrors: action.errors,
    })
  ),
  on(
    dialogShowAction,
    (state, action): ICategoriesState => ({
      ...state,
      crud: action.crud,
    })
  ),
  on(
    dialogConfirmAction,
    (state): ICategoriesState => ({
      ...state,
      crud: null,
    })
  ),
  on(
    dialogCancelAction,
    (state): ICategoriesState => ({
      ...state,
      crud: null,
      backendErrors: null,
    })
  ),
  on(clearCategoriesStateAction, (): ICategoriesState => initialState)
)

export function reducerCategories(state: ICategoriesState, action: Action) {
  return categoriesReducer(state, action)
}
