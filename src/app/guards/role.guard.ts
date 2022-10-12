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
import {IAuthState} from '../modules/auth/interfaces/auth-state.interface'
import {currentUserSelector} from '../modules/auth/store/selectors'
import {environment} from '../../environments/environment'

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate, CanActivateChild, CanLoad {
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
          return this.checkRole(route.data, user)
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
            return this.checkRole(route.data, user)
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

  checkRole(data: Data, user: ICurrentUser): boolean {
    let result: boolean = false
    if (data['role']) {
      for (const key in user.roles) {
        if (user.roles[key].code === environment.adminRoleCode) {
          result = true
          break
        }
        if (user.roles[key].code === data['role']) {
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
