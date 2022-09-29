import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {map, Observable} from 'rxjs'

import {LazyLoadEvent} from 'primeng/api'

import {IUsers} from '../../interfaces/user'
import {AppService} from '../../../../shared/services/app.service'
import {eventToParams} from '../../../../shared/functions/event.function'
import {IUser, IUserSave} from '../../../../shared/types/user.interface'
import {IPermission} from '../../../../shared/types/permission.interface'
import {IPermissions} from '../../interfaces/permission'
import {IRole} from '../../../../shared/types/role.interface'
import {IRoles} from '../../interfaces/role'
import {IDeleteResult} from '../../../../shared/types/results.interface'

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  apiUrl: string = ''
  constructor(private http: HttpClient, private appService: AppService) {
    this.apiUrl = appService.urlApiAuth
  }

  getAll(event: LazyLoadEvent): Observable<IUsers> {
    return this.http.get<IUsers>(`${this.apiUrl}users`, {
      params: eventToParams(event),
    })
  }

  getUser(item: IUser): Observable<IUser> {
    return this.http.get<IUser>(`${this.apiUrl}users/${item.id}`)
  }

  createUser(item: IUser): Observable<IUser> {
    return this.http.post<IUser>(`${this.apiUrl}users`, this.itemToUser(item))
  }

  updateUser(item: IUser): Observable<IUser> {
    return this.http.put<IUser>(
      `${this.apiUrl}users/${item.id}`,
      this.itemToUser(item)
    )
  }

  deleteUser(item: IUser): Observable<IDeleteResult> {
    return this.http.delete<IDeleteResult>(`${this.apiUrl}users/${item.id}`)
  }

  getRoles(): Observable<IRole[]> {
    return this.http
      .get<IRoles>(`${this.apiUrl}roles`)
      .pipe(map((response: IRoles) => response.results))
  }

  getPermissions(): Observable<IPermission[]> {
    return this.http
      .get<IPermissions>(`${this.apiUrl}permissions`)
      .pipe(map((response: IPermissions) => response.results))
  }

  private itemToUser(item: IUser): IUserSave {
    return {
      username: item.username,
      email: item.email,
      comment: item.comment,
      avatar: item.avatar,
      status: item.status,
      roles: [...item.roles.map((value) => value.id)],
      permissions: [...item.permissions.map((value) => value.id)],
    }
  }
}
