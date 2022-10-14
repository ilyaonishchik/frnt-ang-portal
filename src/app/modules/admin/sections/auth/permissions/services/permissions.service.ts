import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'

import {LazyLoadEvent} from 'primeng/api'

import {environment} from 'src/environments/environment'
import {eventToParams} from 'src/app/shared/functions/event.function'
import {IPermission} from 'src/app/shared/interfaces/permission.interface'
import {IDeleteResponse} from 'src/app/shared/interfaces/delete-response.interface'
import {IPermissionsResponse} from '../interfaces/permissions-response.interface'

@Injectable({
  providedIn: 'root',
})
export class PermissionsService {
  constructor(private http: HttpClient) {}

  getPermissions(
    event: LazyLoadEvent | null
  ): Observable<IPermissionsResponse> {
    const fullUrl = `${environment.urlApi}/auth/permissions`

    return this.http.get<IPermissionsResponse>(fullUrl, {
      params: eventToParams(event),
    })
  }

  getPermission(id: number): Observable<IPermission> {
    const fullUrl = `${environment.urlApi}/auth/permissions/${id}`

    return this.http.get<IPermission>(fullUrl)
  }

  deletePermission(id: number): Observable<IDeleteResponse> {
    const fullUrl = `${environment.urlApi}/auth/permissions/${id}`

    return this.http.delete<IDeleteResponse>(fullUrl)
  }
}
