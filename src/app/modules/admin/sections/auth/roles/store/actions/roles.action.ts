import {createAction, props} from '@ngrx/store'

import {LazyLoadEvent} from 'primeng/api'

import {RolesActionTypes} from '../actionTypes'
import {ITableItems} from '@shared/interfaces/table-items.interface'
import {IRole} from '@shared/interfaces/role.interface'
import {IBackendErrors} from '@shared/interfaces/backend-errors.interface'

export const getRolesAction = createAction(
  RolesActionTypes.GET_ROLES,
  props<{event: LazyLoadEvent | null; action: number}>()
)

export const getRolesSuccessAction = createAction(
  RolesActionTypes.GET_ROLES_SUCCESS,
  props<{roles: ITableItems<IRole>}>()
)

export const getRolesFailureAction = createAction(
  RolesActionTypes.GET_ROLES_FAILURE,
  props<{errors: IBackendErrors}>()
)

export const clearRolesStateAction = createAction(RolesActionTypes.CLEAR_STATE)
