import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {FormsModule} from '@angular/forms'

import {TableModule} from 'primeng/table'
import {ButtonModule} from 'primeng/button'
import {InputTextModule} from 'primeng/inputtext'
import {SkeletonModule} from 'primeng/skeleton'
import {ToolbarModule} from 'primeng/toolbar'
import {DialogModule} from 'primeng/dialog'
import {CheckboxModule} from 'primeng/checkbox'
import {TooltipModule} from 'primeng/tooltip'
import {InputTextareaModule} from 'primeng/inputtextarea'
import {PickListModule} from 'primeng/picklist'
import {TabViewModule} from 'primeng/tabview'

import {AdminRoutingModule} from './admin-routing.module'
import {MainComponent} from './components/main/main.component'
import {DashboardComponent} from './components/dashboard/dashboard.component'
import {UsersComponent} from './components/users/users.component'
import {RolesComponent} from './components/roles/roles.component'
import {PermissionsComponent} from './components/permissions/permissions.component'
import {ColumnsModule} from 'src/app/shared/components/table/columns/columns.module'

@NgModule({
  declarations: [
    MainComponent,
    DashboardComponent,
    UsersComponent,
    RolesComponent,
    PermissionsComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    SkeletonModule,
    ToolbarModule,
    DialogModule,
    FormsModule,
    InputTextareaModule,
    CheckboxModule,
    TooltipModule,
    PickListModule,
    TabViewModule,
    ColumnsModule,
  ],
  exports: [],
  providers: [],
})
export class AdminModule {}
