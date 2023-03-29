import {createAction, props} from '@ngrx/store'

import {IBackendErrors} from '@shared/interfaces/backend-errors.interface'
import {IDeleteResponse} from '@shared/interfaces/delete-response.interface'
import {IMenu} from '@modules/admin/sections/portal/menus/interfaces/menu.interface'
import {MenuActionTypes} from '@modules/admin/components/portal/menu/store/actionTypes'

export const getMenuAction = createAction(
  MenuActionTypes.GET_MENU,
  props<{id: number}>()
)

export const getMenuSuccessAction = createAction(
  MenuActionTypes.GET_MENU_SUCCESS,
  props<{menu: IMenu}>()
)

export const getMenuFailureAction = createAction(
  MenuActionTypes.GET_MENU_FAILURE,
  props<{errors: IBackendErrors}>()
)

export const createMenuAction = createAction(
  MenuActionTypes.CREATE_MENU,
  props<{menu: IMenu}>()
)

export const createMenuSuccessAction = createAction(
  MenuActionTypes.CREATE_MENU_SUCCESS,
  props<{menu: IMenu}>()
)

export const createMenuFailureAction = createAction(
  MenuActionTypes.CREATE_MENU_FAILURE,
  props<{errors: IBackendErrors}>()
)

export const updateMenuAction = createAction(
  MenuActionTypes.UPDATE_MENU,
  props<{id: number; menu: IMenu}>()
)

export const updateMenuSuccessAction = createAction(
  MenuActionTypes.UPDATE_MENU_SUCCESS,
  props<{menu: IMenu}>()
)

export const updateMenuFailureAction = createAction(
  MenuActionTypes.UPDATE_MENU_FAILURE,
  props<{errors: IBackendErrors}>()
)

export const deleteMenuAction = createAction(
  MenuActionTypes.DELETE_MENU,
  props<{id: number}>()
)

export const deleteMenuSuccessAction = createAction(
  MenuActionTypes.DELETE_MENU_SUCCESS,
  props<{response: IDeleteResponse}>()
)

export const deleteMenuFailureAction = createAction(
  MenuActionTypes.DELETE_MENU_FAILURE,
  props<{errors: IBackendErrors}>()
)
