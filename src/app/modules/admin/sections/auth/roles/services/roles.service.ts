import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'

import {LazyLoadEvent} from 'primeng/api'

import {environment} from 'environments/environment'
import {eventAction, eventToParams} from '@shared/functions/event.function'
import {IResponseItems} from '@shared/interfaces/response-items.interface'
import {IRole} from '@shared/interfaces/role.interface'

@Injectable({
  providedIn: 'root',
})
export class RolesService {
  private readonly fullUrl: string
  previousEvent: LazyLoadEvent = {first: 0}

  constructor(private http: HttpClient) {
    this.fullUrl = `${environment.urlApi}/auth/roles`
  }

  getRoles(
    event: LazyLoadEvent | null,
    previousAction: number
  ): Observable<IResponseItems<IRole>> {
    this.previousEvent = eventAction(event, this.previousEvent, previousAction)

    return this.http.get<IResponseItems<IRole>>(this.fullUrl, {
      params: eventToParams(this.previousEvent),
    })
  }
}
