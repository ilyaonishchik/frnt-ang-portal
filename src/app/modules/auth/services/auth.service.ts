import {Injectable} from '@angular/core'
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http'
import {Observable} from 'rxjs'

import {environment} from 'environments/environment'
import {ISignupRequest} from '../interfaces/signup-request.interface'
import {ISignupResponse} from '../interfaces/signup-response.interface'
import {ISigninRequest} from '../interfaces/signin-request.interface'
import {ISigninResponse} from '../interfaces/signin-response.interface'
import {IToken} from '../interfaces/token.interface'
import {IVerifyResponse} from '../interfaces/verify-response.interface'
import {IUser, IUserReset} from '@shared/interfaces/user.interface'
import {Store} from '@ngrx/store'
import {isSignedInSelector} from '@modules/auth/store/selectors'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private store: Store) {}

  getCurrentUser(): Observable<IUser> {
    return this.http.get<IUser>(`${environment.urlApiAuth}/users/me`)
  }

  signUp(data: ISignupRequest): Observable<ISignupResponse> {
    return this.http.post<ISignupResponse>(
      `${environment.urlApiAuth}/signup`,
      data
    )
    // .pipe(map((response: ISignupResponse) => response))
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
    // .pipe(map((response: ISigninResponse) => response))
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

  isSignedIn(): Observable<boolean> {
    return this.store.select(isSignedInSelector)
  }
}
