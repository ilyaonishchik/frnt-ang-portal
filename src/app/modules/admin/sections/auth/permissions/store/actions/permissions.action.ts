import {createAction, props} from '@ngrx/store'

import {LazyLoadEvent} from 'primeng/api'

import {ActionTypes} from '../actionTypes'
import {IPermission} from 'src/app/shared/interfaces/permission.interface'

export const getPermissionsAction = createAction(
  ActionTypes.GET_PERMISSIONS,
  props<{event: LazyLoadEvent}>()
)

export const getPermissionsSuccessAction = createAction(
  ActionTypes.GET_PERMISSIONS_SUCCESS,
  props<{items: IPermission[]; count: number}>()
)

export const getPermissionsFailureAction = createAction(
  ActionTypes.GET_PERMISSIONS_FAILURE
)
