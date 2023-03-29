import {createAction, props} from '@ngrx/store'

import {LazyLoadEvent} from 'primeng/api'

import {LinksActionTypes} from '../actionTypes'
import {ITableItems} from '@shared/interfaces/table-items.interface'
import {IBackendErrors} from '@shared/interfaces/backend-errors.interface'
import {ILink} from '../../interfaces/link.interface'

export const getLinksAction = createAction(
  LinksActionTypes.GET_LINKS,
  props<{event: LazyLoadEvent | null; action: number}>()
)

export const getLinksSuccessAction = createAction(
  LinksActionTypes.GET_LINKS_SUCCESS,
  props<{links: ITableItems<ILink>}>()
)

export const getLinksFailureAction = createAction(
  LinksActionTypes.GET_LINKS_FAILURE,
  props<{errors: IBackendErrors}>()
)

export const clearLinksStateAction = createAction(LinksActionTypes.CLEAR_STATE)
