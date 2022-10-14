import {createAction, props} from '@ngrx/store'

import {LazyLoadEvent} from 'primeng/api'

import {ActionTypes} from '../actionTypes'
import {IPermission} from 'src/app/shared/interfaces/permission.interface'
import {IPermissions} from '../../interfaces/permissions.interface'

export const getPermissionsAction = createAction(
  ActionTypes.GET_PERMISSIONS,
  props<{event: LazyLoadEvent}>()
)

export const getPermissionsSuccessAction = createAction(
  ActionTypes.GET_PERMISSIONS_SUCCESS,
  props<{permissions: IPermissions}>()
)

export const getPermissionsFailureAction = createAction(
  ActionTypes.GET_PERMISSIONS_FAILURE
)

export const createPermissionAction = createAction(
  ActionTypes.PERMISSION_CREATE
)

export const updatePermissionAction = createAction(
  ActionTypes.PERMISSION_UPDATE,
  props<{item: IPermission}>()
)

export const deletePermissionAction = createAction(
  ActionTypes.PERMISSION_DELETE,
  props<{item: IPermission}>()
)

export const savePermissionAction = createAction(
  ActionTypes.PERMISSION_SAVE,
  props<{item: IPermission}>()
)

export const deletePermissionConfirmAction = createAction(
  ActionTypes.PERMISSION_DELETE_CONFIRM
)

export const deletePermissionCancelAction = createAction(
  ActionTypes.PERMISSION_DELETE_CANCEL
)

export const hidePermissionDialogAction = createAction(
  ActionTypes.PERMISSION_DIALOG_HIDE
)
