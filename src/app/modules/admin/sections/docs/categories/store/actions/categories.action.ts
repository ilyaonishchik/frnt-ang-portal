import {createAction, props} from '@ngrx/store'

import {LazyLoadEvent} from 'primeng/api'

import {CategoriesActionTypes} from '../actionTypes'
import {ITableItems} from '@shared/interfaces/table-items.interface'
import {IBackendErrors} from '@shared/interfaces/backend-errors.interface'
import {ICategory} from '@modules/admin/sections/docs/categories/interfaces/category.interface'

export const getCategoriesAction = createAction(
  CategoriesActionTypes.GET_CATEGORIES,
  props<{event: LazyLoadEvent | null; action: number}>()
)

export const getCategoriesSuccessAction = createAction(
  CategoriesActionTypes.GET_CATEGORIES_SUCCESS,
  props<{categories: ITableItems<ICategory>}>()
)

export const getCategoriesFailureAction = createAction(
  CategoriesActionTypes.GET_CATEGORIES_FAILURE,
  props<{errors: IBackendErrors}>()
)
