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
    // console.log('SignedInGuard A', this.authService.state.userSignedIn)
    return this.checkLogin(url)
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let url = `/${route.path}`
    // console.log('SignedInGuard L', this.authService.state.userSignedIn)
    return this.checkLogin(url)
  }

  checkLogin(url: string): boolean {
    if (this.authService.state.userSignedIn) {
      return true
    }
    this.authService.state.redirectUrl = url
    this.router.navigate(['/auth/sign-in'])
    return false
  }
}
