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

  redirect() {
    this.router.navigate([this.state.redirectUrl])
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
    this.deleteUserInfo()
    let currentUrl = this.router.url
    if (currentUrl === '/welcome') {
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
