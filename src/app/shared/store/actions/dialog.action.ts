import {createAction, props} from '@ngrx/store'

import {DialogActionTypes} from '../types/dialog-action.type'
import {TCrudAction} from '../../types/crud-action.type'
import {ICrudAction} from '../../interfaces/crud-action.interface'

export const dialogShowAction = createAction(
  DialogActionTypes.DIALOG_SHOW,
  props<{crud: ICrudAction}>()
)

export const dialogConfirmAction = createAction(
  DialogActionTypes.DIALOG_CONFIRM,
  props<{action: TCrudAction}>()
)

export const dialogCancelAction = createAction(DialogActionTypes.DIALOG_CANCEL)
