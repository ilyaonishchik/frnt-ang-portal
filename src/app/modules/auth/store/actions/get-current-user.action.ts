import {createAction, props} from '@ngrx/store'

import {ActionTypes} from '../actionTypes'
import {ICurrentUser} from '../../../../shared/types/current-user.interface'

export const getCurrentUserAction = createAction(ActionTypes.GET_CURRENT_USER)

export const getCurrentUserSuccessAction = createAction(
  ActionTypes.GET_CURRENT_USER_SUCCESS,
  props<{currentUser: ICurrentUser}>()
)

export const getCurrentUserFailureAction = createAction(
  ActionTypes.GET_CURRENT_USER_FAILURE
)
