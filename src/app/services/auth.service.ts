import {Injectable} from '@angular/core'
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http'
import {catchError, Observable, retry, throwError} from 'rxjs'
import {Router} from '@angular/router'
import {UserInterface} from '../types/user'

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

  getTestUser() {
    const user: UserInterface = {
      id: 0,
      name: 'User',
      email: 'email@example.com',
      // avatar: 'assets/img/avatars/default.png',
    }
    return user
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
    let currentUrl = this.router.url
    if (currentUrl === '/welcome') {
      // window.location.reload()
      // this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      //   this.router.navigate([currentUrl])
      // })
      this.router.routeReuseStrategy.shouldReuseRoute = () => false
      this.router.onSameUrlNavigation = 'reload'
      this.router.navigate([currentUrl])
    } else {
      this.router.navigate(['welcome'])
    }
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
