import {createAction, props} from '@ngrx/store'

import {RoleActionTypes} from '../actionTypes'
import {IRole} from '@shared/interfaces/role.interface'
import {IBackendErrors} from '@shared/interfaces/backend-errors.interface'
import {IDeleteResponse} from '@shared/interfaces/delete-response.interface'

export const getRoleAction = createAction(
  RoleActionTypes.GET_ROLE,
  props<{id: number}>()
)

export const getRoleSuccessAction = createAction(
  RoleActionTypes.GET_ROLE_SUCCESS,
  props<{role: IRole}>()
)

export const getRoleFailureAction = createAction(
  RoleActionTypes.GET_ROLE_FAILURE,
  props<{errors: IBackendErrors}>()
)

export const createRoleAction = createAction(
  RoleActionTypes.CREATE_ROLE,
  props<{role: IRole}>()
)

export const createRoleSuccessAction = createAction(
  RoleActionTypes.CREATE_ROLE_SUCCESS,
  props<{role: IRole}>()
)

export const createRoleFailureAction = createAction(
  RoleActionTypes.CREATE_ROLE_FAILURE,
  props<{errors: IBackendErrors}>()
)

export const updateRoleAction = createAction(
  RoleActionTypes.UPDATE_ROLE,
  props<{id: number; role: IRole}>()
)

export const updateRoleSuccessAction = createAction(
  RoleActionTypes.UPDATE_ROLE_SUCCESS,
  props<{role: IRole}>()
)

export const updateRoleFailureAction = createAction(
  RoleActionTypes.UPDATE_ROLE_FAILURE,
  props<{errors: IBackendErrors}>()
)

export const deleteRoleAction = createAction(
  RoleActionTypes.DELETE_ROLE,
  props<{id: number}>()
)

export const deleteRoleSuccessAction = createAction(
  RoleActionTypes.DELETE_ROLE_SUCCESS,
  props<{response: IDeleteResponse}>()
)

export const deleteRoleFailureAction = createAction(
  RoleActionTypes.DELETE_ROLE_FAILURE,
  props<{errors: IBackendErrors}>()
)
