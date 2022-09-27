import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'

import {LazyLoadEvent} from 'primeng/api'

import {AppService} from '../../../../services/app.service'
import {IDeleteResult} from '../../../../types/results'
import {eventToParams} from '../../../../shared/functions/event.function'
import {IPermissions} from '../../interfaces/permission'
import {IPermission} from '../../../../shared/types/permission.interface'

@Injectable({
  providedIn: 'root',
})
export class PermissionsService {
  private readonly apiUrl: string = ''

  constructor(private http: HttpClient, private appService: AppService) {
    this.apiUrl = appService.urlApiAuth
  }

  getAll(event: LazyLoadEvent): Observable<IPermissions> {
    return this.http.get<IPermissions>(`${this.apiUrl}permissions`, {
      params: eventToParams(event),
    })
  }

  createPermission(item: IPermission): Observable<IPermission> {
    return this.http.post<IPermission>(`${this.apiUrl}permissions`, item)
  }

  updatePermission(item: IPermission): Observable<IPermission> {
    return this.http.put<IPermission>(
      `${this.apiUrl}permissions/${item.id}`,
      item
    )
  }

  deletePermission(item: IPermission): Observable<IDeleteResult> {
    return this.http.delete<IDeleteResult>(
      `${this.apiUrl}permissions/${item.id}`
    )
  }
}
