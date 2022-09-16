import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'
import {IRoles} from './role'
import {Converters} from '../../../../shared/converters'

@Injectable({
  providedIn: 'root',
})
export class RolesService {
  constructor(private http: HttpClient) {}

  getAll(params?: any): Observable<IRoles> {
    return this.http.get<IRoles>('/api/v1/roles/', {
      params: Converters.paramsToApi(params),
    })
  }
}
