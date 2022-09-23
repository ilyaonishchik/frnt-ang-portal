import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'
import {IRoles} from './role'
import {Converters} from '../../../../shared/converters'
import {AppService} from '../../../../services/app.service'

@Injectable({
  providedIn: 'root',
})
export class RolesService {
  apiUrl: string = ''
  constructor(private http: HttpClient, private appService: AppService) {
    this.apiUrl = appService.urlApiAuth
  }

  getAll(params?: any): Observable<IRoles> {
    return this.http.get<IRoles>(`${this.apiUrl}roles`, {
      params: Converters.paramsToApi(params),
    })
  }
}
