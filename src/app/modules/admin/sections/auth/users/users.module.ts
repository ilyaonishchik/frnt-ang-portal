import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'

import {StoreModule} from '@ngrx/store'
import {EffectsModule} from '@ngrx/effects'

import {DialogModule} from 'primeng/dialog'

import {UsersRoutingModule} from './users-routing.module'
import {UsersComponent} from './components/users/users.component'
import {AvsTableModule} from 'src/app/shared/modules/table/table.module'
import {GetUsersEffect} from './store/effects/users.effect'
import {reducers} from './store/reducers'
import {UserModule} from '../../../components/user/user.module'
import {AvsDialogModule} from '../../../../../shared/components/dialog/dialog.module'

@NgModule({
  declarations: [UsersComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    EffectsModule.forFeature([GetUsersEffect]),
    StoreModule.forFeature('users', reducers),
    AvsTableModule,
    DialogModule,
    UserModule,
    AvsDialogModule,
  ],
})
export class UsersModule {}
