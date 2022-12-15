import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {LazyLoadEvent} from 'primeng/api'
import {Observable} from 'rxjs'
import {IResponseItems} from '../interfaces/response-items.interface'
import {eventAction, eventToParams} from '../functions/event.function'

@Injectable({
  providedIn: 'root',
})
export class TableService {
  previousEvent: LazyLoadEvent = {first: 0}

  constructor(private http: HttpClient) {}

  getItems(
    url: string,
    event: LazyLoadEvent | null,
    previousAction: number
  ): Observable<IResponseItems<any>> {
    this.previousEvent = eventAction(event, this.previousEvent, previousAction)
    return this.http.get<IResponseItems<any>>(url, {
      params: eventToParams(this.previousEvent),
    })
  }
}
