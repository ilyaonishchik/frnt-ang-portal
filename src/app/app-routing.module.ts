import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'

import {LayoutComponent} from '@shared/modules/layout/components/layout/layout.component'
import {SignedOutGuard} from './guards/signed-out.guard'
import {SignedInGuard} from './guards/signed-in.guard'
import {PermissionGuard} from './guards/permission.guard'

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
        // canMatch: [() => inject(AuthService).isSignedIn()],
        canMatch: [SignedInGuard],
        canActivate: [SignedInGuard, PermissionGuard],
        data: {permission: 'admin-panel:view'},
        loadChildren: () =>
          import('./modules/admin/admin.module').then((m) => m.AdminModule),
      },
      {
        path: 'docs',
        canMatch: [SignedInGuard],
        canActivate: [SignedInGuard, PermissionGuard],
        data: {permission: 'docs:module'},
        loadChildren: () =>
          import('./modules/documents/documents.module').then(
            (m) => m.DocumentsModule
          ),
      },
      {
        path: 'podpiska',
        canMatch: [SignedInGuard],
        canActivate: [SignedInGuard, PermissionGuard],
        data: {permission: 'podpiska:module'},
        loadChildren: () =>
          import('./modules/podpiska/podpiska.module').then(
            (m) => m.PodpiskaModule
          ),
      },
      {
        path: 'profile',
        canMatch: [SignedInGuard],
        canActivate: [SignedInGuard],
        loadChildren: () =>
          import('./modules/profile/profile.module').then(
            (m) => m.ProfileModule
          ),
      },
    ],
  },
  {
    path: 'auth',
    canMatch: [SignedOutGuard],
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
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
      onSameUrlNavigation: 'reload',
      enableTracing: false,
      useHash: false,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
