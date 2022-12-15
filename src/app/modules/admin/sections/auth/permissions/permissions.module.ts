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
import {DialogModule} from 'primeng/dialog'

import {AvsTableModule} from '@shared/modules/table/table.module'
import {PermissionsRoutingModule} from './permissions-routing.module'
import {PermissionModule} from '../../../components/permission/permission.module'

import {GetPermissionsEffect} from './store/effects/permissions.effect'
import {PermissionsComponent} from './components/permissions/permissions.component'
import {permissionsFeatureKey, reducerPermissions} from './store/reducers'

@NgModule({
  imports: [
    CommonModule,
    PermissionsRoutingModule,
    EffectsModule.forFeature([GetPermissionsEffect]),
    StoreModule.forFeature(permissionsFeatureKey, reducerPermissions),
    TableModule,
    ButtonModule,
    InputTextModule,
    TooltipModule,
    FormsModule,
    InputTextareaModule,
    AvsTableModule,
    PermissionModule,
    DialogModule,
  ],
  declarations: [PermissionsComponent],
})
export class PermissionsModule {}
