import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {ReactiveFormsModule} from '@angular/forms'

import {EffectsModule} from '@ngrx/effects'
import {StoreModule} from '@ngrx/store'

import {InputTextModule} from 'primeng/inputtext'
import {InputTextareaModule} from 'primeng/inputtextarea'
import {CheckboxModule} from 'primeng/checkbox'

import {GetUserEffect} from './store/effects/user-read.effect'
import {reducers} from './store/reducers'
import {UserComponent} from './forms/user/user.component'

@NgModule({
  declarations: [UserComponent],
  imports: [
    CommonModule,
    EffectsModule.forFeature([GetUserEffect]),
    StoreModule.forFeature('user', reducers),
    ReactiveFormsModule,
    InputTextModule,
    InputTextareaModule,
    CheckboxModule,
  ],
  exports: [UserComponent],
})
export class UserModule {}
