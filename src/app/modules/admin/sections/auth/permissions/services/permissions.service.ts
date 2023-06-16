import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'

import {LazyLoadEvent} from 'primeng/api'

import {environment} from 'environments/environment'
import {eventAction, eventToParams} from '@shared/functions/event.function'
import {IPermissionFull} from '@shared/interfaces/permission.interface'
import {IResponseItems} from '@shared/interfaces/response-items.interface'

@Injectable({
  providedIn: 'root',
})
export class PermissionsService {
  private readonly fullUrl: string
  previousEvent: LazyLoadEvent = {first: 0}

  constructor(private http: HttpClient) {
    this.fullUrl = `${environment.urlApi}/auth/permissions`
  }

  getPermissions(
    event: LazyLoadEvent | null,
    previousAction: number
  ): Observable<IResponseItems<IPermissionFull>> {
    this.previousEvent = eventAction(event, this.previousEvent, previousAction)

    return this.http.get<IResponseItems<IPermissionFull>>(this.fullUrl, {
      params: eventToParams(this.previousEvent),
    })
  }
}
