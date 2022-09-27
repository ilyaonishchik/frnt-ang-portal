import {Injectable} from '@angular/core'
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanLoad,
  Data,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router'
import {map, Observable} from 'rxjs'
import {Store} from '@ngrx/store'

import {IAuthState} from '../modules/auth/types/auth-state.interface'
import {
  currentUserSelector,
  isSignedInSelector,
} from '../modules/auth/store/selectors'
import {ICurrentUser} from '../shared/types/current-user.interface'

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
    return this.store.select(currentUserSelector).pipe(
      map((value) => {
        console.log('SignedInGuard canActivate currentUser:', value)
        if (value) {
          return this.checkRole(route.data, value)
        } else {
          return false
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
    return this.store.select(currentUserSelector).pipe(
      map((value) => {
        console.log('SignedInGuard canActivateChild currentUser:', value)
        if (value) {
          return this.checkPermission(childRoute.data, value)
        } else {
          return false
        }
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
        console.log('SignedInGuard canLoad isSignedIn:', value)
        if (value === true) {
          return true
        } else {
          this.router.navigateByUrl('/welcome').then((_) => {})
          return false
        }
      })
    )
  }

  checkRole(data: Data, user: ICurrentUser): boolean {
    let result: boolean = false
    if (data['role']) {
      for (const key in user.roles) {
        if (user.roles[key].name === data['role']) {
          result = true
          break
        }
      }
    } else {
      result = true
    }
    return result
  }

  checkPermission(data: Data, user: ICurrentUser): boolean {
    let result: boolean = false
    if (data['permission']) {
      for (const key in user.permissions) {
        if (user.permissions[key].name === data['permission']) {
          result = true
          break
        }
      }
    } else {
      result = true
    }
    return result
  }
}
