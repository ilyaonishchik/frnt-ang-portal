import {Injectable} from '@angular/core'
import {ActivatedRouteSnapshot, Data, Router, UrlTree} from '@angular/router'
import {map, Observable} from 'rxjs'
import {Store} from '@ngrx/store'
import {currentUserSelector} from '@modules/auth/store/selectors'
import {IUser} from '@shared/interfaces/user.interface'
import {environment} from 'environments/environment'
import {RbacService} from '@shared/services/rbac.service'

@Injectable({
  providedIn: 'root',
})
export class PermissionGuard {
  constructor(
    private store: Store,
    private router: Router,
    private rbacService: RbacService
  ) {}

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
          return this.checkPermission(route.data, user)
        } else {
          return false
        }
      })
    )
  }

  checkPermission(data: Data, user: IUser): boolean | UrlTree {
    let result = false
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
      return this.router.createUrlTree(['/error/403'])
    }
    return result
  }
}
