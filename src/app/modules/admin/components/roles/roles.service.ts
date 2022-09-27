import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'

import {IRoles} from '../../interfaces/role'
import {AppService} from '../../../../services/app.service'
import {IDeleteResult} from '../../../../types/results'
import {IRole} from '../../../../shared/types/role.interface'
import {LazyLoadEvent} from 'primeng/api'
import {eventToParams} from '../../../../shared/functions/event.function'

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

  createRole(item: IRole): Observable<IRole> {
    return this.http.post<IRole>(`${this.apiUrl}roles`, item)
  }

  updateRole(item: IRole): Observable<IRole> {
    return this.http.put<IRole>(`${this.apiUrl}roles/${item.id}`, item)
  }

  deleteRole(item: IRole): Observable<IDeleteResult> {
    return this.http.delete<IDeleteResult>(`${this.apiUrl}roles/${item.id}`)
  }
}
