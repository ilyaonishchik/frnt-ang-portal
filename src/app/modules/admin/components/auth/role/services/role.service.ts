import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'

import {environment} from 'environments/environment'
import {IRoleFull, IRoleSave} from '@shared/interfaces/role.interface'
import {IDeleteResponse} from '@shared/interfaces/delete-response.interface'

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  private readonly fullUrl: string

  constructor(private http: HttpClient) {
    this.fullUrl = `${environment.urlApi}/auth/roles`
  }

  getRole(id: number): Observable<IRoleFull> {
    return this.http.get<IRoleFull>(`${this.fullUrl}/${id}`)
  }

  createRole(item: IRoleFull): Observable<IRoleFull> {
    return this.http.post<IRoleFull>(this.fullUrl, this.itemToSave(item))
  }

  updateRole(id: number, item: IRoleFull): Observable<IRoleFull> {
    return this.http.put<IRoleFull>(
      `${this.fullUrl}/${id}`,
      this.itemToSave(item)
    )
  }

  deleteRole(id: number): Observable<IDeleteResponse> {
    return this.http.delete<IDeleteResponse>(`${this.fullUrl}/${id}`)
  }

  private itemToSave(item: IRoleFull): IRoleSave {
    return {
      code: item.code,
      name: item.name,
      comment: item.comment,
      status: item.status,
      permissions: [...item.permissions.map((value) => value.id)],
      users: [...item.users.map((value) => value.id)],
    }
  }
}
