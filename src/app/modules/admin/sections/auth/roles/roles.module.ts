import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'

import {EffectsModule} from '@ngrx/effects'
import {StoreModule} from '@ngrx/store'

import {TableModule} from 'primeng/table'
import {ButtonModule} from 'primeng/button'
import {InputTextModule} from 'primeng/inputtext'
import {TooltipModule} from 'primeng/tooltip'

import {AvsTableModule} from '@shared/modules/table/table.module'
import {RoleModule} from '../../../components/role/role.module'
import {RolesRoutingModule} from './roles-routing.module'

import {RolesComponent} from './components/roles/roles.component'
import {GetRolesEffect} from './store/effects/roles.effect'
import {reducerRoles, rolesFeatureKey} from './store/reducers'

@NgModule({
  declarations: [RolesComponent],
  imports: [
    CommonModule,
    RolesRoutingModule,
    StoreModule.forFeature(rolesFeatureKey, reducerRoles),
    EffectsModule.forFeature([GetRolesEffect]),
    TableModule,
    ButtonModule,
    InputTextModule,
    TooltipModule,
    AvsTableModule,
    RoleModule,
  ],
})
export class RolesModule {}
