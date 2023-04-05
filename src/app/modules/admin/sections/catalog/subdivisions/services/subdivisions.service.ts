import {Injectable} from '@angular/core'
import {LazyLoadEvent} from 'primeng/api'
import {HttpClient} from '@angular/common/http'
import {environment} from 'environments/environment'
import {Observable} from 'rxjs'
import {IResponseItems} from '@shared/interfaces/response-items.interface'
import {ISubdivision} from '@modules/admin/sections/catalog/subdivisions/interfaces/subdivision.interface'
import {eventAction, eventToParams} from '@shared/functions/event.function'

@Injectable({
  providedIn: 'root',
})
export class SubdivisionsService {
  private readonly fullUrl: string
  previousEvent: LazyLoadEvent = {first: 0}

  constructor(private http: HttpClient) {
    this.fullUrl = `${environment.urlApiCatalog}/subdivisions`
  }

  getSubdivisions(
    event: LazyLoadEvent | null,
    previousAction: number
  ): Observable<IResponseItems<ISubdivision>> {
    this.previousEvent = eventAction(event, this.previousEvent, previousAction)

    return this.http.get<IResponseItems<ISubdivision>>(this.fullUrl, {
      params: eventToParams(this.previousEvent),
    })
  }
}
