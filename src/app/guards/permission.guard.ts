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

import {ICurrentUser} from '../shared/interfaces/current-user.interface'
import {environment} from '../../environments/environment'
import {IAuthState} from '../modules/auth/interfaces/auth-state.interface'
import {currentUserSelector} from '../modules/auth/store/selectors'

@Injectable({
  providedIn: 'root',
})
export class PermissionGuard implements CanActivate, CanActivateChild, CanLoad {
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
      map((user) => {
        if (user) {
          return this.checkPermission(route.data, user)
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
    return true
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.store.select(currentUserSelector).pipe(
      map((user) => {
        if (user) {
          if (route.data) {
            return this.checkPermission(route.data, user)
          } else {
            return true
          }
        } else {
          this.router.navigateByUrl('/welcome').then((_) => {})
          return false
        }
      })
    )
  }

  checkPermission(data: Data, user: ICurrentUser): boolean {
    let result: boolean = false
    if (data['permission']) {
      for (const key in user.permissions) {
        if (user.permissions[key].code === environment.adminPermissionCode) {
          result = true
          break
        }
        if (user.permissions[key].code === data['permission']) {
          result = true
          break
        }
      }
    } else {
      result = true
    }
    if (!result) {
      this.router.navigateByUrl('/error/403').then((_) => {})
    }
    return result
  }
}
