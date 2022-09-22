import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'

import {PasswordModule} from 'primeng/password'
import {CheckboxModule} from 'primeng/checkbox'
import {InputTextModule} from 'primeng/inputtext'
import {ButtonModule} from 'primeng/button'
import {RippleModule} from 'primeng/ripple'
import {ToastModule} from 'primeng/toast'

import {StoreModule} from '@ngrx/store'

import {AuthRoutingModule} from './auth-routing.module'
import {SignInComponent} from './components/sign-in/sign-in.component'
import {SignUpComponent} from './components/sign-up/sign-up.component'
import {PasswordResetComponent} from './components/password-reset/password-reset.component'
import {VerifyComponent} from './components/verify/verify.component'
import {AutoFocusModule} from 'primeng/autofocus'
import {reducer} from './store/reducers'
import {AuthService} from './services/auth.service'
import {EffectsModule} from '@ngrx/effects'
import {SignupEffect} from './store/effects/signup.effect'

@NgModule({
  declarations: [
    SignInComponent,
    SignUpComponent,
    PasswordResetComponent,
    VerifyComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    PasswordModule,
    CheckboxModule,
    InputTextModule,
    ButtonModule,
    RippleModule,
    FormsModule,
    ToastModule,
    ReactiveFormsModule,
    AutoFocusModule,
    StoreModule.forFeature('auth', reducer),
    EffectsModule.forFeature([SignupEffect]),
  ],
  providers: [AuthService],
})
export class AuthModule {}
