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

import {PermissionsEffect} from './store/effects/permissions.effect'
import {PermissionsComponent} from './components/permissions/permissions.component'
import {reducers} from './store/reducers'
import {PermissionsRoutingModule} from './permissions-routing.module'
import {ColumnsModule} from 'src/app/shared/components/table/columns/columns.module'
import {AvsDialogModule} from 'src/app/shared/components/dialog/dialog.module'

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
    FormsModule,
    InputTextareaModule,
    AvsDialogModule,
  ],
  declarations: [PermissionsComponent],
})
export class PermissionsModule {}
