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

import {RoleComponent} from './forms/role/role.component'
import {ReadComponent} from './components/read/read.component'
import {LoadingModule} from 'src/app/shared/modules/loading/loading.module'
import {GetRoleEffect} from './store/effects/read-role.effect'
import {reducers} from './store/reducers'
import {CreateComponent} from './components/create/create.component'
import {MessagesModule} from 'src/app/shared/modules/messages/messages.module'
import {CreateRoleEffect} from './store/effects/create-role.effect'
import {UpdateComponent} from './components/update/update.component'
import {DeleteComponent} from './components/delete/delete.component'
import {UpdateRoleEffect} from './store/effects/update-role.effect'
import {DeleteRoleEffect} from './store/effects/delete-role.effect'
import {ErrorsModule} from 'src/app/shared/modules/errors/errors.module'

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
      GetRoleEffect,
      CreateRoleEffect,
      UpdateRoleEffect,
      DeleteRoleEffect,
    ]),
    StoreModule.forFeature('role', reducers),
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
    MessagesModule,
    ErrorsModule,
  ],
  exports: [ReadComponent, CreateComponent, UpdateComponent, DeleteComponent],
})
export class RoleModule {}
