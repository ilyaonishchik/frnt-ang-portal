import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {map, Observable} from 'rxjs'

import {environment} from 'environments/environment'
import {IResponseItems} from '../interfaces/response-items.interface'
import {IRole} from '../interfaces/role.interface'
import {IPermission} from '../interfaces/permission.interface'
import {IClient} from '@shared/interfaces/client.interface'
import {IUser} from '@shared/interfaces/user.interface'

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<IUser[]> {
    return this.http
      .get<IResponseItems<IUser>>(`${environment.urlApiAuth}/users`)
      .pipe(map((response: IResponseItems<IUser>) => response.results))
  }

  getRoles(): Observable<IRole[]> {
    return this.http
      .get<IResponseItems<IRole>>(`${environment.urlApiAuth}/roles`)
      .pipe(map((response: IResponseItems<IRole>) => response.results))
  }

  getPermissions(): Observable<IPermission[]> {
    return this.http
      .get<IResponseItems<IPermission>>(`${environment.urlApiAuth}/permissions`)
      .pipe(map((response: IResponseItems<IPermission>) => response.results))
  }

  getClientInfo(): Observable<IClient> {
    return this.http.get<IClient>(`${environment.urlApiCore}/client`)
  }
}
