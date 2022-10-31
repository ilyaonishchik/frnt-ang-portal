import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'

import {LazyLoadEvent} from 'primeng/api'

import {environment} from 'src/environments/environment'
import {eventToParams} from 'src/app/shared/functions/event.function'
import {IResponseItems} from 'src/app/shared/interfaces/response-items.interface'
import {IRole} from 'src/app/shared/interfaces/role.interface'
import {TCrudAction} from 'src/app/shared/types/crud-action.type'

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
    if (event) {
      this.previousEvent = event
    }
    switch (previousAction) {
      case TCrudAction.CREATE: {
        if (this.previousEvent) {
          this.previousEvent.first = 0
        }
        break
      }
      case TCrudAction.DELETE: {
        if (this.previousEvent) {
          this.previousEvent.first = 0
        }
        break
      }
    }
    return this.http.get<IResponseItems<IRole>>(this.fullUrl, {
      params: eventToParams(this.previousEvent),
    })
  }
}
