import {inject, NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'

import {MainComponent} from './components/main/main.component'
import {DashboardComponent} from './components/dashboard/dashboard.component'
import {AuthService} from '@modules/auth/services/auth.service'

const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'dashboard', component: DashboardComponent},
  {
    path: 'users',
    canActivate: [
      () => inject(AuthService).checkPermission('admin:users:view', true),
    ],
    loadChildren: () =>
      import('./sections/auth/users/users.module').then((m) => m.UsersModule),
  },
  {
    path: 'roles',
    canActivate: [
      () => inject(AuthService).checkPermission('admin:roles:view', true),
    ],
    loadChildren: () =>
      import('./sections/auth/roles/roles.module').then((m) => m.RolesModule),
  },
  {
    path: 'permissions',
    canActivate: [
      () => inject(AuthService).checkPermission('admin:permissions:view', true),
    ],
    loadChildren: () =>
      import('./sections/auth/permissions/permissions.module').then(
        (m) => m.PermissionsModule
      ),
  },
  {
    path: 'links',
    canActivate: [
      () => inject(AuthService).checkPermission('admin:core-links:view', true),
    ],
    loadChildren: () =>
      import('./sections/portal/links/links.module').then((m) => m.LinksModule),
  },
  {
    path: 'menus',
    canActivate: [
      () => inject(AuthService).checkPermission('admin:core-menus:view', true),
    ],
    loadChildren: () =>
      import('./sections/portal/menus/menus.module').then((m) => m.MenusModule),
  },
  {
    path: 'docs',
    children: [
      {
        path: 'categories',
        canActivate: [
          () =>
            inject(AuthService).checkPermission(
              'admin:docs-categories:view',
              true
            ),
        ],
        loadChildren: () =>
          import('./sections/docs/categories/categories.module').then(
            (m) => m.CategoriesModule
          ),
      },
      {
        path: 'files',
        canActivate: [
          () =>
            inject(AuthService).checkPermission('admin:docs-files:view', true),
        ],
        loadChildren: () =>
          import('./sections/docs/files/files.module').then(
            (m) => m.FilesModule
          ),
      },
    ],
  },
  {
    path: 'catalog',
    children: [
      {
        path: 'subdivisions',
        loadChildren: () =>
          import('./sections/catalog/subdivisions/subdivisions.module').then(
            (m) => m.SubdivisionsModule
          ),
      },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
