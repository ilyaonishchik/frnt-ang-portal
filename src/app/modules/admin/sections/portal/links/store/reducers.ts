import {Action, createReducer, on} from '@ngrx/store'

import {
  getLinksAction,
  getLinksSuccessAction,
  getLinksFailureAction,
  clearLinksStateAction,
} from './actions/links.action'
import {
  dialogCancelAction,
  dialogConfirmAction,
  dialogShowAction,
} from '@shared/store/actions/dialog.action'
import {ILinksState} from '../interfaces/links-state.interface'

export const linksFeatureKey = 'links'

const initialState: ILinksState = {
  isLoading: false,
  backendErrors: null,
  data: {items: [], count: 0, first: 0},
  crud: null,
}

const linksReducer = createReducer(
  initialState,
  on(
    getLinksAction,
    (state): ILinksState => ({
      ...state,
      isLoading: true,
      backendErrors: null,
    })
  ),
  on(
    getLinksSuccessAction,
    (state, action): ILinksState => ({
      ...state,
      isLoading: false,
      data: action.links,
    })
  ),
  on(
    getLinksFailureAction,
    (state, action): ILinksState => ({
      ...state,
      isLoading: false,
      backendErrors: action.errors,
    })
  ),
  on(
    dialogShowAction,
    (state, action): ILinksState => ({
      ...state,
      crud: action.crud,
    })
  ),
  on(
    dialogConfirmAction,
    (state): ILinksState => ({
      ...state,
      crud: null,
    })
  ),
  on(
    dialogCancelAction,
    (state): ILinksState => ({
      ...state,
      crud: null,
      backendErrors: null,
    })
  ),
  on(clearLinksStateAction, (): ILinksState => initialState)
)

export function reducerLinks(state: ILinksState, action: Action) {
  return linksReducer(state, action)
}
