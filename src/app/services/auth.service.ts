import {Injectable} from '@angular/core'
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http'
import {Router} from '@angular/router'

import {catchError, Observable, retry, tap, throwError} from 'rxjs'

import {
  // IPermission,
  // IRole,
  IUser,
  IUserInfo,
  IUserReset,
  IUserSignIn,
  IUserSignUp,
} from '../types/user'
import {IErrorMessage} from '../types/error'
import {LayoutService} from './layout.service'
import {EventBusService} from './event-bus.service'
import {ErrorService} from './error.service'
import {IToken} from '../types/token'
import {AppService} from './app.service'
import {PersistenceService} from '../shared/services/persistence.service'

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
  }),
}

interface IAuthState {
  userSignedIn: boolean
  redirectUrl: string
  userInfo: IUserInfo
}

// class UserInfo implements IUserInfo {
//   id = undefined
//   username = undefined
// }

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  state: IAuthState = {
    userSignedIn: false,
    redirectUrl: '/',
    userInfo: {},
  }
  private readonly apiUrl: string = ''

  constructor(
    public layoutService: LayoutService,
    private persistenceService: PersistenceService,
    private appService: AppService,
    private eventBusService: EventBusService,
    private errorService: ErrorService,
    private http: HttpClient,
    private router: Router
  ) {
    this.apiUrl = this.appService.urlApiAuth
    this.checkState()
  }

  redirect(url?: string) {
    if (url) {
      this.router.navigateByUrl(url).then((_) => {})
    } else {
      this.router.navigateByUrl(this.state.redirectUrl).then((_) => {})
    }
  }

  signIn(user: IUserSignIn): Observable<IToken> {
    const params = new HttpParams({
      fromObject: {username: user.username, password: user.password},
    })
    return this.http
      .post<IToken>(this.apiUrl + 'signin', params, httpOptions)
      .pipe(
        tap((token) => {
          this.persistenceService.setAccessToken(token.access_token)
          this.persistenceService.setRefreshToken(token.refresh_token)
          this.state.userSignedIn = true
        }),
        catchError(this.errorHandler)
      )
  }

  signUp(user: IUserSignUp): Observable<IUser> {
    return this.http
      .post<IUser>(this.apiUrl + 'signup', user)
      .pipe(catchError(this.errorHandler))
  }

  verifyCode(code: string): Observable<any> {
    return this.http
      .get(this.apiUrl + 'verify/' + code)
      .pipe(retry(1), catchError(this.errorHandler))
  }

  signOut() {
    this.persistenceService.clear()
    this.state.userInfo = {}
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
      .get(this.apiUrl + 'reset/' + user.email)
      .pipe(catchError(this.errorHandler))
  }

  refreshToken(token: string) {
    return this.http
      .get(this.apiUrl + 'refresh/' + token)
      .pipe(catchError(this.errorHandler))
  }

  checkLayoutMenuMode(): void {
    this.layoutService.config.menuMode = this.state.userSignedIn
      ? 'static'
      : 'overlay'
  }

  getUserMeInfo(): Observable<IUserInfo> {
    return this.http
      .get<IUserInfo>(this.apiUrl + 'users/me')
      .pipe(catchError(this.errorHandler))
  }

  checkState(): void {
    // console.log('checkState')
    // console.log(this.state)
    if (this.persistenceService.getAccessToken()) {
      this.state.userSignedIn = true
      // console.log(this.state.userInfo)
    }
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

    // this.errorService.handle(errorMessage.message)

    return throwError(() => {
      return errorMessage
    })
  }
}
