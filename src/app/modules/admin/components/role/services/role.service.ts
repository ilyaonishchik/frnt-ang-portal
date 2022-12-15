import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'

import {environment} from 'environments/environment'
import {IRole, IRoleSave} from '@shared/interfaces/role.interface'
import {IDeleteResponse} from '@shared/interfaces/delete-response.interface'

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  private readonly fullUrl: string

  constructor(private http: HttpClient) {
    this.fullUrl = `${environment.urlApi}/auth/roles`
  }

  getRole(id: number): Observable<IRole> {
    return this.http.get<IRole>(`${this.fullUrl}/${id}`)
  }

  createRole(item: IRole): Observable<IRole> {
    return this.http.post<IRole>(this.fullUrl, this.itemToSave(item))
  }

  updateRole(id: number, item: IRole): Observable<IRole> {
    return this.http.put<IRole>(`${this.fullUrl}/${id}`, this.itemToSave(item))
  }

  deleteRole(id: number): Observable<IDeleteResponse> {
    return this.http.delete<IDeleteResponse>(`${this.fullUrl}/${id}`)
  }

  private itemToSave(item: IRole): IRoleSave {
    return {
      code: item.code,
      name: item.name,
      comment: item.comment,
      status: item.status,
      permissions: [...item.permissions.map((value) => value.id)],
    }
  }
}
