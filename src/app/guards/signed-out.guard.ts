import {Injectable} from '@angular/core'
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanMatch,
  Route,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router'
import {Location} from '@angular/common'
import {map, Observable} from 'rxjs'
import {Store} from '@ngrx/store'

import {isAnonymousSelector} from '@modules/auth/store/selectors'
import {IAuthState} from '@modules/auth/interfaces/auth-state.interface'

@Injectable({
  providedIn: 'root',
})
export class SignedOutGuard implements CanActivate, CanMatch {
  constructor(private store: Store<IAuthState>, private location: Location) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    console.log(`SignedOutGuard (canActivate): ${state.url}`)
    return this.store.select(isAnonymousSelector).pipe(
      map((value) => {
        if (value) {
          return value
        } else {
          this.location.back()
          return false
        }
      })
    )
  }

  canMatch(
    route: Route
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    console.log(`SignedOutGuard (canMatch): ${route.path}`)
    return this.store.select(isAnonymousSelector).pipe(
      map((value) => {
        if (!value) {
          this.location.back()
        }
        return value
      })
    )
  }
}
