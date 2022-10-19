import {createAction, props} from '@ngrx/store'

import {LazyLoadEvent} from 'primeng/api'

import {ActionTypes} from '../actionTypes'
import {IPermission} from 'src/app/shared/interfaces/permission.interface'
import {ITableItems} from 'src/app/shared/interfaces/table-items.interface'

export const getPermissionsAction = createAction(
  ActionTypes.GET_PERMISSIONS,
  props<{event: LazyLoadEvent | null}>()
)

export const getPermissionsSuccessAction = createAction(
  ActionTypes.GET_PERMISSIONS_SUCCESS,
  props<{permissions: ITableItems<IPermission>}>()
)

export const getPermissionsFailureAction = createAction(
  ActionTypes.GET_PERMISSIONS_FAILURE
)
