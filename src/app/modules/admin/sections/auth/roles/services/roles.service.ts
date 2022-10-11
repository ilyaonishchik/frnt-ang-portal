import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'

import {LazyLoadEvent} from 'primeng/api'

import {environment} from 'src/environments/environment'
import {eventToParams} from 'src/app/shared/functions/event.function'
import {IRolesResponse} from 'src/app/shared/interfaces/roles-response.interface'

@Injectable({
  providedIn: 'root',
})
export class RolesService {
  constructor(private http: HttpClient) {}

  getRoles(event: LazyLoadEvent): Observable<IRolesResponse> {
    const fullUrl = `${environment.urlApi}/auth/roles`

    return this.http.get<IRolesResponse>(fullUrl, {
      params: eventToParams(event),
    })
  }
}
