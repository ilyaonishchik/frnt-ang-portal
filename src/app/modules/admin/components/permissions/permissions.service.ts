import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'

import {Converters} from '../../../../shared/converters'
import {IPermission, IPermissions} from './permission'
import {AppService} from '../../../../services/app.service'
import {IDeleteResult} from '../../../../types/results'

@Injectable({
  providedIn: 'root',
})
export class PermissionsService {
  private readonly apiUrl: string = ''

  constructor(private http: HttpClient, private appService: AppService) {
    this.apiUrl = appService.baseApiUrl + '/api/v1/auth/'
  }

  getAll(params?: any): Observable<IPermissions> {
    return this.http.get<IPermissions>(`${this.apiUrl}permissions`, {
      params: Converters.paramsToApi(params),
    })
    // .pipe(catchError(this.errorHandler))
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
