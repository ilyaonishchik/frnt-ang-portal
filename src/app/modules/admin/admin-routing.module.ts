import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'

import {MainComponent} from './components/main/main.component'
import {DashboardComponent} from './components/dashboard/dashboard.component'
import {PermissionGuard} from '../../guards/permission.guard'

const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'dashboard', component: DashboardComponent},
  {
    path: 'users',
    canActivate: [PermissionGuard],
    data: {permission: 'user:read'},
    loadChildren: () =>
      import('./sections/auth/users/users.module').then((m) => m.UsersModule),
  },
  {
    path: 'roles',
    canActivate: [PermissionGuard],
    data: {permission: 'role:read'},
    loadChildren: () =>
      import('./sections/auth/roles/roles.module').then((m) => m.RolesModule),
  },
  {
    path: 'permissions',
    canActivate: [PermissionGuard],
    data: {permission: 'permission:read'},
    loadChildren: () =>
      import('./sections/auth/permissions/permissions.module').then(
        (m) => m.PermissionsModule
      ),
  },
  {
    path: 'links',
    canActivate: [PermissionGuard],
    data: {permission: 'link:read'},
    loadChildren: () =>
      import('./sections/portal/links/links.module').then((m) => m.LinksModule),
  },
  {
    path: 'menus',
    canActivate: [PermissionGuard],
    data: {permission: 'menu:read'},
    loadChildren: () =>
      import('./sections/portal/menus/menus.module').then((m) => m.MenusModule),
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
