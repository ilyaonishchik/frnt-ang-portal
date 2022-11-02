import {createAction, props} from '@ngrx/store'

import {ActionTypes} from '../actionTypes'
import {IRole, IRoleSave} from 'src/app/shared/interfaces/role.interface'
import {IBackendErrors} from 'src/app/shared/interfaces/backend-errors.interface'
import {IDeleteResponse} from 'src/app/shared/interfaces/delete-response.interface'

export const getRoleAction = createAction(
  ActionTypes.GET_ROLE,
  props<{id: number}>()
)

export const getRoleSuccessAction = createAction(
  ActionTypes.GET_ROLE_SUCCESS,
  props<{role: IRole}>()
)

export const getRoleFailureAction = createAction(
  ActionTypes.GET_ROLE_FAILURE,
  props<{errors: IBackendErrors}>()
)

export const createRoleAction = createAction(
  ActionTypes.CREATE_ROLE,
  props<{role: IRole}>()
)

export const createRoleSuccessAction = createAction(
  ActionTypes.CREATE_ROLE_SUCCESS,
  props<{role: IRole}>()
)

export const createRoleFailureAction = createAction(
  ActionTypes.CREATE_ROLE_FAILURE,
  props<{errors: IBackendErrors}>()
)

export const updateRoleAction = createAction(
  ActionTypes.UPDATE_ROLE,
  props<{id: number; role: IRoleSave}>()
)

export const updateRoleSuccessAction = createAction(
  ActionTypes.UPDATE_ROLE_SUCCESS,
  props<{role: IRole}>()
)

export const updateRoleFailureAction = createAction(
  ActionTypes.UPDATE_ROLE_FAILURE,
  props<{errors: IBackendErrors}>()
)

export const deleteRoleAction = createAction(
  ActionTypes.DELETE_ROLE,
  props<{id: number}>()
)

export const deleteRoleSuccessAction = createAction(
  ActionTypes.DELETE_ROLE_SUCCESS,
  props<{response: IDeleteResponse}>()
)

export const deleteRoleFailureAction = createAction(
  ActionTypes.DELETE_ROLE_FAILURE,
  props<{errors: IBackendErrors}>()
)
