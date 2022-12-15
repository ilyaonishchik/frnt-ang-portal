import {createAction, props} from '@ngrx/store'

import {LazyLoadEvent} from 'primeng/api'

import {MenusActionTypes} from '../actionTypes'
import {ITableItems} from '@shared/interfaces/table-items.interface'
import {IBackendErrors} from '@shared/interfaces/backend-errors.interface'
import {IMenu} from '../../interfaces/menu.interface'

export const getMenusAction = createAction(
  MenusActionTypes.GET_MENUS,
  props<{event: LazyLoadEvent | null; action: number}>()
)

export const getMenusSuccessAction = createAction(
  MenusActionTypes.GET_MENUS_SUCCESS,
  props<{menus: ITableItems<IMenu>}>()
)

export const getMenusFailureAction = createAction(
  MenusActionTypes.GET_MENUS_FAILURE,
  props<{errors: IBackendErrors}>()
)
