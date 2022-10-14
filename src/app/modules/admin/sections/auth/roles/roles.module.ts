import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'

import {EffectsModule} from '@ngrx/effects'
import {StoreModule} from '@ngrx/store'

import {TableModule} from 'primeng/table'
import {ButtonModule} from 'primeng/button'
import {InputTextModule} from 'primeng/inputtext'
import {TooltipModule} from 'primeng/tooltip'

import {RolesRoutingModule} from './roles-routing.module'
import {RolesComponent} from './components/roles/roles.component'
import {ColumnsModule} from 'src/app/shared/components/table/columns/columns.module'
import {GetRolesEffect} from './store/effects/roles.effect'
import {reducers} from './store/reducers'
import {AvsDialogModule} from '../../../../../shared/components/dialog/dialog.module'

@NgModule({
  declarations: [RolesComponent],
  imports: [
    CommonModule,
    RolesRoutingModule,
    EffectsModule.forFeature([GetRolesEffect]),
    StoreModule.forFeature('roles', reducers),
    TableModule,
    ButtonModule,
    InputTextModule,
    ColumnsModule,
    TooltipModule,
    AvsDialogModule,
  ],
})
export class RolesModule {}
