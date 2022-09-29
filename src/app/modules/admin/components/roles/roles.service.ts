import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {map, Observable} from 'rxjs'

import {IRoles} from '../../interfaces/role'
import {AppService} from '../../../../shared/services/app.service'
import {IDeleteResult} from '../../../../shared/types/results.interface'
import {IRole, IRoleSave} from '../../../../shared/types/role.interface'
import {LazyLoadEvent} from 'primeng/api'
import {eventToParams} from '../../../../shared/functions/event.function'
import {IPermission} from '../../../../shared/types/permission.interface'
import {IPermissions} from '../../interfaces/permission'

@Injectable({
  providedIn: 'root',
})
export class RolesService {
  apiUrl: string = ''
  constructor(private http: HttpClient, private appService: AppService) {
    this.apiUrl = appService.urlApiAuth
  }

  getAll(event: LazyLoadEvent): Observable<IRoles> {
    return this.http.get<IRoles>(`${this.apiUrl}roles`, {
      params: eventToParams(event),
    })
  }

  getRole(item: IRole): Observable<IRole> {
    return this.http.get<IRole>(`${this.apiUrl}roles/${item.id}`)
  }

  createRole(item: IRole): Observable<IRole> {
    return this.http.post<IRole>(`${this.apiUrl}roles`, this.itemToRole(item))
  }

  updateRole(item: IRole): Observable<IRole> {
    return this.http.put<IRole>(
      `${this.apiUrl}roles/${item.id}`,
      this.itemToRole(item)
    )
  }

  deleteRole(item: IRole): Observable<IDeleteResult> {
    return this.http.delete<IDeleteResult>(`${this.apiUrl}roles/${item.id}`)
  }

  getPermissions(): Observable<IPermission[]> {
    return this.http
      .get<IPermissions>(`${this.apiUrl}permissions`)
      .pipe(map((response: IPermissions) => response.results))
  }

  private itemToRole(item: IRole): IRoleSave {
    return {
      name: item.name,
      comment: item.comment,
      status: item.status,
      permissions: [...item.permissions.map((value) => value.id)],
    }
  }
}
