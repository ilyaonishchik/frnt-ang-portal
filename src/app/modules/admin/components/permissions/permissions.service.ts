import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'

import {Converters} from '../../../../shared/converters'
import {IPermissions} from './permission'

@Injectable({
  providedIn: 'root',
})
export class PermissionsService {
  constructor(private http: HttpClient) {}

  getAll(params?: any): Observable<IPermissions> {
    return this.http.get<IPermissions>('/api/v1/permissions', {
      params: Converters.paramsToApi(params),
    })
    // .pipe(catchError(this.errorHandler))
  }
}
