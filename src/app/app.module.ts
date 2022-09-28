import {NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'

import {StoreModule} from '@ngrx/store'
import {EffectsModule} from '@ngrx/effects'
import {StoreDevtoolsModule} from '@ngrx/store-devtools'

import {ToastModule} from 'primeng/toast'
import {MessageService} from 'primeng/api'

import {AppRoutingModule} from './app-routing.module'
import {SharedModule} from './shared/shared.module'

import {AppComponent} from './app.component'
import {httpInterceptorProviders} from './interceptors/http.interceptor'

import {environment} from '../environments/environment'

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    ToastModule,
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
  ],
  providers: [MessageService, httpInterceptorProviders],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}
