import {createAction, props} from '@ngrx/store'

import {ActionTypes} from '../actionTypes'
import {ICrudAction} from 'src/app/shared/interfaces/crud-action.interface'

export const dialogShowAction = createAction(
  ActionTypes.DIALOG_SHOW,
  props<{crud: ICrudAction}>()
)

export const dialogConfirmAction = createAction(
  ActionTypes.DIALOG_CONFIRM,
  props<{action: number}>()
)

export const dialogCancelAction = createAction(ActionTypes.DIALOG_CANCEL)
