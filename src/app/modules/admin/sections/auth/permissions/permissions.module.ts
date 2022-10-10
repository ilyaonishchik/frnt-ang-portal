import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {StoreModule} from '@ngrx/store'
import {EffectsModule} from '@ngrx/effects'

import {PermissionsEffect} from './store/effects/permissions.effect'
import {PermissionsComponent} from './components/permissions/permissions.component'
import {reducers} from './store/reducers'
import {PermissionsRoutingModule} from './permissions-routing.module'
import {TableModule} from 'primeng/table'
import {ButtonModule} from 'primeng/button'
import {InputTextModule} from 'primeng/inputtext'
import {TooltipModule} from 'primeng/tooltip'
import {ColumnsModule} from '../../../../../shared/components/table/columns/columns.module'

@NgModule({
  imports: [
    CommonModule,
    PermissionsRoutingModule,
    EffectsModule.forFeature([PermissionsEffect]),
    StoreModule.forFeature('permissions', reducers),
    TableModule,
    ButtonModule,
    InputTextModule,
    TooltipModule,
    ColumnsModule,
  ],
  declarations: [PermissionsComponent],
})
export class PermissionsModule {}
