import {Injectable} from '@angular/core'
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router'
import {map, Observable, tap} from 'rxjs'
import {AuthService} from '../services/auth.service'
import {select, Store} from '@ngrx/store'
import {IAuthState} from '../modules/auth/types/auth-state.interface'
import {
  isSignedInSelector,
  redirectUrlSelector,
} from '../modules/auth/store/selectors'
import {redirectAction} from '../modules/auth/store/actions/redirect.action'
import {getCurrentUserAction} from '../modules/auth/store/actions/get-current-user.action'

@Injectable({
  providedIn: 'root',
})
export class SignedInGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(
    private store: Store<IAuthState>,
    private authService: AuthService,
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
    // let url: string = state.url
    // return this.checkLogin(route, url)
    console.log('SignedInGuard canActivate')
    return this.store.select(isSignedInSelector).pipe(
      map((value) => {
        console.log('isSignedInSelector', value)
        if (value === true) {
          return true
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
    console.log('SignedInGuard canActivateChild')
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
    console.log('SignedInGuard canLoad getCurrentUserAction')
    this.store.dispatch(getCurrentUserAction())
    console.log('SignedInGuard canLoad isSignedInSelector')
    return this.store.select(isSignedInSelector).pipe(
      map((value) => {
        console.log('isSignedInSelector', value)
        if (value === true) {
          return true
        } else {
          this.router.navigateByUrl('/welcome').then((_) => {})
          return false
        }
      })
    )
    // getRedirectUrl$.unsubscribe()
    // let url = `/${route.path}`
    // return this.store.select(isSignedInSelector).pipe(
    //   map((value) => {
    //     if (value === true) {
    //       return true
    //     } else {
    //       this.store.dispatch(redirectAction({url: url}))
    //       this.router.navigateByUrl('/auth/sign-in').then((_) => {})
    //       return false
    //     }
    //   })
    // )

    // return true
    // return this.checkLogin(url)
    // return this.store.select(isSignedInSelector).pipe(
    //   map((value) => {
    //     if (value === true) {
    //       return true
    //     } else {
    //       // this.store.dispatch(signinRedirectAction({url: '/auth/sign-in'}))
    //       // this.router.navigateByUrl('/auth/sign-in').then((_) => {})
    //       return false
    //     }
    //   })
    // )
  }

  checkLogin(route: ActivatedRouteSnapshot, url: string): boolean {
    // let urlPath = route.url[0].path
    if (this.authService.state.userSignedIn) {
      // if (urlPath === 'admin1') {
      //   if (
      //     route.data['role'] &&
      //     this.authService.state.userInfo.roles.indexOf(route.data['role']) !==
      //       -1
      //   ) {
      //     return true
      //   }
      // } else {
      return true
      // }
    }
    this.authService.state.redirectUrl = url
    this.router.navigate(['/auth/sign-in']).then((_) => {})
    return false
  }
}
