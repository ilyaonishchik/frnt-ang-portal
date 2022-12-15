import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'

import {MainComponent} from './components/main/main.component'
import {DashboardComponent} from './components/dashboard/dashboard.component'

const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'dashboard', component: DashboardComponent},
  {
    path: 'users',
    loadChildren: () =>
      import('./sections/auth/users/users.module').then((m) => m.UsersModule),
  },
  {
    path: 'roles',
    loadChildren: () =>
      import('./sections/auth/roles/roles.module').then((m) => m.RolesModule),
  },
  {
    path: 'permissions',
    // canLoad: [RoleGuard],
    // canActivate: [RoleGuard],
    // data: {role: 'permissions:view'},
    loadChildren: () =>
      import('./sections/auth/permissions/permissions.module').then(
        (m) => m.PermissionsModule
      ),
  },
  {
    path: 'links',
    loadChildren: () =>
      import('./sections/portal/links/links.module').then((m) => m.LinksModule),
  },
  {
    path: 'menus',
    loadChildren: () =>
      import('./sections/portal/menus/menus.module').then((m) => m.MenusModule),
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
