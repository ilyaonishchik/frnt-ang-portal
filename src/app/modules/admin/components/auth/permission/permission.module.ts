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

import {LoadingModule} from '@shared/modules/loading/loading.module'
import {ValidateModule} from '@shared/modules/validate/validate.module'

import {PermissionComponent} from './forms/permission/permission.component'

import {CreateComponent} from './components/create/create.component'
import {ReadComponent} from './components/read/read.component'
import {UpdateComponent} from './components/update/update.component'
import {DeleteComponent} from './components/delete/delete.component'

import {permissionFeatureKey, reducerPermission} from './store/reducers'

import {CreatePermissionEffect} from './store/effects/create-permission.effect'
import {ReadPermissionEffect} from './store/effects/read-permission.effect'
import {UpdatePermissionEffect} from './store/effects/update-permission.effect'
import {DeletePermissionEffect} from './store/effects/delete-permission.effect'
import {ModalDialogModule} from '@shared/modules/dialog/modal-dialog.module'
import {TabViewModule} from 'primeng/tabview'
import {PickListModule} from 'primeng/picklist'

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
      ReadPermissionEffect,
      CreatePermissionEffect,
      UpdatePermissionEffect,
      DeletePermissionEffect,
    ]),
    StoreModule.forFeature(permissionFeatureKey, reducerPermission),
    InputTextModule,
    InputTextareaModule,
    ReactiveFormsModule,
    DialogModule,
    CheckboxModule,
    ButtonModule,
    FormsModule,
    LoadingModule,
    ValidateModule,
    ModalDialogModule,
    TabViewModule,
    PickListModule,
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
