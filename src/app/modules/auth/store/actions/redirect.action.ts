import {createAction, props} from '@ngrx/store'
import {ActionTypes} from '../actionTypes'

export const redirectAction = createAction(
  ActionTypes.REDIRECT,
  props<{url: string}>()
)
