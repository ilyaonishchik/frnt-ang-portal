import {createAction, props} from '@ngrx/store'

import {LazyLoadEvent} from 'primeng/api'

import {PermissionsActionTypes} from '../actionTypes'
import {IPermission} from '@shared/interfaces/permission.interface'
import {ITableItems} from '@shared/interfaces/table-items.interface'
import {IBackendErrors} from '@shared/interfaces/backend-errors.interface'

export const getPermissionsAction = createAction(
  PermissionsActionTypes.GET_PERMISSIONS,
  props<{event: LazyLoadEvent | null; action: number}>()
)

export const getPermissionsSuccessAction = createAction(
  PermissionsActionTypes.GET_PERMISSIONS_SUCCESS,
  props<{permissions: ITableItems<IPermission>}>()
)

export const getPermissionsFailureAction = createAction(
  PermissionsActionTypes.GET_PERMISSIONS_FAILURE,
  props<{errors: IBackendErrors}>()
)
