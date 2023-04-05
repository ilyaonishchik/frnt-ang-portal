import {createAction, props} from '@ngrx/store'

import {LazyLoadEvent} from 'primeng/api'

import {ITableItems} from '@shared/interfaces/table-items.interface'
import {IBackendErrors} from '@shared/interfaces/backend-errors.interface'
import {SubdivisionsActionTypes} from '@modules/admin/sections/catalog/subdivisions/store/actionTypes'
import {ISubdivision} from '@modules/admin/sections/catalog/subdivisions/interfaces/subdivision.interface'

export const getSubdivisionsAction = createAction(
  SubdivisionsActionTypes.GET_SUBDIVISIONS,
  props<{event: LazyLoadEvent | null; action: number}>()
)

export const getSubdivisionsSuccessAction = createAction(
  SubdivisionsActionTypes.GET_SUBDIVISIONS_SUCCESS,
  props<{subdivisions: ITableItems<ISubdivision>}>()
)

export const getSubdivisionsFailureAction = createAction(
  SubdivisionsActionTypes.GET_SUBDIVISIONS_FAILURE,
  props<{errors: IBackendErrors}>()
)

export const clearSubdivisionsStateAction = createAction(
  SubdivisionsActionTypes.CLEAR_STATE
)
