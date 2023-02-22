import {Injectable} from '@angular/core'
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanMatch,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router'
import {map, Observable} from 'rxjs'
import {Store} from '@ngrx/store'

import {isSignedInSelector} from '@modules/auth/store/selectors'

@Injectable({
  providedIn: 'root',
})
export class SignedInGuard implements CanActivate, CanActivateChild, CanMatch {
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
    return this.store.select(isSignedInSelector).pipe(
      map((value) => {
        return value
      })
    )
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
          return this.checkUrl(segments[0].path)
        }
        return value
      })
    )
  }

  checkUrl(url: string): boolean {
    console.log(`checkUrl: ${url}`)
    if (url === '/') {
      this.router.navigateByUrl('/welcome').then()
    } else {
      this.router.navigateByUrl('/auth/sign-in').then()
    }
    return false
  }
}
