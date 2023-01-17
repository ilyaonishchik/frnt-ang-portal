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
        canLoad: [SignedInGuard],
        canActivate: [SignedInGuard, PermissionGuard],
        data: {permission: 'admin-panel:view'},
        loadChildren: () =>
          import('./modules/admin/admin.module').then((m) => m.AdminModule),
      },
      {
        path: 'docs',
        canLoad: [SignedInGuard],
        canActivate: [SignedInGuard],
        loadChildren: () =>
          import('./modules/documents/documents.module').then(
            (m) => m.DocumentsModule
          ),
      },
      {
        path: 'podpiska',
        canLoad: [SignedInGuard],
        canActivate: [SignedInGuard, PermissionGuard],
        data: {permission: 'podpiska:module'},
        loadChildren: () =>
          import('./modules/podpiska/podpiska.module').then(
            (m) => m.PodpiskaModule
          ),
      },
      {
        path: 'profile',
        canLoad: [SignedInGuard],
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
    canLoad: [SignedOutGuard],
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
