import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'

import {MainComponent} from './components/main/main.component'
import {DashboardComponent} from './components/dashboard/dashboard.component'
import {UsersComponent} from './components/users/users.component'
import {RolesComponent} from './components/roles/roles.component'
// import {PermissionsComponent} from './components/permissions/permissions.component'

const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'users', component: UsersComponent, data: {permission: 'users:view'}},
  {path: 'roles', component: RolesComponent, data: {permission: 'roles:view'}},
  {
    path: 'permissions',
    loadChildren: () =>
      import('./sections/auth/permissions/permissions.module').then(
        (m) => m.PermissionsModule
      ),
    // component: PermissionsComponent,
    // data: {permission: 'permissions:view'},
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
