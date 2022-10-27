import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'

import {LazyLoadEvent} from 'primeng/api'

import {environment} from 'src/environments/environment'
import {eventToParams} from 'src/app/shared/functions/event.function'
import {IPermission} from 'src/app/shared/interfaces/permission.interface'
import {IResponseItems} from 'src/app/shared/interfaces/response-items.interface'
import {TCrudAction} from 'src/app/shared/types/crud-action.type'

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
    action: number
  ): Observable<IResponseItems<IPermission>> {
    if (event) {
      this.previousEvent = event
    }
    switch (action) {
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
    return this.http.get<IResponseItems<IPermission>>(this.fullUrl, {
      params: eventToParams(this.previousEvent),
    })
  }
}
