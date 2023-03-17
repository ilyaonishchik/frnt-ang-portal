import {Injectable} from '@angular/core'
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
} from '@angular/common/http'
import {
  BehaviorSubject,
  catchError,
  filter,
  Observable,
  switchMap,
  throwError,
} from 'rxjs'
import {Store} from '@ngrx/store'

import {PersistenceService} from '@shared/services/persistence.service'
import {AuthService} from '@modules/auth/services/auth.service'
import {IAuthState} from '@modules/auth/interfaces/auth-state.interface'
import {signoutAction} from '@modules/auth/store/actions/signout.action'
import {ToastService} from '@shared/services/toast.service'
import {IBackendErrors} from '@shared/interfaces/backend-errors.interface'
import {responseToErrors} from '@shared/functions/error.function'
import {IToken} from '@modules/auth/interfaces/token.interface'

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  private isRefreshing = false
  private refreshTokenSubject = new BehaviorSubject<any>(null)

  constructor(
    private authService: AuthService,
    private persistenceService: PersistenceService,
    private toastService: ToastService,
    private store: Store<IAuthState>
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let authRequest = request

    const token = this.persistenceService.getAccessToken()
    if (token != null) {
      authRequest = this.addTokenHeader(request, token)
    }
    return next.handle(authRequest).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse) {
          switch (error.status) {
            case 401:
              if (!authRequest.url.includes('auth/signin')) {
                return this.handle401Error(authRequest, next)
              }
              break
            case 403:
              if (authRequest.url.includes('auth/refresh')) {
                this.store.dispatch(signoutAction())
              }
              this.showMessage(responseToErrors(error))
              break
            default:
              this.showMessage(responseToErrors(error))
          }
        }
        return throwError(error)
      })
    )
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true
      this.refreshTokenSubject.next(null)
      const token = this.persistenceService.getRefreshToken()
      if (token) {
        return this.authService.refreshToken(token).pipe(
          switchMap((token: IToken) => {
            this.isRefreshing = false
            this.persistenceService.setAccessToken(token.access_token)
            this.refreshTokenSubject.next(token.access_token)
            return next.handle(this.addTokenHeader(request, token.access_token))
          }),
          catchError((err) => {
            this.isRefreshing = false
            this.persistenceService.clear()
            return throwError(err)
          })
        )
      }
    }
    return this.refreshTokenSubject.pipe(
      filter((token) => token !== null),
      switchMap((token) => next.handle(this.addTokenHeader(request, token)))
    )
  }

  private addTokenHeader(request: HttpRequest<any>, token: string) {
    return request.clone({
      headers: request.headers.set('Authorization', `Bearer ${token}`),
    })
  }

  private showMessage(errors: IBackendErrors): void {
    this.toastService.showBackendErrors(errors)
  }
}

export const httpInterceptorProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true},
]
