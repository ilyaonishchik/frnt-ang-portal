import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {ReactiveFormsModule} from '@angular/forms'

import {AuthRoutingModule} from './auth-routing.module'
import {SignInComponent} from './components/sign-in/sign-in.component'
import {SignUpComponent} from './components/sign-up/sign-up.component'
import {PasswordResetComponent} from './components/password-reset/password-reset.component'

@NgModule({
  declarations: [SignInComponent, SignUpComponent, PasswordResetComponent],
  imports: [CommonModule, AuthRoutingModule, ReactiveFormsModule],
})
export class AuthModule {}
