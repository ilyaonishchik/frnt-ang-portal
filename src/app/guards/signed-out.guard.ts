import {Injectable} from '@angular/core'
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router'
import {Location} from '@angular/common'
import {map, Observable} from 'rxjs'

import {AuthService} from '../services/auth.service'
import {Store} from '@ngrx/store'
import {isAnonymousSelector} from '../modules/auth/store/selectors'
import {IAuthState} from '../modules/auth/types/auth-state.interface'

@Injectable({
  providedIn: 'root',
})
export class SignedOutGuard implements CanActivate, CanLoad {
  constructor(
    private store: Store<IAuthState>,
    private authService: AuthService,
    private location: Location
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // console.log('SignedOutGuard A url: %s', route.url[0])
    // return this.checkLogout(route.url[0])
    return this.store.select(isAnonymousSelector).pipe(
      map((value) => {
        console.log('SignedOutGuard canActivate isAnonymous:', value)
        return value
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
    // console.log('SignedOutGuard L', this.authService.state.userSignedIn)
    // console.log(route)
    return this.store.select(isAnonymousSelector).pipe(
      map((value) => {
        console.log('SignedOutGuard canLoad isAnonymous:', value)
        if (!value) {
          this.location.back()
        }
        return value
      })
    )
  }
}
