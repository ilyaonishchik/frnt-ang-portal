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
  take,
  throwError,
} from 'rxjs'

import {AuthService} from '../services/auth.service'
import {EventBusService} from '../services/event-bus.service'
import {PersistenceService} from '../shared/services/persistence.service'

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  private isRefreshing = false
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  )

  constructor(
    private persistenceService: PersistenceService,
    private authService: AuthService,
    private eventBusService: EventBusService
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

    // request = request.clone({
    //   withCredentials: true,
    // })

    return next.handle(authRequest).pipe(
      catchError((error) => {
        // console.log(error)
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) {
            if (!authRequest.url.includes('auth/signin')) {
              return this.handle401Error(authRequest, next)
            }
          }

          if (error.status === 403) {
            if (authRequest.url.includes('auth/refresh')) {
              this.eventBusService.emit({name: 'signout', value: null})
            }
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
          switchMap((token: any) => {
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
      take(1),
      switchMap((token) => next.handle(this.addTokenHeader(request, token)))
    )
  }

  private addTokenHeader(request: HttpRequest<any>, token: string) {
    return request.clone({
      headers: request.headers.set('Authorization', `Bearer ${token}`),
    })
  }
}

export const httpInterceptorProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true},
]
