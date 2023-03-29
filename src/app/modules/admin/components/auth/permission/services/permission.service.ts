import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'

import {environment} from 'environments/environment'
import {
  IPermission,
  IPermissionSave,
} from '@shared/interfaces/permission.interface'
import {IDeleteResponse} from '@shared/interfaces/delete-response.interface'

@Injectable({
  providedIn: 'root',
})
export class PermissionService {
  private readonly fullUrl: string

  constructor(private http: HttpClient) {
    this.fullUrl = `${environment.urlApi}/auth/permissions`
  }

  getPermission(id: number): Observable<IPermission> {
    return this.http.get<IPermission>(`${this.fullUrl}/${id}`)
  }

  createPermission(item: IPermission): Observable<IPermission> {
    return this.http.post<IPermission>(this.fullUrl, this.itemToSave(item))
  }

  updatePermission(id: number, item: IPermission): Observable<IPermission> {
    return this.http.put<IPermission>(
      `${this.fullUrl}/${id}`,
      this.itemToSave(item)
    )
  }

  deletePermission(id: number): Observable<IDeleteResponse> {
    return this.http.delete<IDeleteResponse>(`${this.fullUrl}/${id}`)
  }

  itemToSave(item: IPermission): IPermissionSave {
    return {
      code: item.code,
      name: item.name,
      comment: item.comment,
      status: item.status,
    }
  }
}
