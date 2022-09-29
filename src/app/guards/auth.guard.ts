import {Injectable} from '@angular/core'
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanDeactivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router'
import {Observable} from 'rxjs'
import {AuthService} from '../shared/services/auth.service'
// import {MenuService} from '../services/menu.service'

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanDeactivate<unknown> {
  constructor(
    public authService: AuthService,
    // private menuService: MenuService,
    private router: Router
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // console.log('AuthGuard A url: %s', state.url)
    // console.log(route.fragment)
    // console.log('AuthGuard:', this.authService.state.userSignedIn)
    //TODO Добавить контрольна админские права
    if (!this.authService.state.userSignedIn) {
      if (state.url === '/') {
        this.router.navigate(['welcome'])
      } else {
        this.router.navigate(['auth/sign-in'])
      }
      return false
    }
    return true
  }
  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return true
  }
}
