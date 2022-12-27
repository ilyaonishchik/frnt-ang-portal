import {Injectable} from '@angular/core'
import {CanActivate, CanLoad, UrlTree} from '@angular/router'
import {Location} from '@angular/common'
import {map, Observable} from 'rxjs'
import {Store} from '@ngrx/store'

import {isAnonymousSelector} from '@modules/auth/store/selectors'
import {IAuthState} from '@modules/auth/interfaces/auth-state.interface'

@Injectable({
  providedIn: 'root',
})
export class SignedOutGuard implements CanActivate, CanLoad {
  constructor(private store: Store<IAuthState>, private location: Location) {}

  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.store.select(isAnonymousSelector).pipe(
      map((value) => {
        if (value) {
          return value
        } else {
          this.location.back()
          return false
        }
      })
    )
  }

  canLoad():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.store.select(isAnonymousSelector).pipe(
      map((value) => {
        if (!value) {
          this.location.back()
        }
        return value
      })
    )
  }
}
