import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'

import {Converters} from '../../../../shared/converters'
import {IAdminPermission, IAdminPermissions} from './permission'
import {AppService} from '../../../../services/app.service'
import {IDeleteResult} from '../../../../types/results'

@Injectable({
  providedIn: 'root',
})
export class PermissionsService {
  private readonly apiUrl: string = ''

  constructor(private http: HttpClient, private appService: AppService) {
    this.apiUrl = appService.urlApiAuth
  }

  getAll(params?: any): Observable<IAdminPermissions> {
    return this.http.get<IAdminPermissions>(`${this.apiUrl}permissions`, {
      params: Converters.paramsToApi(params),
    })
    // .pipe(catchError(this.errorHandler))
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
