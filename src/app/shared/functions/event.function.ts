import {HttpParams} from '@angular/common/http'

import {LazyLoadEvent} from 'primeng/api'
import {TCrudAction} from '../types/crud-action.type'
import {environment} from 'environments/environment'

export function eventToParams(event: LazyLoadEvent | null): HttpParams {
  let params = new HttpParams()

  if (event) {
    if (event.first) {
      params = params.append('skip', event.first)
    } else {
      params = params.append('skip', 0)
    }

    if (event.rows && event.rows > 0) {
      params = params.append('limit', event.rows)
    } else {
      params = params.append('limit', environment.rowsPerPageCount)
    }

    if (event.sortField) {
      if (event.sortOrder === -1) {
        params = params.append('sort', '-' + event.sortField)
      } else {
        params = params.append('sort', event.sortField)
      }
    }

    if (event.globalFilter) {
      params = params.append('search', event.globalFilter)
    }

    if (event.filters) {
      for (const field in event.filters) {
        params = params.set('search', event.filters[field].value)
      }
    }
  } else {
    params = params.append('skip', 0)
  }
  return params
}

export function eventAction(
  eventNew: LazyLoadEvent | null,
  eventOld: LazyLoadEvent,
  action: TCrudAction
): LazyLoadEvent {
  let eventTemp: LazyLoadEvent

  if (eventNew) {
    eventTemp = {...eventNew}
  } else {
    eventTemp = {...eventOld}
  }

  switch (action) {
    case TCrudAction.CREATE | TCrudAction.DELETE: {
      eventTemp.first = 0
    }
  }

  return eventTemp
}
