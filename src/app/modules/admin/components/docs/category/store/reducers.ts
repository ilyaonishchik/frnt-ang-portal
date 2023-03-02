import {Action, createReducer, on} from '@ngrx/store'

import {ICategoryState} from '@modules/admin/components/docs/category/interfaces/category-state.interface'
import {routerNavigationAction} from '@ngrx/router-store'
import {
  createCategoryAction,
  createCategoryFailureAction,
  createCategorySuccessAction,
  deleteCategoryAction,
  deleteCategoryFailureAction,
  deleteCategorySuccessAction,
  getCategoryAction,
  getCategoryFailureAction,
  getCategorySuccessAction,
  updateCategoryAction,
  updateCategoryFailureAction,
  updateCategorySuccessAction,
} from '@modules/admin/components/docs/category/store/actions/category.action'
import {dialogCancelAction} from '@shared/store/actions/dialog.action'

export const categoryFeatureKey = 'docs-category'

const initialState: ICategoryState = {
  isLoading: false,
  isSubmitting: false,
  backendErrors: null,
  item: null,
}

const categoryReducer = createReducer(
  initialState,
  on(
    getCategoryAction,
    (state): ICategoryState => ({
      ...state,
      isLoading: true,
      item: null,
      backendErrors: null,
    })
  ),
  on(
    getCategorySuccessAction,
    (state, action): ICategoryState => ({
      ...state,
      isLoading: false,
      item: action.category,
    })
  ),
  on(
    getCategoryFailureAction,
    (state, action): ICategoryState => ({
      ...state,
      isLoading: false,
      backendErrors: action.errors,
    })
  ),
  on(
    createCategoryAction,
    (state, action): ICategoryState => ({
      ...state,
      isSubmitting: true,
      item: action.category,
      backendErrors: null,
    })
  ),
  on(
    createCategorySuccessAction,
    (state, action): ICategoryState => ({
      ...state,
      isSubmitting: false,
      item: action.category,
    })
  ),
  on(
    createCategoryFailureAction,
    (state, action): ICategoryState => ({
      ...state,
      isSubmitting: false,
      backendErrors: action.errors,
    })
  ),
  on(
    updateCategoryAction,
    (state, action): ICategoryState => ({
      ...state,
      isSubmitting: true,
      item: action.category,
      backendErrors: null,
    })
  ),
  on(
    updateCategorySuccessAction,
    (state, action): ICategoryState => ({
      ...state,
      isSubmitting: false,
      item: action.category,
    })
  ),
  on(
    updateCategoryFailureAction,
    (state, action): ICategoryState => ({
      ...state,
      isSubmitting: false,
      backendErrors: action.errors,
    })
  ),
  on(
    deleteCategoryAction,
    (state): ICategoryState => ({
      ...state,
      isSubmitting: true,
      backendErrors: null,
    })
  ),
  on(
    deleteCategorySuccessAction,
    (state): ICategoryState => ({
      ...state,
      isSubmitting: false,
    })
  ),
  on(
    deleteCategoryFailureAction,
    (state, action): ICategoryState => ({
      ...state,
      isSubmitting: false,
      backendErrors: action.errors,
    })
  ),
  on(
    dialogCancelAction,
    (state): ICategoryState => ({
      ...state,
      item: null,
      backendErrors: null,
    })
  ),
  on(routerNavigationAction, (): ICategoryState => initialState)
)

export function reducerCategory(state: ICategoryState, action: Action) {
  return categoryReducer(state, action)
}
