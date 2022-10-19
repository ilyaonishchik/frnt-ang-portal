import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {FormsModule} from '@angular/forms'

import {StoreModule} from '@ngrx/store'
import {EffectsModule} from '@ngrx/effects'

import {TableModule} from 'primeng/table'
import {ButtonModule} from 'primeng/button'
import {InputTextModule} from 'primeng/inputtext'
import {TooltipModule} from 'primeng/tooltip'
import {InputTextareaModule} from 'primeng/inputtextarea'

import {GetPermissionsEffect} from './store/effects/permissions.effect'
import {PermissionsComponent} from './components/permissions/permissions.component'
import {reducers} from './store/reducers'
import {PermissionsRoutingModule} from './permissions-routing.module'
import {ColumnsModule} from 'src/app/shared/components/table/columns/columns.module'
import {AvsTableModule} from 'src/app/shared/modules/table/table.module'
import {PermissionModule} from '../../../components/permission/permission.module'
import {DialogModule} from 'primeng/dialog'

@NgModule({
  imports: [
    CommonModule,
    PermissionsRoutingModule,
    EffectsModule.forFeature([GetPermissionsEffect]),
    StoreModule.forFeature('permissions', reducers),
    TableModule,
    ButtonModule,
    InputTextModule,
    TooltipModule,
    ColumnsModule,
    FormsModule,
    InputTextareaModule,
    AvsTableModule,
    PermissionModule,
    DialogModule,
  ],
  declarations: [PermissionsComponent],
})
export class PermissionsModule {}
