import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'

import {LazyLoadEvent} from 'primeng/api'

import {environment} from 'environments/environment'
import {eventAction, eventToParams} from '@shared/functions/event.function'
import {IResponseItems} from '@shared/interfaces/response-items.interface'
import {ICategory} from '@modules/admin/sections/docs/categories/interfaces/category.interface'

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private readonly fullUrl: string
  previousEvent: LazyLoadEvent = {first: 0}

  constructor(private http: HttpClient) {
    this.fullUrl = `${environment.urlApiStorage}/categories`
  }

  getCategories(
    event: LazyLoadEvent | null,
    previousAction: number
  ): Observable<IResponseItems<ICategory>> {
    this.previousEvent = eventAction(event, this.previousEvent, previousAction)

    return this.http.get<IResponseItems<ICategory>>(this.fullUrl, {
      params: eventToParams(this.previousEvent),
    })
  }
}
