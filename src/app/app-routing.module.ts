import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'

import {SignedOutGuard} from './guards/signed-out.guard'
import {SignedInGuard} from './guards/signed-in.guard'

import {LayoutComponent} from './modules/shared/components/layout/layout.component'

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./modules/main/main.module').then((m) => m.MainModule),
      },
      {
        path: 'admin',
        canLoad: [SignedInGuard],
        canActivate: [SignedInGuard],
        loadChildren: () =>
          import('./modules/admin/admin.module').then((m) => m.AdminModule),
      },
    ],
  },
  {
    path: 'auth',
    canActivate: [SignedOutGuard],
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'error',
    loadChildren: () =>
      import('./modules/errors/errors.module').then((m) => m.ErrorsModule),
  },
  {path: '**', redirectTo: 'error', pathMatch: 'full'},
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      enableTracing: false,
      // preloadingStrategy: null,
      useHash: false,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
