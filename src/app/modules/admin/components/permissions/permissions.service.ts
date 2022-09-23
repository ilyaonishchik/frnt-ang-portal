import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'

import {LazyLoadEvent} from 'primeng/api'

import {IAdminPermission, IAdminPermissions} from '../../interfaces/permission'
import {AppService} from '../../../../services/app.service'
import {IDeleteResult} from '../../../../types/results'
import {eventToParams} from '../../../../shared/functions/event.function'

@Injectable({
  providedIn: 'root',
})
export class PermissionsService {
  private readonly apiUrl: string = ''

  constructor(private http: HttpClient, private appService: AppService) {
    this.apiUrl = appService.urlApiAuth
  }

  getAll(event: LazyLoadEvent): Observable<IAdminPermissions> {
    return this.http.get<IAdminPermissions>(`${this.apiUrl}permissions`, {
      params: eventToParams(event),
    })
  }

  createPermission(item: IAdminPermission): Observable<IAdminPermission> {
    return this.http.post<IAdminPermission>(`${this.apiUrl}permissions`, item)
  }

  updatePermission(item: IAdminPermission): Observable<IAdminPermission> {
    return this.http.put<IAdminPermission>(
      `${this.apiUrl}permissions/${item.id}`,
      item
    )
  }

  deletePermission(item: IAdminPermission): Observable<IDeleteResult> {
    return this.http.delete<IDeleteResult>(
      `${this.apiUrl}permissions/${item.id}`
    )
  }
}
