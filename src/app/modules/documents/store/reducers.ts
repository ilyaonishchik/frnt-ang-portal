import {Action, createReducer, on} from '@ngrx/store'
import {routerNavigationAction} from '@ngrx/router-store'

import {IDocsState} from '@modules/documents/interfaces/docs-state.interface'
import {
  getCategoriesAction,
  getCategoriesFailureAction,
  getCategoriesSuccessAction,
  getFilesAction,
  getFilesFailureAction,
  getFilesSuccessAction,
} from '@modules/documents/store/actions/docs.actions'

export const docsFeatureKey = 'docs'

const initialState: IDocsState = {
  isLoading: false,
  backendErrors: null,
  categories: null,
  files: {items: [], count: 0, first: 0},
}

const docsReducer = createReducer(
  initialState,
  on(
    getCategoriesAction,
    (state): IDocsState => ({
      ...state,
      isLoading: true,
      backendErrors: null,
      categories: null,
    })
  ),
  on(
    getCategoriesSuccessAction,
    (state, action): IDocsState => ({
      ...state,
      isLoading: false,
      backendErrors: null,
      categories: action.categories,
    })
  ),
  on(
    getCategoriesFailureAction,
    (state, action): IDocsState => ({
      ...state,
      isLoading: false,
      backendErrors: action.errors,
      categories: null,
    })
  ),
  on(
    getFilesAction,
    (state): IDocsState => ({
      ...state,
      isLoading: true,
      backendErrors: null,
      files: {items: [], count: 0, first: 0},
    })
  ),
  on(
    getFilesSuccessAction,
    (state, action): IDocsState => ({
      ...state,
      isLoading: false,
      backendErrors: null,
      files: action.files,
    })
  ),
  on(
    getFilesFailureAction,
    (state, action): IDocsState => ({
      ...state,
      isLoading: false,
      backendErrors: action.errors,
      files: {items: [], count: 0, first: 0},
    })
  ),
  on(routerNavigationAction, (): IDocsState => initialState)
)

export function reducerDocs(state: IDocsState, action: Action) {
  return docsReducer(state, action)
}
