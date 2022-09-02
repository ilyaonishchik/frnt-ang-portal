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
import {Observable} from 'rxjs'
import {AuthService} from '../services/auth.service'
import {Location} from '@angular/common'

@Injectable({
  providedIn: 'root',
})
export class SignedOutGuard implements CanActivate, CanLoad {
  constructor(public authService: AuthService, private location: Location) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // console.log('SignedOutGuard A', this.authService.state.userSignedIn)
    return this.checkLogout(route.url[0])
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
    return true
  }

  checkLogout(url: UrlSegment): boolean {
    if (this.authService.state.userSignedIn) {
      if (url.path === 'auth') {
        this.location.back()
      }
      return false
    }
    return true
  }
}
