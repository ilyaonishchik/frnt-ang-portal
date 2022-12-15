import {createAction, props} from '@ngrx/store'

import {LinkActionTypes} from '../actionTypes'
import {IBackendErrors} from '@shared/interfaces/backend-errors.interface'
import {IDeleteResponse} from '@shared/interfaces/delete-response.interface'
import {ILink} from '../../../../sections/portal/links/interfaces/link.interface'

export const getLinkAction = createAction(
  LinkActionTypes.GET_LINK,
  props<{id: number}>()
)

export const getLinkSuccessAction = createAction(
  LinkActionTypes.GET_LINK_SUCCESS,
  props<{link: ILink}>()
)

export const getLinkFailureAction = createAction(
  LinkActionTypes.GET_LINK_FAILURE,
  props<{errors: IBackendErrors}>()
)

export const createLinkAction = createAction(
  LinkActionTypes.CREATE_LINK,
  props<{link: ILink}>()
)

export const createLinkSuccessAction = createAction(
  LinkActionTypes.CREATE_LINK_SUCCESS,
  props<{link: ILink}>()
)

export const createLinkFailureAction = createAction(
  LinkActionTypes.CREATE_LINK_FAILURE,
  props<{errors: IBackendErrors}>()
)

export const updateLinkAction = createAction(
  LinkActionTypes.UPDATE_LINK,
  props<{id: number; link: ILink}>()
)

export const updateLinkSuccessAction = createAction(
  LinkActionTypes.UPDATE_LINK_SUCCESS,
  props<{link: ILink}>()
)

export const updateLinkFailureAction = createAction(
  LinkActionTypes.UPDATE_LINK_FAILURE,
  props<{errors: IBackendErrors}>()
)

export const deleteLinkAction = createAction(
  LinkActionTypes.DELETE_LINK,
  props<{id: number}>()
)

export const deleteLinkSuccessAction = createAction(
  LinkActionTypes.DELETE_LINK_SUCCESS,
  props<{response: IDeleteResponse}>()
)

export const deleteLinkFailureAction = createAction(
  LinkActionTypes.DELETE_LINK_FAILURE,
  props<{errors: IBackendErrors}>()
)
