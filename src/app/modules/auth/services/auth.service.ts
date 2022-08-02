import {Injectable} from '@angular/core'
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http'
import {catchError, Observable, retry, throwError} from 'rxjs'
import {Router} from '@angular/router'
import {UserInterface} from '../../../types/user'

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
  }),
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  setToken(token: string) {
    localStorage.setItem('token', token)
  }

  getToken() {
    return localStorage.getItem('token')
  }

  deleteToken() {
    localStorage.removeItem('token')
  }

  getUserById(id: number) {
    return this.http.get<UserInterface>(`/api/v1/users/${id}`)
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

  logout() {
    this.deleteToken()
    this.router.navigate(['/'])
  }

  handleError(error: any) {
    let errorMessage: string = ''

    switch (error.constructor) {
      case HttpErrorResponse:
        switch (error.status) {
          case 400:
            errorMessage = error.error.message
            break
          default:
            errorMessage = error.statusText
            break
        }
        break
      case ErrorEvent:
        errorMessage = error.error.message
        break
      default:
        errorMessage = error.error.message
    }

    return throwError(() => {
      return errorMessage
    })
  }
}
