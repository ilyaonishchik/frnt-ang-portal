import {createAction, props} from '@ngrx/store'

import {LazyLoadEvent} from 'primeng/api'

import {ActionTypes} from '../actionTypes'
import {IRoles} from '../../interfaces/roles.interface'

export const getRolesAction = createAction(
  ActionTypes.GET_ROLES,
  props<{event: LazyLoadEvent}>()
)

export const getRolesSuccessAction = createAction(
  ActionTypes.GET_ROLES_SUCCESS,
  props<{roles: IRoles}>()
)

export const getRolesFailureAction = createAction(ActionTypes.GET_ROLES_FAILURE)
