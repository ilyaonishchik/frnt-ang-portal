import {Action, createReducer, on} from '@ngrx/store'

import {ILinkState} from '../interfaces/link-state.interface'
import {
  getLinkAction,
  getLinkSuccessAction,
  getLinkFailureAction,
  createLinkAction,
  createLinkSuccessAction,
  createLinkFailureAction,
  updateLinkAction,
  updateLinkSuccessAction,
  updateLinkFailureAction,
  deleteLinkAction,
  deleteLinkSuccessAction,
  deleteLinkFailureAction,
} from './actions/link.action'
import {dialogCancelAction} from '@shared/store/actions/dialog.action'

export const linkFeatureKey = 'link'

const initialState: ILinkState = {
  isLoading: false,
  isSubmitting: false,
  backendErrors: null,
  item: null,
}

const linkReducer = createReducer(
  initialState,
  on(
    getLinkAction,
    (state): ILinkState => ({
      ...state,
      isLoading: true,
      item: null,
      backendErrors: null,
    })
  ),
  on(
    getLinkSuccessAction,
    (state, action): ILinkState => ({
      ...state,
      isLoading: false,
      item: action.link,
    })
  ),
  on(
    getLinkFailureAction,
    (state, action): ILinkState => ({
      ...state,
      isLoading: false,
      backendErrors: action.errors,
    })
  ),
  on(
    createLinkAction,
    (state, action): ILinkState => ({
      ...state,
      isSubmitting: true,
      item: action.link,
      backendErrors: null,
    })
  ),
  on(
    createLinkSuccessAction,
    (state, action): ILinkState => ({
      ...state,
      isSubmitting: false,
      item: action.link,
    })
  ),
  on(
    createLinkFailureAction,
    (state, action): ILinkState => ({
      ...state,
      isSubmitting: false,
      backendErrors: action.errors,
    })
  ),
  on(
    updateLinkAction,
    (state, action): ILinkState => ({
      ...state,
      isSubmitting: true,
      item: action.link,
      backendErrors: null,
    })
  ),
  on(
    updateLinkSuccessAction,
    (state, action): ILinkState => ({
      ...state,
      isSubmitting: false,
      item: action.link,
    })
  ),
  on(
    updateLinkFailureAction,
    (state, action): ILinkState => ({
      ...state,
      isSubmitting: false,
      backendErrors: action.errors,
    })
  ),
  on(
    deleteLinkAction,
    (state): ILinkState => ({
      ...state,
      isSubmitting: true,
      backendErrors: null,
    })
  ),
  on(
    deleteLinkSuccessAction,
    (state): ILinkState => ({
      ...state,
      isSubmitting: false,
    })
  ),
  on(
    deleteLinkFailureAction,
    (state, action): ILinkState => ({
      ...state,
      isSubmitting: false,
      backendErrors: action.errors,
    })
  ),
  on(dialogCancelAction, (): ILinkState => initialState)
)

export function reducerLink(state: ILinkState, action: Action) {
  return linkReducer(state, action)
}
