import {createAction, props} from '@ngrx/store'

import {DocsCategoryActionTypes} from '@modules/admin/components/docs/category/store/actionTypes'
import {ICategory} from '@modules/admin/sections/docs/categories/interfaces/category.interface'
import {IBackendErrors} from '@shared/interfaces/backend-errors.interface'
import {IDeleteResponse} from '@shared/interfaces/delete-response.interface'

export const getCategoryAction = createAction(
  DocsCategoryActionTypes.GET_DOCS_CATEGORY,
  props<{id: number}>()
)

export const getCategorySuccessAction = createAction(
  DocsCategoryActionTypes.GET_DOCS_CATEGORY_SUCCESS,
  props<{category: ICategory}>()
)

export const getCategoryFailureAction = createAction(
  DocsCategoryActionTypes.GET_DOCS_CATEGORY_FAILURE,
  props<{errors: IBackendErrors}>()
)

export const createCategoryAction = createAction(
  DocsCategoryActionTypes.CREATE_DOCS_CATEGORY,
  props<{category: ICategory}>()
)

export const createCategorySuccessAction = createAction(
  DocsCategoryActionTypes.CREATE_DOCS_CATEGORY_SUCCESS,
  props<{category: ICategory}>()
)

export const createCategoryFailureAction = createAction(
  DocsCategoryActionTypes.CREATE_DOCS_CATEGORY_FAILURE,
  props<{errors: IBackendErrors}>()
)

export const updateCategoryAction = createAction(
  DocsCategoryActionTypes.UPDATE_DOCS_CATEGORY,
  props<{id: number; category: ICategory}>()
)

export const updateCategorySuccessAction = createAction(
  DocsCategoryActionTypes.UPDATE_DOCS_CATEGORY_SUCCESS,
  props<{category: ICategory}>()
)

export const updateCategoryFailureAction = createAction(
  DocsCategoryActionTypes.UPDATE_DOCS_CATEGORY_FAILURE,
  props<{errors: IBackendErrors}>()
)

export const deleteCategoryAction = createAction(
  DocsCategoryActionTypes.DELETE_DOCS_CATEGORY,
  props<{id: number}>()
)

export const deleteCategorySuccessAction = createAction(
  DocsCategoryActionTypes.DELETE_DOCS_CATEGORY_SUCCESS,
  props<{response: IDeleteResponse}>()
)

export const deleteCategoryFailureAction = createAction(
  DocsCategoryActionTypes.DELETE_DOCS_CATEGORY_FAILURE,
  props<{errors: IBackendErrors}>()
)
