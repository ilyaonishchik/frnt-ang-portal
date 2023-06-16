import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'

import {environment} from 'environments/environment'
import {
  IPermissionFull,
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

  getPermission(id: number): Observable<IPermissionFull> {
    return this.http.get<IPermissionFull>(`${this.fullUrl}/${id}`)
  }

  createPermission(item: IPermissionFull): Observable<IPermissionFull> {
    return this.http.post<IPermissionFull>(this.fullUrl, this.itemToSave(item))
  }

  updatePermission(
    id: number,
    item: IPermissionFull
  ): Observable<IPermissionFull> {
    return this.http.put<IPermissionFull>(
      `${this.fullUrl}/${id}`,
      this.itemToSave(item)
    )
  }

  deletePermission(id: number): Observable<IDeleteResponse> {
    return this.http.delete<IDeleteResponse>(`${this.fullUrl}/${id}`)
  }

  itemToSave(item: IPermissionFull): IPermissionSave {
    return {
      code: item.code,
      name: item.name,
      comment: item.comment,
      roles: [...item.roles.map((value) => value.id)],
      users: [...item.users.map((value) => value.id)],
      status: item.status,
    }
  }
}
