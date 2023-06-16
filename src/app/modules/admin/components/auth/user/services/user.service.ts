import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'

import {environment} from 'environments/environment'
import {IUserFull, IUserSave} from '@shared/interfaces/user.interface'
import {IDeleteResponse} from '@shared/interfaces/delete-response.interface'

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly fullUrl: string

  constructor(private http: HttpClient) {
    this.fullUrl = `${environment.urlApi}/auth/users`
  }

  getUser(id: number): Observable<IUserFull> {
    return this.http.get<IUserFull>(`${this.fullUrl}/${id}`)
  }

  createUser(item: IUserFull): Observable<IUserFull> {
    return this.http.post<IUserFull>(this.fullUrl, this.itemToSave(item))
  }

  updateUser(id: number, item: IUserFull): Observable<IUserFull> {
    return this.http.put<IUserFull>(
      `${this.fullUrl}/${id}`,
      this.itemToSave(item)
    )
  }

  deleteUser(id: number): Observable<IDeleteResponse> {
    return this.http.delete<IDeleteResponse>(`${this.fullUrl}/${id}`)
  }

  itemToSave(item: IUserFull): IUserSave {
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
