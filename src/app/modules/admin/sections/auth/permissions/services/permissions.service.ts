import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'

import {LazyLoadEvent} from 'primeng/api'

import {environment} from 'src/environments/environment'
import {eventToParams} from 'src/app/shared/functions/event.function'
import {IPermission} from 'src/app/shared/interfaces/permission.interface'
import {IResponseItems} from 'src/app/shared/interfaces/response-items.interface'

@Injectable({
  providedIn: 'root',
})
export class PermissionsService {
  private readonly fullUrl: string

  constructor(private http: HttpClient) {
    this.fullUrl = `${environment.urlApi}/auth/permissions`
  }

  getPermissions(
    event: LazyLoadEvent | null
  ): Observable<IResponseItems<IPermission>> {
    return this.http.get<IResponseItems<IPermission>>(this.fullUrl, {
      params: eventToParams(event),
    })
  }

  // getPermission(id: number): Observable<IPermission> {
  //   return this.http.get<IPermission>(`${this.fullUrl}/${id}`)
  // }

  // createPermission(item: IPermissionSave): Observable<IPermission> {
  //   return this.http.post<IPermission>(this.fullUrl, item)
  // }

  // updatePermission(id: number, item: IPermissionSave): Observable<IPermission> {
  //   return this.http.put<IPermission>(`${this.fullUrl}/${id}`, item)
  // }

  // deletePermission(id: number): Observable<IDeleteResponse> {
  //   return this.http.delete<IDeleteResponse>(`${this.fullUrl}/${id}`)
  // }
}
