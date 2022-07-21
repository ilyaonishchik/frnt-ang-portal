import {Injectable} from '@angular/core'
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http'
import {catchError, Observable, retry, throwError} from 'rxjs'

import {AppService} from '../../../services/app.service'

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
  }),
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private appService: AppService, private http: HttpClient) {}

  setToken(token: string) {
    localStorage.setItem('token', token)
  }

  getToken() {
    return localStorage.getItem('token')
  }

  deleteToken() {
    localStorage.removeItem('token')
  }

  isSignIn() {
    return this.getToken() !== null
  }

  signIn(userInfo: {username: string; password: string}): Observable<any> {
    const params = new HttpParams({
      fromObject: {username: userInfo.username, password: userInfo.password},
    })
    return this.http
      .post('/api/v1/auth/login', params, httpOptions)
      .pipe(retry(1), catchError(this.handleError))
  }

  handleError(error: any) {
    let errorMessage = ''
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message
    } else {
      errorMessage = `Error code: ${error.status}\nMessage: ${error.error.message}`
    }
    window.alert(errorMessage)
    return throwError(() => {
      return errorMessage
    })
  }
}
