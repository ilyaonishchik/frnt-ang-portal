import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'

import {EffectsModule} from '@ngrx/effects'
import {StoreModule} from '@ngrx/store'

import {AvsTableModule} from '@shared/modules/table/table.module'
import {UsersRoutingModule} from './users-routing.module'
import {UserModule} from '../../../components/auth/user/user.module'

import {GetUsersEffect} from './store/effects/users.effect'
import {reducerUsers, usersFeatureKey} from './store/reducers'
import {UsersComponent} from './components/users/users.component'

@NgModule({
  declarations: [UsersComponent],
  imports: [
    CommonModule,
    EffectsModule.forFeature([GetUsersEffect]),
    StoreModule.forFeature(usersFeatureKey, reducerUsers),
    UsersRoutingModule,
    UserModule,
    AvsTableModule,
  ],
})
export class UsersModule {}
