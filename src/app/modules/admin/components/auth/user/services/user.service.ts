import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'

import {environment} from 'environments/environment'
import {IUser, IUserSave} from '@shared/interfaces/user.interface'
import {IDeleteResponse} from '@shared/interfaces/delete-response.interface'

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly fullUrl: string

  constructor(private http: HttpClient) {
    this.fullUrl = `${environment.urlApi}/auth/users`
  }

  getUser(id: number): Observable<IUser> {
    return this.http.get<IUser>(`${this.fullUrl}/${id}`)
  }

  createUser(item: IUser): Observable<IUser> {
    return this.http.post<IUser>(this.fullUrl, this.itemToSave(item))
  }

  updateUser(id: number, item: IUser): Observable<IUser> {
    return this.http.put<IUser>(`${this.fullUrl}/${id}`, this.itemToSave(item))
  }

  deleteUser(id: number): Observable<IDeleteResponse> {
    return this.http.delete<IDeleteResponse>(`${this.fullUrl}/${id}`)
  }

  itemToSave(item: IUser): IUserSave {
    return {
      username: item.username,
      password: item.password,
      email: item.email ? item.email : null,
      comment: item.comment,
      avatar: item.avatar,
      sd_id: item.sd_id ? item.sd_id : null,
      status: item.status,
      roles: [...item.roles.map((value) => value.id)],
      permissions: [...item.permissions.map((value) => value.id)],
    }
  }
}
