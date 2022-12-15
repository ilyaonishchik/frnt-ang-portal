import {Action, createReducer, on} from '@ngrx/store'

import {IMainState} from '../interfaces/main-state.interface'
import {
  getLinksAction,
  getLinksFailureAction,
  getLinksSuccessAction,
} from './actions/links.action'

export const mainFeatureKey = 'main'

const initialState: IMainState = {
  isLoading: false,
  backendErrors: null,
  links: null,
}

const mainReducer = createReducer(
  initialState,
  on(
    getLinksAction,
    (state): IMainState => ({
      ...state,
      isLoading: true,
      backendErrors: null,
    })
  ),
  on(
    getLinksSuccessAction,
    (state, action): IMainState => ({
      ...state,
      isLoading: false,
      links: action.links,
    })
  ),
  on(
    getLinksFailureAction,
    (state, action): IMainState => ({
      ...state,
      isLoading: false,
      backendErrors: action.errors,
    })
  )
)

export function reducerMain(state: IMainState, action: Action) {
  return mainReducer(state, action)
}
