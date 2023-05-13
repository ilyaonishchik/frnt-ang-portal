import {createAction, props} from '@ngrx/store'

import {LazyLoadEvent} from 'primeng/api'

import {ITableItems} from '@shared/interfaces/table-items.interface'
import {IBackendErrors} from '@shared/interfaces/backend-errors.interface'
import {ISubdivisionType} from '@modules/admin/sections/catalog/subdivisions/interfaces/subdivision.interface'
import {TCrudAction} from '@shared/types/crud-action.type'
import {SubdivisionTypesActionTypes} from './types'

export const getSubdivisionTypesAction = createAction(
  SubdivisionTypesActionTypes.GET_SUBDIVISION_TYPES,
  props<{event: LazyLoadEvent | null; action: TCrudAction}>()
)

export const getSubdivisionTypesSuccessAction = createAction(
  SubdivisionTypesActionTypes.GET_SUBDIVISION_TYPES_SUCCESS,
  props<{data: ITableItems<ISubdivisionType>}>()
)

export const getSubdivisionTypesFailureAction = createAction(
  SubdivisionTypesActionTypes.GET_SUBDIVISION_TYPES_FAILURE,
  props<{errors: IBackendErrors}>()
)

export const clearSubdivisionTypesStateAction = createAction(
  SubdivisionTypesActionTypes.CLEAR_STATE
)
