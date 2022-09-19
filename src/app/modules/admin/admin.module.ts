import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'

import {AdminRoutingModule} from './admin-routing.module'

import {MainComponent} from './components/main/main.component'
import {DashboardComponent} from './components/dashboard/dashboard.component'
import {UsersComponent} from './components/users/users.component'
import {TableModule} from 'primeng/table'
import {ButtonModule} from 'primeng/button'
import {InputTextModule} from 'primeng/inputtext'
import {SkeletonModule} from 'primeng/skeleton';
import { RolesComponent } from './components/roles/roles.component';
import { PermissionsComponent } from './components/permissions/permissions.component'

@NgModule({
  declarations: [MainComponent, DashboardComponent, UsersComponent, RolesComponent, PermissionsComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    SkeletonModule,
  ],
  exports: [],
})
export class AdminModule {}
