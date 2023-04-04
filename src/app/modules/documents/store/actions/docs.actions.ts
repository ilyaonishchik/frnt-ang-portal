import {createAction, props} from '@ngrx/store'

import {DocsActionTypes} from '@modules/documents/store/actionTypes'
import {IBackendErrors} from '@shared/interfaces/backend-errors.interface'
import {ICategory} from '@modules/documents/interfaces/category.interface'
import {IFile} from '@modules/documents/interfaces/file.interface'
import {LazyLoadEvent} from 'primeng/api'
import {ITableItems} from '@shared/interfaces/table-items.interface'

export const getCategoriesAction = createAction(
  DocsActionTypes.GET_CATEGORIES,
  props<{category_id: number | string}>()
)

export const getCategoriesSuccessAction = createAction(
  DocsActionTypes.GET_CATEGORIES_SUCCESS,
  props<{categories: ICategory[]}>()
)

export const getCategoriesFailureAction = createAction(
  DocsActionTypes.GET_CATEGORIES_FAILURE,
  props<{errors: IBackendErrors}>()
)

export const getFilesAction = createAction(
  DocsActionTypes.GET_FILES,
  props<{
    event: LazyLoadEvent | null
    category_id: number | string
    use_cache: boolean
  }>()
)

export const getFilesSuccessAction = createAction(
  DocsActionTypes.GET_FILES_SUCCESS,
  props<{files: ITableItems<IFile>}>()
)

export const getFilesFailureAction = createAction(
  DocsActionTypes.GET_FILES_FAILURE,
  props<{errors: IBackendErrors}>()
)

export const clearDocsStateAction = createAction(DocsActionTypes.CLEAR_STATE)
