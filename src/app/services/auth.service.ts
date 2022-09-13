import {Injectable} from '@angular/core'
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http'
import {Router} from '@angular/router'

import {catchError, delay, Observable, retry, throwError} from 'rxjs'

import {IUserReset, IUserSignIn, IUserSignUp} from '../types/user'
import {IErrorMessage} from '../types/error'
import {LayoutService} from './layout.service'
import {StorageService} from './storage.service'
import {EventBusService} from './event-bus.service'
import {ErrorService} from './error.service'

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
    private eventBusService: EventBusService,
    private errorService: ErrorService,
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
      .pipe(delay(200), catchError(this.errorHandler))
  }

  signUp(user: IUserSignUp): Observable<any> {
    return this.http
      .post('/api/v1/auth/signup', user)
      .pipe(retry(2), catchError(this.errorHandler))
  }

  verifyCode(code: string): Observable<any> {
    return this.http
      .get('/api/v1/auth/verify/' + code)
      .pipe(retry(1), catchError(this.errorHandler))
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
      .pipe(retry(1), catchError(this.errorHandler))
  }

  refreshToken(token: string) {
    return this.http
      .get('/api/v1/auth/refresh/' + token)
      .pipe(catchError(this.errorHandler))
  }

  checkLayoutMenuMode(): void {
    this.layoutService.config.menuMode = this.state.userSignedIn
      ? 'static'
      : 'overlay'
  }

  getUserMeInfo() {
    return this.http.get('/api/v1/users/me').pipe(catchError(this.errorHandler))
  }

  private errorHandler(e: any) {
    let errorMessage: IErrorMessage
    // console.log('handleError: %s', JSON.stringify(e))
    switch (e.constructor) {
      case HttpErrorResponse:
        switch (e.status) {
          case 400:
            errorMessage = {
              status: e.status,
              code: e.error.error,
              message: e.error.message,
            }
            break
          // case 403:
          //   console.log('handleError 403: %s', e.error.message)
          //   let event: IEvent = {name: 'signout', value: null}
          //   console.log(event)
          //   this.eventBusService.emit(event)
          //   break
          case 422:
            errorMessage = {
              status: e.status,
              code: e.error.detail[0].type,
              message: e.error.detail[0].msg,
            }
            break
          default:
            errorMessage = {
              status: e.status,
              code: 'error',
              message: e.statusText,
            }
            break
        }
        break
      case ErrorEvent:
        errorMessage = {
          status: e.status,
          code: 'errorEvent',
          message: e.error.message,
        }
        break
      default:
        errorMessage = {
          status: e.status,
          code: 'errorDefault',
          message: e.message,
        }
    }

    this.errorService.handle(errorMessage.message)

    return throwError(() => {
      return errorMessage
    })
  }
}
