import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'

import {environment} from 'src/environments/environment'
import {IRole, IRoleSave} from 'src/app/shared/interfaces/role.interface'
import {IDeleteResponse} from 'src/app/shared/interfaces/delete-response.interface'

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

  createRole(item: IRoleSave): Observable<IRole> {
    return this.http.post<IRole>(this.fullUrl, item)
  }

  updateRole(id: number, item: IRoleSave): Observable<IRole> {
    return this.http.put<IRole>(`${this.fullUrl}/${id}`, item)
  }

  deleteRole(id: number): Observable<IDeleteResponse> {
    return this.http.delete<IDeleteResponse>(`${this.fullUrl}/${id}`)
  }
}
