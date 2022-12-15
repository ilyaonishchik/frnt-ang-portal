import {createAction, props} from '@ngrx/store'

import {MainActionTypes} from '../actionTypes'
import {ILink} from '../../interfaces/link.interface'
import {IBackendErrors} from '@shared/interfaces/backend-errors.interface'

export const getLinksAction = createAction(MainActionTypes.GET_LINKS)

export const getLinksSuccessAction = createAction(
  MainActionTypes.GET_LINKS_SUCCESS,
  props<{links: ILink[]}>()
)

export const getLinksFailureAction = createAction(
  MainActionTypes.GET_LINKS_FAILURE,
  props<{errors: IBackendErrors}>()
)
