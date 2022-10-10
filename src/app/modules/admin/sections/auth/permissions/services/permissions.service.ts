import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'

import {LazyLoadEvent} from 'primeng/api'

import {environment} from 'src/environments/environment'
import {IPermissionsResponse} from '../interfaces/permissions-response.interface'
import {eventToParams} from 'src/app/shared/functions/event.function'

@Injectable({
  providedIn: 'root',
})
export class PermissionsService {
  constructor(private http: HttpClient) {}

  getPermissions(event: LazyLoadEvent): Observable<IPermissionsResponse> {
    const fullUrl = `${environment.urlApi}/auth/permissions`

    return this.http.get<IPermissionsResponse>(fullUrl, {
      params: eventToParams(event),
    })
  }
}
