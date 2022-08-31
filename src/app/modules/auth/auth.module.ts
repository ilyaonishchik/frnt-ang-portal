import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'

import {AuthRoutingModule} from './auth-routing.module'
import {SignInComponent} from './components/sign-in/sign-in.component'
import {SignUpComponent} from './components/sign-up/sign-up.component'
import {PasswordResetComponent} from './components/password-reset/password-reset.component'
import {PasswordModule} from 'primeng/password'
import {CheckboxModule} from 'primeng/checkbox'
import {InputTextModule} from 'primeng/inputtext'
import {ButtonModule} from 'primeng/button'
import {RippleModule} from 'primeng/ripple'

@NgModule({
  declarations: [SignInComponent, SignUpComponent, PasswordResetComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    PasswordModule,
    CheckboxModule,
    InputTextModule,
    ButtonModule,
    RippleModule,
    FormsModule,
  ],
})
export class AuthModule {}
