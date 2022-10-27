import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'

import {LazyLoadEvent} from 'primeng/api'

import {environment} from 'src/environments/environment'
import {eventToParams} from 'src/app/shared/functions/event.function'
import {IResponseItems} from 'src/app/shared/interfaces/response-items.interface'
import {IRole} from 'src/app/shared/interfaces/role.interface'

@Injectable({
  providedIn: 'root',
})
export class RolesService {
  constructor(private http: HttpClient) {}

  getRoles(event: LazyLoadEvent): Observable<IResponseItems<IRole>> {
    const fullUrl = `${environment.urlApi}/auth/roles`

    return this.http.get<IResponseItems<IRole>>(fullUrl, {
      params: eventToParams(event),
    })
  }
}
