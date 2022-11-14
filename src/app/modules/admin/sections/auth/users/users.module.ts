import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'

import {EffectsModule} from '@ngrx/effects'
import {StoreModule} from '@ngrx/store'

import {UsersRoutingModule} from './users-routing.module'
import {GetUsersEffect} from './store/effects/users.effect'
import {reducers} from './store/reducers'
import {UserModule} from '../../../components/user/user.module'
import {UsersComponent} from './components/users/users.component'
import {AvsTableModule} from 'src/app/shared/modules/table/table.module'

@NgModule({
  declarations: [UsersComponent],
  imports: [
    CommonModule,
    EffectsModule.forFeature([GetUsersEffect]),
    StoreModule.forFeature('users', reducers),
    UsersRoutingModule,
    UserModule,
    AvsTableModule,
  ],
})
export class UsersModule {}
