import {createAction, props} from '@ngrx/store'

import {LazyLoadEvent} from 'primeng/api'

import {ITableItems} from '@shared/interfaces/table-items.interface'
import {IBackendErrors} from '@shared/interfaces/backend-errors.interface'
import {ISubdivision} from '@modules/admin/sections/catalog/subdivisions/interfaces/subdivision.interface'
import {TCrudAction} from '@shared/types/crud-action.type'
import {SubdivisionsActionTypes} from './types'

export const getSubdivisionsAction = createAction(
  SubdivisionsActionTypes.GET_SUBDIVISIONS,
  props<{event: LazyLoadEvent | null; action: TCrudAction}>()
)

export const getSubdivisionsSuccessAction = createAction(
  SubdivisionsActionTypes.GET_SUBDIVISIONS_SUCCESS,
  props<{data: ITableItems<ISubdivision>}>()
)

export const getSubdivisionsFailureAction = createAction(
  SubdivisionsActionTypes.GET_SUBDIVISIONS_FAILURE,
  props<{errors: IBackendErrors}>()
)

export const clearSubdivisionsStateAction = createAction(
  SubdivisionsActionTypes.CLEAR_STATE
)
