import {Injectable} from '@angular/core'
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http'
import {Router} from '@angular/router'

import {catchError, Observable, retry, throwError} from 'rxjs'

import {IUserReset, IUserSignIn, IUserSignUp} from '../types/user'
import {IErrorMessage} from '../types/error'
import {LayoutService} from './layout.service'
import {StorageService} from './storage.service'

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

  constructor(
    public layoutService: LayoutService,
    private storageService: StorageService,
    private http: HttpClient,
    private router: Router
  ) {
    this.state.userSignedIn = this.storageService.getToken() !== null
  }

  redirect(url?: string) {
    if (url) {
      this.router.navigateByUrl(url).then((_) => {})
    } else {
      this.router.navigateByUrl(this.state.redirectUrl).then((_) => {})
    }
  }

  signIn(user: IUserSignIn): Observable<any> {
    const params = new HttpParams({
      fromObject: {username: user.username, password: user.password},
    })
    return this.http
      .post('/api/v1/auth/signin', params, httpOptions)
      .pipe(retry(2), catchError(this.handleError))
  }

  signUp(user: IUserSignUp): Observable<any> {
    return this.http
      .post('/api/v1/auth/signup', user)
      .pipe(retry(2), catchError(this.handleError))
  }

  verifyCode(code: string): Observable<any> {
    return this.http
      .get('/api/v1/auth/verify/' + code)
      .pipe(retry(1), catchError(this.handleError))
  }

  signOut() {
    this.storageService.clean()
    this.state.userSignedIn = false
    this.checkLayoutMenuMode()
    let currentUrl = this.router.url
    if (currentUrl === '/welcome') {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false
      this.router.onSameUrlNavigation = 'reload'
      this.router.navigateByUrl(currentUrl).then((_) => {})
    } else {
      this.router.navigateByUrl('/welcome').then((_) => {})
    }
  }

  resetPassword(user: IUserReset): Observable<any> {
    return this.http
      .post('/api/v1/auth/reset', user)
      .pipe(retry(1), catchError(this.handleError))
  }

  refreshToken(token: string) {
    return this.http.post('', {refreshToken: token}, httpOptions)
  }

  checkLayoutMenuMode(): void {
    this.layoutService.config.menuMode = this.state.userSignedIn
      ? 'static'
      : 'overlay'
  }

  handleError(e: any) {
    let errorMessage: IErrorMessage

    switch (e.constructor) {
      case HttpErrorResponse:
        switch (e.status) {
          case 400:
            errorMessage = {
              code: e.error.error,
              message: e.error.message,
            }
            break
          case 422:
            errorMessage = {
              code: e.error.detail[0].type,
              message: e.error.detail[0].msg,
            }
            break
          default:
            errorMessage = {
              code: 'error',
              message: e.statusText,
            }
            break
        }
        break
      case ErrorEvent:
        errorMessage = {
          code: 'errorEvent',
          message: e.error.message,
        }
        break
      default:
        errorMessage = {
          code: 'errorDefault',
          message: e.error.message,
        }
    }

    return throwError(() => {
      return errorMessage
    })
  }
}
