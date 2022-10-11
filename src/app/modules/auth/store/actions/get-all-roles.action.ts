import {createAction, props} from '@ngrx/store'

import {ActionTypes} from '../actionTypes'
import {IRole} from 'src/app/shared/interfaces/role.interface'

export const getAllRolesAction = createAction(ActionTypes.GET_ALL_ROLES)

export const getAllRolesSuccessAction = createAction(
  ActionTypes.GET_ALL_ROLES_SUCCESS,
  props<{roles: IRole[]}>()
)

export const getAllRolesFailureAction = createAction(
  ActionTypes.GET_ALL_ROLES_FAILURE
)
