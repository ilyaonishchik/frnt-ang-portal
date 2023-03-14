import {createAction, props} from '@ngrx/store'

import {DocsFileActionTypes} from '@modules/admin/components/docs/file/store/actionTypes'
import {IFile} from '@modules/admin/sections/docs/files/interfaces/file.interface'
import {IBackendErrors} from '@shared/interfaces/backend-errors.interface'
import {IDeleteResponse} from '@shared/interfaces/delete-response.interface'

export const getFileAction = createAction(
  DocsFileActionTypes.GET_DOCS_FILE,
  props<{id: number}>()
)

export const getFileSuccessAction = createAction(
  DocsFileActionTypes.GET_DOCS_FILE_SUCCESS,
  props<{file: IFile}>()
)

export const getFileFailureAction = createAction(
  DocsFileActionTypes.GET_DOCS_FILE_FAILURE,
  props<{errors: IBackendErrors}>()
)

export const createFileAction = createAction(
  DocsFileActionTypes.CREATE_DOCS_FILE,
  props<{file: IFile}>()
)

export const createFileSuccessAction = createAction(
  DocsFileActionTypes.CREATE_DOCS_FILE_SUCCESS,
  props<{file: IFile}>()
)

export const createFileFailureAction = createAction(
  DocsFileActionTypes.CREATE_DOCS_FILE_FAILURE,
  props<{errors: IBackendErrors}>()
)

export const updateFileAction = createAction(
  DocsFileActionTypes.UPDATE_DOCS_FILE,
  props<{id: number; file: IFile}>()
)

export const updateFileSuccessAction = createAction(
  DocsFileActionTypes.UPDATE_DOCS_FILE_SUCCESS,
  props<{file: IFile}>()
)

export const updateFileFailureAction = createAction(
  DocsFileActionTypes.UPDATE_DOCS_FILE_FAILURE,
  props<{errors: IBackendErrors}>()
)

export const deleteFileAction = createAction(
  DocsFileActionTypes.DELETE_DOCS_FILE,
  props<{id: number}>()
)

export const deleteFileSuccessAction = createAction(
  DocsFileActionTypes.DELETE_DOCS_FILE_SUCCESS,
  props<{response: IDeleteResponse}>()
)

export const deleteFileFailureAction = createAction(
  DocsFileActionTypes.DELETE_DOCS_FILE_FAILURE,
  props<{errors: IBackendErrors}>()
)
