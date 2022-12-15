import {Injectable} from '@angular/core'
import {Router} from '@angular/router'

import {Actions, createEffect, ofType} from '@ngrx/effects'
import {of, switchMap, tap} from 'rxjs'

import {PersistenceService} from '@shared/services/persistence.service'
import {LayoutService} from '@shared/modules/layout/services/layout.service'

import {signoutAction, signoutSuccessAction} from '../actions/signout.action'

@Injectable()
export class SignoutEffect {
  constructor(
    private actions$: Actions,
    private persistenceService: PersistenceService,
    private layoutService: LayoutService,
    private router: Router
  ) {}

  signout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signoutAction),
      switchMap(() => {
        this.persistenceService.clearTokens()
        this.persistenceService.clear(true)
        this.layoutService.config.menuMode = 'overlay'
        return of(signoutSuccessAction({url: '/welcome'}))
      })
    )
  )

  afterSignout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(signoutSuccessAction),
        tap((value) => {
          this.router.navigateByUrl(value.url).then()
        })
      ),
    {dispatch: false}
  )

  // redirectAfterSignout$ = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(signoutSuccessAction),
  //       tap(() => {
  //         let currentUrl = this.router.url
  //         if (currentUrl === '/welcome') {
  //           this.router.routeReuseStrategy.shouldReuseRoute = () => false
  //           this.router.onSameUrlNavigation = 'reload'
  //           this.router.navigateByUrl(currentUrl).then((_) => {})
  //         } else {
  //           this.router.navigateByUrl('/welcome').then((_) => {})
  //         }
  //         this.router.navigateByUrl('/').then((_) => {})
  //       })
  //     ),
  //   {dispatch: false}
  // )
}
