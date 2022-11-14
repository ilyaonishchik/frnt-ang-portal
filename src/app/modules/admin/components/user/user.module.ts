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

import {GetUserEffect} from './store/effects/read-user.effect'
import {reducers} from './store/reducers'
import {UserComponent} from './forms/user/user.component'
import {ReadComponent} from './components/read/read.component'
import {CreateComponent} from './components/create/create.component'
import {UpdateComponent} from './components/update/update.component'
import {DeleteComponent} from './components/delete/delete.component'
import {MessagesModule} from 'src/app/shared/modules/messages/messages.module'
import {ErrorsModule} from 'src/app/shared/modules/errors/errors.module'
import {LoadingModule} from 'src/app/shared/modules/loading/loading.module'
import {CreateUserEffect} from './store/effects/create-user.effect'
import {UpdateUserEffect} from './store/effects/update-user.effect'
import {DeleteUserEffect} from './store/effects/delete-user.effect'

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
      GetUserEffect,
      CreateUserEffect,
      UpdateUserEffect,
      DeleteUserEffect,
    ]),
    StoreModule.forFeature('user', reducers),
    ReactiveFormsModule,
    InputTextModule,
    InputTextareaModule,
    CheckboxModule,
    DialogModule,
    MessagesModule,
    FormsModule,
    ButtonModule,
    ErrorsModule,
    TabViewModule,
    PickListModule,
    LoadingModule,
    AvatarModule,
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
