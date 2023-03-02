import {Action, createReducer, on} from '@ngrx/store'

import {IDocsState} from '@modules/documents/interfaces/docs-state.interface'
import {
  getCategoriesAction,
  getCategoriesFailureAction,
  getCategoriesSuccessAction,
} from '@modules/documents/store/actions/docs.actions'

export const docsFeatureKey = 'docs'

const initialState: IDocsState = {
  isLoading: false,
  backendErrors: null,
  categories: null,
  files: null,
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
  )
)

export function reducerDocs(state: IDocsState, action: Action) {
  return docsReducer(state, action)
}
