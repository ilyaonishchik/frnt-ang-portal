import {Action, createReducer, on} from '@ngrx/store'
import {routerNavigationAction} from '@ngrx/router-store'

import {IMenuState} from '../interfaces/menu-state.interface'
import {
  getMenuAction,
  getMenuSuccessAction,
  getMenuFailureAction,
  createMenuAction,
  createMenuSuccessAction,
  createMenuFailureAction,
  updateMenuAction,
  updateMenuSuccessAction,
  updateMenuFailureAction,
  deleteMenuAction,
  deleteMenuSuccessAction,
  deleteMenuFailureAction,
} from './actions/menu.action'
import {dialogCancelAction} from '@shared/store/actions/dialog.action'

export const menuFeatureKey = 'menu'

const initialState: IMenuState = {
  isLoading: false,
  isSubmitting: false,
  backendErrors: null,
  item: null,
}

const menuReducer = createReducer(
  initialState,
  on(
    getMenuAction,
    (state): IMenuState => ({
      ...state,
      isLoading: true,
      item: null,
      backendErrors: null,
    })
  ),
  on(
    getMenuSuccessAction,
    (state, action): IMenuState => ({
      ...state,
      isLoading: false,
      item: action.menu,
    })
  ),
  on(
    getMenuFailureAction,
    (state, action): IMenuState => ({
      ...state,
      isLoading: false,
      backendErrors: action.errors,
    })
  ),
  on(
    createMenuAction,
    (state, action): IMenuState => ({
      ...state,
      isSubmitting: true,
      item: action.menu,
      backendErrors: null,
    })
  ),
  on(
    createMenuSuccessAction,
    (state, action): IMenuState => ({
      ...state,
      isSubmitting: false,
      item: action.menu,
    })
  ),
  on(
    createMenuFailureAction,
    (state, action): IMenuState => ({
      ...state,
      isSubmitting: false,
      backendErrors: action.errors,
    })
  ),
  on(
    updateMenuAction,
    (state, action): IMenuState => ({
      ...state,
      isSubmitting: true,
      item: action.menu,
      backendErrors: null,
    })
  ),
  on(
    updateMenuSuccessAction,
    (state, action): IMenuState => ({
      ...state,
      isSubmitting: false,
      item: action.menu,
    })
  ),
  on(
    updateMenuFailureAction,
    (state, action): IMenuState => ({
      ...state,
      isSubmitting: false,
      backendErrors: action.errors,
    })
  ),
  on(
    deleteMenuAction,
    (state): IMenuState => ({
      ...state,
      isSubmitting: true,
      backendErrors: null,
    })
  ),
  on(
    deleteMenuSuccessAction,
    (state): IMenuState => ({
      ...state,
      isSubmitting: false,
    })
  ),
  on(
    deleteMenuFailureAction,
    (state, action): IMenuState => ({
      ...state,
      isSubmitting: false,
      backendErrors: action.errors,
    })
  ),
  on(
    dialogCancelAction,
    (state): IMenuState => ({
      ...state,
      item: null,
      backendErrors: null,
    })
  ),
  on(routerNavigationAction, (): IMenuState => initialState)
)

export function reducerMenu(state: IMenuState, action: Action) {
  return menuReducer(state, action)
}
