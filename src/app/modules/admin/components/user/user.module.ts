import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'

import {EffectsModule} from '@ngrx/effects'
import {StoreModule} from '@ngrx/store'

import {InputTextModule} from 'primeng/inputtext'
import {InputTextareaModule} from 'primeng/inputtextarea'
import {CheckboxModule} from 'primeng/checkbox'
import {DialogModule} from 'primeng/dialog'
import {ButtonModule} from 'primeng/button'
import {TabViewModule} from 'primeng/tabview'
import {PickListModule} from 'primeng/picklist'
import {AvatarModule} from 'primeng/avatar'

import {LoadingModule} from '@shared/modules/loading/loading.module'
import {ValidateModule} from '@shared/modules/validate/validate.module'

import {UserComponent} from './forms/user/user.component'

import {CreateComponent} from './components/create/create.component'
import {ReadComponent} from './components/read/read.component'
import {UpdateComponent} from './components/update/update.component'
import {DeleteComponent} from './components/delete/delete.component'

import {reducerUser, userFeatureKey} from './store/reducers'

import {CreateUserEffect} from './store/effects/create-user.effect'
import {ReadUserEffect} from './store/effects/read-user.effect'
import {UpdateUserEffect} from './store/effects/update-user.effect'
import {DeleteUserEffect} from './store/effects/delete-user.effect'
import {FileUploadModule} from "primeng/fileupload";

@NgModule({
  declarations: [
    UserComponent,
    ReadComponent,
    CreateComponent,
    UpdateComponent,
    DeleteComponent,
  ],
  imports: [
    CommonModule,
    EffectsModule.forFeature([
      ReadUserEffect,
      CreateUserEffect,
      UpdateUserEffect,
      DeleteUserEffect,
    ]),
    StoreModule.forFeature(userFeatureKey, reducerUser),
    ReactiveFormsModule,
    InputTextModule,
    InputTextareaModule,
    CheckboxModule,
    DialogModule,
    FormsModule,
    ButtonModule,
    TabViewModule,
    PickListModule,
    LoadingModule,
    AvatarModule,
    ValidateModule,
    FileUploadModule,
  ],
  exports: [
    UserComponent,
    ReadComponent,
    CreateComponent,
    UpdateComponent,
    DeleteComponent,
  ],
})
export class UserModule {}
