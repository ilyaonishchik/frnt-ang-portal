import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'

import {LazyLoadEvent} from 'primeng/api'

import {environment} from 'environments/environment'
import {IResponseItems} from '@shared/interfaces/response-items.interface'
import {IMenu} from '../interfaces/menu.interface'
import {eventAction, eventToParams} from '@shared/functions/event.function'

@Injectable({
  providedIn: 'root',
})
export class MenusService {
  private readonly fullUrl: string
  previousEvent: LazyLoadEvent = {first: 0}

  constructor(private http: HttpClient) {
    this.fullUrl = `${environment.urlApi}/core/menus`
  }

  getMenus(
    event: LazyLoadEvent | null,
    previousAction: number
  ): Observable<IResponseItems<IMenu>> {
    this.previousEvent = eventAction(event, this.previousEvent, previousAction)
    return this.http.get<IResponseItems<IMenu>>(this.fullUrl, {
      params: eventToParams(this.previousEvent),
    })
  }
}
