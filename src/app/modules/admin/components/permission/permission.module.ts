import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'

import {EffectsModule} from '@ngrx/effects'
import {StoreModule} from '@ngrx/store'

import {InputTextModule} from 'primeng/inputtext'
import {InputTextareaModule} from 'primeng/inputtextarea'
import {DialogModule} from 'primeng/dialog'
import {CheckboxModule} from 'primeng/checkbox'
import {ButtonModule} from 'primeng/button'

import {GetPermissionEffect} from './store/effects/get-permission.effect'
import {ReadComponent} from './components/read/read.component'
import {PermissionComponent} from './forms/permission/permission.component'
import {reducers} from './store/reducers'
import {LoadingModule} from 'src/app/shared/modules/loading/loading.module'
import {CreateComponent} from './components/create/create.component'
import {CreatePermissionEffect} from './store/effects/create-permission.effect'
import {UpdateComponent} from './components/update/update.component'
import {UpdatePermissionEffect} from './store/effects/update-permission.effect'
import {MessagesModule} from 'src/app/shared/modules/messages/messages.module'
import {DeleteComponent} from './components/delete/delete.component'
import {DeletePermissionEffect} from './store/effects/delete-permission.effect'
import {ErrorsModule} from 'src/app/shared/modules/errors/errors.module'

@NgModule({
  declarations: [
    ReadComponent,
    PermissionComponent,
    CreateComponent,
    UpdateComponent,
    DeleteComponent,
  ],
  imports: [
    CommonModule,
    EffectsModule.forFeature([
      GetPermissionEffect,
      CreatePermissionEffect,
      UpdatePermissionEffect,
      DeletePermissionEffect,
    ]),
    StoreModule.forFeature('permission', reducers),
    InputTextModule,
    InputTextareaModule,
    ReactiveFormsModule,
    DialogModule,
    CheckboxModule,
    ButtonModule,
    FormsModule,
    LoadingModule,
    MessagesModule,
    ErrorsModule,
  ],
  exports: [
    ReadComponent,
    PermissionComponent,
    CreateComponent,
    UpdateComponent,
    DeleteComponent,
  ],
})
export class PermissionModule {}
