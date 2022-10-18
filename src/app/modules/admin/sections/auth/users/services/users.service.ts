import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'

import {LazyLoadEvent} from 'primeng/api'

import {environment} from 'src/environments/environment'
import {IResponseItems} from 'src/app/shared/interfaces/response-items.interface'
import {IUser, IUserInfo} from 'src/app/shared/interfaces/user.interface'
import {eventToParams} from 'src/app/shared/functions/event.function'

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private readonly fullUrl: string

  constructor(private http: HttpClient) {
    this.fullUrl = `${environment.urlApi}/auth/users`
  }

  getUsers(event: LazyLoadEvent | null): Observable<IResponseItems<IUser>> {
    return this.http.get<IResponseItems<IUser>>(this.fullUrl, {
      params: eventToParams(event),
    })
  }

  getUser(id: number): Observable<IUserInfo> {
    return this.http.get<IUserInfo>(`${this.fullUrl}/${id}`)
  }
}
