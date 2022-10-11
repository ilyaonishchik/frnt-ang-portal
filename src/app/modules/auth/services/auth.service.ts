import {Injectable} from '@angular/core'
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http'
import {map, Observable} from 'rxjs'

import {ISignupRequest} from '../interfaces/signup-request.interface'
import {ICurrentUser} from '../../../shared/interfaces/current-user.interface'
import {AppService} from '../../../shared/services/app.service'
import {ISignupResponse} from '../interfaces/signup-response.interface'
import {ISigninRequest} from '../interfaces/signin-request.interface'
import {ISigninResponse} from '../interfaces/signin-response.interface'
import {IToken} from '../../../shared/types/token'
import {IUserReset} from '../../../shared/types/user.interface'
import {IVerifyResponse} from '../interfaces/verify-response.interface'
import {IPermission} from '../../../shared/interfaces/permission.interface'
import {IPermissions} from '../../admin/interfaces/permission'
import {IRole} from '../../../shared/interfaces/role.interface'
import {IRolesResponse} from '../../../shared/interfaces/roles-response.interface'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly apiUrl: string = ''

  constructor(private http: HttpClient, private appService: AppService) {
    this.apiUrl = this.appService.urlApiAuth
  }

  signUp(data: ISignupRequest): Observable<ICurrentUser> {
    return this.http
      .post<ISignupResponse>(`${this.apiUrl}signup`, data)
      .pipe(map((response: ISignupResponse) => response))
  }

  signIn(data: ISigninRequest): Observable<ISigninResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
    }
    const params = new HttpParams({
      fromObject: {username: data.username, password: data.password},
    })

    return this.http
      .post<ISigninResponse>(`${this.apiUrl}signin`, params, httpOptions)
      .pipe(map((response: ISigninResponse) => response))
  }

  getCurrentUser(): Observable<ICurrentUser> {
    return this.http
      .get<ICurrentUser>(`${this.apiUrl}users/me`)
      .pipe(map((response: ICurrentUser) => response))
  }

  getRoles(): Observable<IRole[]> {
    return this.http
      .get<IRolesResponse>(`${this.apiUrl}roles`)
      .pipe(map((response: IRolesResponse) => response.results))
  }

  getPermissions(): Observable<IPermission[]> {
    return this.http
      .get<IPermissions>(`${this.apiUrl}permissions`)
      .pipe(map((response: IPermissions) => response.results))
  }

  resetPassword(user: IUserReset): Observable<any> {
    return this.http.get(`${this.apiUrl}reset/${user.email}`)
  }

  refreshToken(token: string) {
    return this.http.get<IToken>(`${this.apiUrl}refresh/${token}`)
  }

  verifyCode(code: string): Observable<IVerifyResponse> {
    return this.http.get<IVerifyResponse>(`${this.apiUrl}verify/${code}`)
  }
}
