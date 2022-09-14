import {Injectable} from '@angular/core'
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router'
import {Observable} from 'rxjs'
import {AuthService} from '../services/auth.service'

@Injectable({
  providedIn: 'root',
})
export class SignedInGuard implements CanActivate, CanLoad {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let url: string = state.url
    return this.checkLogin(route, url)
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // let url = `/${route.path}`
    // return this.checkLogin(url)
    return true
  }

  checkLogin(route: ActivatedRouteSnapshot, url: string): boolean {
    let urlPath = route.url[0].path
    if (this.authService.state.userSignedIn) {
      if (urlPath === 'admin') {
        if (route.data['role'] && route.data['role'] === 'ROLE_ADMIN') {
          return true
        }
      } else {
        return true
      }
    }
    this.authService.state.redirectUrl = url
    this.router.navigate(['/auth/sign-in']).then((_) => {})
    return false
  }
}
