import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'

import {StoreModule} from '@ngrx/store'
import {EffectsModule} from '@ngrx/effects'

import {PasswordModule} from 'primeng/password'
import {CheckboxModule} from 'primeng/checkbox'
import {InputTextModule} from 'primeng/inputtext'
import {ButtonModule} from 'primeng/button'
import {RippleModule} from 'primeng/ripple'
import {ToastModule} from 'primeng/toast'

import {AuthRoutingModule} from './auth-routing.module'
import {ValidateModule} from '@shared/modules/validate/validate.module'

import {AuthService} from './services/auth.service'
import {PersistenceService} from '@shared/services/persistence.service'

import {SignInComponent} from './components/sign-in/sign-in.component'
import {SignUpComponent} from './components/sign-up/sign-up.component'
import {PasswordResetComponent} from './components/password-reset/password-reset.component'
import {VerifyComponent} from './components/verify/verify.component'

import {authFeatureKey, reducerAuth} from './store/reducers'
import {SignupEffect} from './store/effects/signup.effect'
import {SigninEffect} from './store/effects/signin.effect'

@NgModule({
  declarations: [
    SignInComponent,
    SignUpComponent,
    PasswordResetComponent,
    VerifyComponent,
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature(authFeatureKey, reducerAuth),
    EffectsModule.forFeature([SignupEffect, SigninEffect]),
    AuthRoutingModule,
    PasswordModule,
    CheckboxModule,
    InputTextModule,
    ButtonModule,
    RippleModule,
    FormsModule,
    ToastModule,
    ReactiveFormsModule,
    ValidateModule,
  ],
  providers: [AuthService, PersistenceService],
})
export class AuthModule {}
