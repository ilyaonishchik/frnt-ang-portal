import {createAction, props} from '@ngrx/store'

import {LazyLoadEvent} from 'primeng/api'

import {FilesActionTypes} from '../actionTypes'
import {ITableItems} from '@shared/interfaces/table-items.interface'
import {IBackendErrors} from '@shared/interfaces/backend-errors.interface'
import {IFile} from '@modules/admin/sections/docs/files/interfaces/file.interface'

export const getFilesAction = createAction(
  FilesActionTypes.GET_FILES,
  props<{event: LazyLoadEvent | null; action: number}>()
)

export const getFilesSuccessAction = createAction(
  FilesActionTypes.GET_FILES_SUCCESS,
  props<{files: ITableItems<IFile>}>()
)

export const getFilesFailureAction = createAction(
  FilesActionTypes.GET_FILES_FAILURE,
  props<{errors: IBackendErrors}>()
)

export const clearFilesStateAction = createAction(FilesActionTypes.CLEAR_STATE)
