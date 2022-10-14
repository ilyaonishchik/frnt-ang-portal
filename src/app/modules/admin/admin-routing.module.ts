import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'

import {MainComponent} from './components/main/main.component'
import {DashboardComponent} from './components/dashboard/dashboard.component'
import {UsersComponent} from './components/users/users.component'
// import {RoleGuard} from '../../guards/role.guard'

const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'users', component: UsersComponent},
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
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
