import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'

import {EffectsModule} from '@ngrx/effects'
import {StoreModule} from '@ngrx/store'

import {DialogModule} from 'primeng/dialog'
import {CheckboxModule} from 'primeng/checkbox'
import {ButtonModule} from 'primeng/button'
import {InputTextModule} from 'primeng/inputtext'
import {InputTextareaModule} from 'primeng/inputtextarea'
import {TabViewModule} from 'primeng/tabview'
import {PickListModule} from 'primeng/picklist'

import {LoadingModule} from '@shared/modules/loading/loading.module'
import {ValidateModule} from '@shared/modules/validate/validate.module'

import {RoleComponent} from './forms/role/role.component'

import {CreateComponent} from './components/create/create.component'
import {ReadComponent} from './components/read/read.component'
import {UpdateComponent} from './components/update/update.component'
import {DeleteComponent} from './components/delete/delete.component'

import {reducerRole, roleFeatureKey} from './store/reducers'

import {ReadRoleEffect} from './store/effects/read-role.effect'
import {CreateRoleEffect} from './store/effects/create-role.effect'
import {UpdateRoleEffect} from './store/effects/update-role.effect'
import {DeleteRoleEffect} from './store/effects/delete-role.effect'

@NgModule({
  declarations: [
    RoleComponent,
    ReadComponent,
    CreateComponent,
    UpdateComponent,
    DeleteComponent,
  ],
  imports: [
    CommonModule,
    EffectsModule.forFeature([
      ReadRoleEffect,
      CreateRoleEffect,
      UpdateRoleEffect,
      DeleteRoleEffect,
    ]),
    StoreModule.forFeature(roleFeatureKey, reducerRole),
    DialogModule,
    LoadingModule,
    CheckboxModule,
    FormsModule,
    ButtonModule,
    ReactiveFormsModule,
    InputTextModule,
    InputTextareaModule,
    TabViewModule,
    PickListModule,
    ValidateModule,
  ],
  exports: [ReadComponent, CreateComponent, UpdateComponent, DeleteComponent],
})
export class RoleModule {}
