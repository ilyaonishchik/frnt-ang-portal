import {createAction, props} from '@ngrx/store'

import {LazyLoadEvent} from 'primeng/api'

import {ActionTypes} from '../actionTypes'
import {ITableItems} from 'src/app/shared/interfaces/table-items.interface'
import {IRole} from 'src/app/shared/interfaces/role.interface'
import {IBackendErrors} from 'src/app/shared/interfaces/backend-errors.interface'

export const getRolesAction = createAction(
  ActionTypes.GET_ROLES,
  props<{event: LazyLoadEvent | null; action: number}>()
)

export const getRolesSuccessAction = createAction(
  ActionTypes.GET_ROLES_SUCCESS,
  props<{roles: ITableItems<IRole>}>()
)

export const getRolesFailureAction = createAction(
  ActionTypes.GET_ROLES_FAILURE,
  props<{errors: IBackendErrors}>()
)
