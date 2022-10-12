import {Injectable} from '@angular/core'
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router'
import {map, Observable} from 'rxjs'
import {Store} from '@ngrx/store'

import {IAuthState} from '../modules/auth/interfaces/auth-state.interface'
import {isSignedInSelector} from '../modules/auth/store/selectors'

@Injectable({
  providedIn: 'root',
})
export class SignedInGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(private store: Store<IAuthState>, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.store.select(isSignedInSelector).pipe(
      map((value) => {
        if (value === true) {
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
    return this.store.select(isSignedInSelector).pipe(
      map((value) => {
        return value === true
      })
    )
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.store.select(isSignedInSelector).pipe(
      map((value) => {
        if (value === true) {
          return true
        } else {
          this.router.navigateByUrl('/welcome').then((_) => {})
          return false
        }
      })
    )
  }

  checkUrl(url: string): boolean {
    if (url === '/') {
      this.router.navigateByUrl('/welcome').then((_) => {})
      return false
    }
    return true
  }
}
