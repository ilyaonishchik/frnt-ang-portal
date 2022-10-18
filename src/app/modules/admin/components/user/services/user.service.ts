import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'

import {environment} from 'src/environments/environment'
import {IUserInfo} from 'src/app/shared/interfaces/user.interface'

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly fullUrl: string

  constructor(private http: HttpClient) {
    this.fullUrl = `${environment.urlApi}/auth/users`
  }

  getUser(id: number): Observable<IUserInfo> {
    console.log('getUser', id)
    return this.http.get<IUserInfo>(`${this.fullUrl}/${id}`)
  }
}
