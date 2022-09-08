import {NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'

import {ToastModule} from 'primeng/toast'
import {MessageService} from 'primeng/api'

import {AppRoutingModule} from './app-routing.module'
import {AppLayoutModule} from './layout/app.layout.module'

import {AppComponent} from './app.component'

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, AppLayoutModule, ToastModule],
  providers: [MessageService],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}
