import {Injectable} from '@angular/core'
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http'
import {Router} from '@angular/router'

import {catchError, Observable, retry, throwError} from 'rxjs'

import {
  IUserReset,
  IUserSignIn,
  IUserSignUp,
  UserInterface,
} from '../types/user'

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
  }),
}

interface AuthState {
  userSignedIn: boolean
  redirectUrl: string
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  state: AuthState = {
    userSignedIn: false,
    redirectUrl: '/',
  }

  constructor(private http: HttpClient, private router: Router) {
    this.state.userSignedIn = this.getToken() !== null
  }

  redirect(url?: string) {
    if (url) {
      this.router.navigateByUrl(url).then((r) => {})
    } else {
      this.router.navigateByUrl(this.state.redirectUrl).then((r) => {})
    }
  }

  setToken(token: string) {
    localStorage.setItem('token', token)
    this.state.userSignedIn = true
  }

  getToken() {
    return localStorage.getItem('token')
  }

  deleteToken() {
    localStorage.removeItem('token')
    this.state.userSignedIn = false
  }

  getUserById(id: number) {
    return this.http.get<UserInterface>(`/api/v1/users/${id}`)
  }

  getTestUser() {
    const user: UserInterface = {
      id: 0,
      name: 'User',
      email: 'email@example.com',
      avatar: 'assets/img/avatars/default.png',
      desc: 'Test User',
    }
    return user
  }

  setUserInfo(user: UserInterface) {
    localStorage.setItem('user', JSON.stringify(user))
    // this.state.userInfo = user
  }

  getUserInfo() {
    const user = localStorage.getItem('user')
    if (user) {
      return JSON.parse(user)
    }
    return null
  }

  deleteUserInfo() {
    localStorage.removeItem('user')
  }

  signIn(user: IUserSignIn): Observable<any> {
    const params = new HttpParams({
      fromObject: {username: user.name, password: user.password},
    })
    return this.http
      .post('/api/v1/auth/login', params, httpOptions)
      .pipe(retry(1), catchError(this.handleError))
  }

  signUp(user: IUserSignUp): Observable<any> {
    return this.http
      .post('/api/v1/auth/signup', user)
      .pipe(retry(1), catchError(this.handleError))
  }

  signOut() {
    this.deleteToken()
    this.deleteUserInfo()
    let currentUrl = this.router.url
    if (currentUrl === '/welcome') {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false
      this.router.onSameUrlNavigation = 'reload'
      this.router.navigateByUrl(currentUrl).then((r) => {})
    } else {
      this.router.navigateByUrl('/welcome').then((r) => {})
    }
  }

  resetPassword(user: IUserReset): Observable<any> {
    return this.http
      .post('/api/v1/auth/reset', user)
      .pipe(retry(1), catchError(this.handleError))
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
