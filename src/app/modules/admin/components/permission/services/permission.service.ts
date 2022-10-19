import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {delay, Observable} from 'rxjs'

import {environment} from 'src/environments/environment'
import {IPermission} from 'src/app/shared/interfaces/permission.interface'

@Injectable({
  providedIn: 'root',
})
export class PermissionService {
  private readonly fullUrl: string

  constructor(private http: HttpClient) {
    this.fullUrl = `${environment.urlApi}/auth/permissions`
  }

  getPermission(id: number): Observable<IPermission> {
    return this.http.get<IPermission>(`${this.fullUrl}/${id}`).pipe(delay(5))
  }

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
