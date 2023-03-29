import {Injectable} from '@angular/core'
import {
  ActivatedRouteSnapshot,
  Data,
  Route,
  Router,
  UrlTree,
} from '@angular/router'
import {map, Observable} from 'rxjs'
import {Store} from '@ngrx/store'

import {currentUserSelector} from '@modules/auth/store/selectors'
import {environment} from 'environments/environment'
import {IUser} from '@shared/interfaces/user.interface'

@Injectable({
  providedIn: 'root',
})
export class RoleGuard {
  constructor(private store: Store, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot
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

  canMatch(
    route: Route
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
          this.router.navigateByUrl('/welcome').then()
          return false
        }
      })
    )
  }

  checkRole(data: Data, user: IUser): boolean {
    // console.log(`RoleGuard (checkRole): ${data['role']}`)
    let result = false
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
      this.router.navigateByUrl('/error/403').then()
    }
    return result
  }
}
