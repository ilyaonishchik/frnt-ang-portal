import {Injectable} from '@angular/core'
import {
  ActivatedRouteSnapshot,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router'
import {map, Observable} from 'rxjs'
import {Store} from '@ngrx/store'

import {isSignedInSelector} from '@modules/auth/store/selectors'
import {redirectAction} from '@modules/auth/store/actions/redirect.action'

@Injectable({
  providedIn: 'root',
})
export class SignedInGuard {
  constructor(private store: Store, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    console.log(`SignedInGuard (canActivate): ${state.url}`)
    return this.store.select(isSignedInSelector).pipe(
      map((value) => {
        if (value) {
          return true
        } else {
          return this.checkUrl(state.url)
          // return createUrlTreeFromSnapshot(route, ['/error', 403])
        }
      })
    )
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    console.log(`SignedInGuard (canActivateChild): ${state.url}`)
    return this.store.select(isSignedInSelector)
    // .pipe(map((value) => {return value}))
  }

  canMatch(
    route: Route,
    segments: UrlSegment[]
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    console.log(`SignedInGuard (canMatch): ${route.path}`)
    return this.store.select(isSignedInSelector).pipe(
      map((value) => {
        if (!value) {
          // console.log(route.path, segments.join('/'))
          this.store.dispatch(redirectAction({url: segments.join('/')}))
          return this.router.createUrlTree(['/auth/sign-in'])
          // return this.checkUrl(segments.join('/'))
        }
        return value
      })
    )
  }

  checkUrl(url: string): boolean | UrlTree {
    console.log(`checkUrl: ${url}`)
    if (url === '/') {
      this.router.navigateByUrl('/welcome').then()
    } else {
      this.store.dispatch(redirectAction({url: url}))
      return this.router.createUrlTree(['/auth', 'sign-in'])
    }
    return false
  }
}
