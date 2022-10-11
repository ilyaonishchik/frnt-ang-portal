import {createAction, props} from '@ngrx/store'

import {LazyLoadEvent} from 'primeng/api'

import {ActionTypes} from '../actionTypes'
import {IRole} from 'src/app/shared/interfaces/role.interface'

export const getRolesAction = createAction(
  ActionTypes.GET_ROLES,
  props<{event: LazyLoadEvent}>()
)

export const getRolesSuccessAction = createAction(
  ActionTypes.GET_ROLES_SUCCESS,
  props<{items: IRole[]; count: number}>()
)

export const getRolesFailureAction = createAction(ActionTypes.GET_ROLES_FAILURE)
