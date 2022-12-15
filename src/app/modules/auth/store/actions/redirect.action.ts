import {createAction, props} from '@ngrx/store'

import {AuthActionTypes} from '../actionTypes'

export const redirectAction = createAction(
  AuthActionTypes.REDIRECT,
  props<{url: string}>()
)
