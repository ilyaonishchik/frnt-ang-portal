import {NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'

import {ToastModule} from 'primeng/toast'
import {MessageService} from 'primeng/api'

import {AppRoutingModule} from './app-routing.module'
import {SharedModule} from './modules/shared/shared.module'

import {AppComponent} from './app.component'
import {httpInterceptorProviders} from './interceptors/http.interceptor'

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, SharedModule, ToastModule],
  providers: [MessageService, httpInterceptorProviders],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}
