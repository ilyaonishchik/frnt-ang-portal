import {createAction, props} from '@ngrx/store'

import {PdpSrtActionTypes} from '../actionTypes'
import {IBackendErrors} from '@shared/interfaces/backend-errors.interface'
import {IPeriodical} from '../../interfaces/periodical.interface'

export const getPeriodicalsAction = createAction(
  PdpSrtActionTypes.GET_PERIODICALS,
  props<{date: Date}>()
)

export const getPeriodicalsSuccessAction = createAction(
  PdpSrtActionTypes.GET_PERIODICALS_SUCCESS,
  props<{periodicals: IPeriodical[]}>()
)

export const getPeriodicalsFailureAction = createAction(
  PdpSrtActionTypes.GET_PERIODICALS_FAILURE,
  props<{errors: IBackendErrors}>()
)
