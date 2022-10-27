import {createAction, props} from '@ngrx/store'

import {LazyLoadEvent} from 'primeng/api'

import {ActionTypes} from '../actionTypes'
import {ITableItems} from '../../../../../../../shared/interfaces/table-items.interface'
import {IRole} from '../../../../../../../shared/interfaces/role.interface'

export const getRolesAction = createAction(
  ActionTypes.GET_ROLES,
  props<{event: LazyLoadEvent}>()
)

export const getRolesSuccessAction = createAction(
  ActionTypes.GET_ROLES_SUCCESS,
  props<{roles: ITableItems<IRole>}>()
)

export const getRolesFailureAction = createAction(ActionTypes.GET_ROLES_FAILURE)
