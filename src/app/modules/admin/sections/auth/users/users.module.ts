import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'

import {StoreModule} from '@ngrx/store'
import {EffectsModule} from '@ngrx/effects'

import {DialogModule} from 'primeng/dialog'
import {InputTextModule} from 'primeng/inputtext'
import {InputTextareaModule} from 'primeng/inputtextarea'
import {CheckboxModule} from 'primeng/checkbox'

import {UsersRoutingModule} from './users-routing.module'
import {UsersComponent} from './components/users/users.component'
import {AvsTableModule} from 'src/app/shared/modules/table/table.module'
import {GetUsersEffect} from './store/effects/users.effect'
import {reducers} from './store/reducers'
import {UserComponent} from './forms/user/user.component'
import {ButtonModule} from 'primeng/button'
import {ReactiveFormsModule} from '@angular/forms'

@NgModule({
  declarations: [UsersComponent, UserComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    EffectsModule.forFeature([GetUsersEffect]),
    StoreModule.forFeature('users', reducers),
    AvsTableModule,
    DialogModule,
    InputTextModule,
    InputTextareaModule,
    CheckboxModule,
    ButtonModule,
    ReactiveFormsModule,
  ],
})
export class UsersModule {}
