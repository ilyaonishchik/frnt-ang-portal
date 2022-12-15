import {Injectable} from '@angular/core'
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanLoad,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router'
import {map, Observable} from 'rxjs'
import {Store} from '@ngrx/store'

import {isSignedInSelector} from '@modules/auth/store/selectors'

@Injectable({
  providedIn: 'root',
})
export class SignedInGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(private store: Store, private router: Router) {}

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
        if (value) {
          return true
        } else {
          return this.checkUrl(state.url)
        }
      })
    )
  }

  canActivateChild():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.store.select(isSignedInSelector).pipe(
      map((value) => {
        return value
      })
    )
  }

  canLoad():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.store.select(isSignedInSelector).pipe(
      map((value) => {
        if (value) {
          return true
        } else {
          this.router.navigateByUrl('/welcome').then()
          return false
        }
      })
    )
  }

  checkUrl(url: string): boolean {
    if (url === '/') {
      this.router.navigateByUrl('/welcome').then()
      return false
    }
    return true
  }
}
