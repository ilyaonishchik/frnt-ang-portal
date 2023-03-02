import {createAction, props} from '@ngrx/store'

import {DocsActionTypes} from '@modules/documents/store/actionTypes'
import {IBackendErrors} from '@shared/interfaces/backend-errors.interface'
import {ICategory} from '@modules/documents/interfaces/category.interface'

export const getCategoriesAction = createAction(DocsActionTypes.GET_CATEGORIES)

export const getCategoriesSuccessAction = createAction(
  DocsActionTypes.GET_CATEGORIES_SUCCESS,
  props<{categories: ICategory[]}>()
)

export const getCategoriesFailureAction = createAction(
  DocsActionTypes.GET_CATEGORIES_FAILURE,
  props<{errors: IBackendErrors}>()
)
