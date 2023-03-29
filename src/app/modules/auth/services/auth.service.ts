import {Injectable} from '@angular/core'
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http'
import {map, Observable} from 'rxjs'

import {environment} from 'environments/environment'
import {ISignupRequest} from '../interfaces/signup-request.interface'
import {ISignupResponse} from '../interfaces/signup-response.interface'
import {ISigninRequest} from '../interfaces/signin-request.interface'
import {ISigninResponse} from '../interfaces/signin-response.interface'
import {IToken} from '../interfaces/token.interface'
import {IVerifyResponse} from '../interfaces/verify-response.interface'
import {IUser, IUserReset} from '@shared/interfaces/user.interface'
import {Store} from '@ngrx/store'
import {
  currentUserSelector,
  isSignedInSelector,
} from '@modules/auth/store/selectors'
import {IItemCRUD} from '@shared/interfaces/rbac.interface'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private store: Store) {}

  getCurrentUser(): Observable<IUser> {
    console.log('AuthService: getCurrentUser')
    return this.http.get<IUser>(`${environment.urlApiAuth}/users/me`)
  }

  signUp(data: ISignupRequest): Observable<ISignupResponse> {
    return this.http.post<ISignupResponse>(
      `${environment.urlApiAuth}/signup`,
      data
    )
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

    return this.http.post<ISigninResponse>(
      `${environment.urlApiAuth}/signin`,
      params,
      httpOptions
    )
  }

  resetPassword(user: IUserReset): Observable<any> {
    return this.http.get(`${environment.urlApiAuth}/reset/${user.email}`)
  }

  refreshToken(token: string): Observable<IToken> {
    return this.http.get<IToken>(`${environment.urlApiAuth}/refresh/${token}`)
  }

  verifyCode(code: string): Observable<IVerifyResponse> {
    return this.http.get<IVerifyResponse>(
      `${environment.urlApiAuth}/verify/${code}`
    )
  }

  private isSignedIn(): Observable<boolean> {
    return this.store.select(isSignedInSelector)
  }

  checkPermission(code: string): Observable<boolean> {
    console.log(`Auth service: checkPermission(${code})`)
    return this.store.select(currentUserSelector).pipe(
      map((user) => {
        if (user) {
          if (
            user.permissions.findIndex((item) => {
              return item.code === environment.adminPermissionCode
            }) != -1
          ) {
            return true
          } else {
            return (
              user.permissions.findIndex((item) => {
                return item.code === code
              }) != -1
            )
          }
        } else {
          return false
        }
      })
    )
  }

  getCRUDPermissions(item: string | null): Observable<IItemCRUD> {
    return this.store.select(currentUserSelector).pipe(
      map((user) => {
        if (user) {
          if (
            user.permissions.findIndex((item) => {
              return item.code === environment.adminPermissionCode
            }) != -1
          ) {
            return {
              create: true,
              read: true,
              update: true,
              delete: true,
            }
          } else {
            return {
              create:
                user.permissions.findIndex((permission) => {
                  return permission.code === `${item}:create`
                }) != -1,
              read:
                user.permissions.findIndex((permission) => {
                  return permission.code === `${item}:read`
                }) != -1,
              update:
                user.permissions.findIndex((permission) => {
                  return permission.code === `${item}:update`
                }) != -1,
              delete:
                user.permissions.findIndex((permission) => {
                  return permission.code === `${item}:delete`
                }) != -1,
            }
          }
        } else {
          return {
            create: false,
            read: false,
            update: false,
            delete: false,
          }
        }
      })
    )
  }
}
