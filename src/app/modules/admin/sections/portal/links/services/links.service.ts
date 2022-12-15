import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'

import {LazyLoadEvent} from 'primeng/api'

import {environment} from 'environments/environment'
import {IResponseItems} from '@shared/interfaces/response-items.interface'
import {eventToParams, eventAction} from '@shared/functions/event.function'
import {ILink} from '../interfaces/link.interface'

@Injectable({
  providedIn: 'root',
})
export class LinksService {
  private readonly fullUrl: string
  previousEvent: LazyLoadEvent = {first: 0}

  constructor(private http: HttpClient) {
    this.fullUrl = `${environment.urlApi}/core/links`
  }

  getLinks(
    event: LazyLoadEvent | null,
    previousAction: number
  ): Observable<IResponseItems<ILink>> {
    this.previousEvent = eventAction(event, this.previousEvent, previousAction)

    return this.http.get<IResponseItems<ILink>>(this.fullUrl, {
      params: eventToParams(this.previousEvent),
    })
  }
}
